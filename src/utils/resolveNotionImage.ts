import { NotionCoverImage } from "@/types/notion";
import { isNotionUrlExpired } from "./isNotionUrlExpired";
import { getImageFromVercelBlob } from "./vercelBlob/getImageToVercelBlob";
import { uploadImageToVercelBlob } from "./vercelBlob/uploadImageToVercelBlob";
import { ResizeOptions } from "sharp";

/**
 * Resolves the URL for a Notion image by checking its status and uploading it if necessary.
 *
 * This function processes Notion cover images of type "external" or "file".
 * - If the image is external, its URL is returned immediately.
 * - If it is a file-based Notion image, the function checks if it is already uploaded to Vercel Blob.
 * - If the image is missing in Vercel Blob or its Notion URL has expired, it downloads and re-uploads it.
 * - If the upload is successful, the new Vercel Blob URL is returned; otherwise, the existing URL is used.
 * - If no valid image can be resolved, the function returns `null`.
 *
 * @param {NotionCoverImage} image - The Notion cover image object, which includes its type and URL.
 * @param {ResizeOptions} [resizeOptions={}] - Optional resizing options for image processing.
 * @returns {Promise<string | null>} A promise that resolves to the image URL (from Notion or Vercel Blob) or `null` if no valid image is available.
 */

export const resolveNotionImage = async (
  image: NotionCoverImage,
  resizeOptions: ResizeOptions = {}
): Promise<string | null> => {
  if (image === null) return null;

  // External images are not stored in AWS Cloud
  if (image.type === "external") return image.external.url;

  // Extra check if the notion image is a file
  if (image.type !== "file") {
    return null;
  }

  const { url, expiry_time } = image.file;

  const imageUrl = new URL(url);
  const pathname = imageUrl.pathname.slice(1); //remove leading slash

  const imageInVercelBlob = await getImageFromVercelBlob(pathname);
  const isNotionAWSBucketExpired = isNotionUrlExpired(expiry_time);

  // Check if the file is not in Vercel Blob yet
  // OR
  // if the URL has expired
  if (!imageInVercelBlob || isNotionAWSBucketExpired) {
    // If the URL is expired or the file doesn't exist,
    // download the image and upload it to Vercel Blob
    const newBlob = await uploadImageToVercelBlob({
      url,
      pathname,
      resizeOptions,
    });

    // If the image is uploaded successfully, return a URL from Vercel Blob
    if (newBlob?.url) {
      console.log(`Returned new image url: ${newBlob.url}`);
      return newBlob.url;
    }
  }

  // Otherwise, use the already uploaded image in Vercel Blob
  if (imageInVercelBlob) {
    console.warn(
      `Returned already uploaded image to Vercel Blob: ${imageInVercelBlob.url}`
    );
    return imageInVercelBlob.url;
  }

  console.warn(`Returned null as image for url: ${url}`);
  return null;
};
