import * as ThumbHash from "thumbhash";
import sharp from "sharp";
import { cache } from "react";

// Image to ThumbHash
export const generateBlurDataUrl = cache(async (url: string) => {
  try {
    if (typeof url !== "string") {
      throw new Error(`Url is not a string`);
    }

    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    const image = sharp(buffer).resize(64, 48, { fit: "inside" });
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const binaryThumbHash = ThumbHash.rgbaToThumbHash(
      info.width,
      info.height,
      data
    );
    // console.log("binaryThumbHash:", Buffer.from(binaryThumbHash));

    // If you want to use base64 instead of binary...
    // const thumbHashToBase64 = Buffer.from(binaryThumbHash).toString("base64");
    // const thumbHashFromBase64 = Buffer.from(thumbHashToBase64, "base64");
    // console.log("thumbHashToBase64:", thumbHashToBase64);

    // ThumbHash to data URL (can be done on the client, not the server)
    const placeholderURL = ThumbHash.thumbHashToDataURL(binaryThumbHash);
    // console.log("placeholderURL:", placeholderURL);

    return placeholderURL;
  } catch (error) {
    console.error(
      `Error while generating blur data url for placeholder image: ${error}`
    );

    return null;
  }
});
