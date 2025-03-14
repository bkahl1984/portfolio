import { put } from "@vercel/blob";
import fetch from "node-fetch";
import sharp, { ResizeOptions } from "sharp";

export type UploadImageToBlobArgs = {
  url: string;
  pathname: string;
  resizeOptions?: ResizeOptions;
};

export const uploadImageToVercelBlob = async ({
  url,
  pathname,
  resizeOptions,
}: UploadImageToBlobArgs) => {
  try {
    const res = await fetch(url);
    const imageBuffer = await res.buffer();
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType?.includes("image")) {
      throw new Error(
        `The MIME type is ${contentType}, and it's not an image. Url: ${url}`
      );
    }

    // Convert image buffer to WebP format with quality set to 80
    const optimizedImage = await sharp(imageBuffer)
      .resize(resizeOptions)
      .webp({ quality: 80 })
      .toBuffer();

    // Put it to Vercel Blob
    const blob = await put(pathname, optimizedImage, {
      access: "public",
      contentType,
      cacheControlMaxAge: 0,
      addRandomSuffix: false,
    });

    return blob;
  } catch (error) {
    console.error(`Error while uploading image to Vercel Blob: ${error}`);

    return null;
  }
};
