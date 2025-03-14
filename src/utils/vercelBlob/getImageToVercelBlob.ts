import { list } from "@vercel/blob";
import { cache } from "react";

/**
 * Fetches and caches the list of blobs from Vercel Blob Storage.
 *
 * @returns {Promise<Array<{ pathname: string }>>} A list of blob objects.
 */

const listBlobStore = cache(async () => {
  const { blobs } = await list();
  return blobs;
});

/**
 * Retrieves an image from Vercel Blob Storage by its pathname.
 *
 * @param {string} pathname - The encoded pathname of the image.
 * @returns {Promise<{ pathname: string } | null>} The matched blob object or null if not found.
 */

export const getImageFromVercelBlob = cache(async (pathname: string) => {
  const pathnameDecoded = decodeURIComponent(pathname);
  const blobs = await listBlobStore();
  return blobs.find((blob) => blob.pathname === pathnameDecoded) ?? null;
});
