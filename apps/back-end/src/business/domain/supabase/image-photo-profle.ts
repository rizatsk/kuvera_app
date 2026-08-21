import logger from "../../../config/logger";
import supabaseClient from "../../../config/supabase";
import Environment from "../../../helper/constan/environment";
import { generateUrlPhotoProfile } from "../../../helper/generate-url";
import { UploadImageResponse } from "./type";

export async function uploadImage(
  { filePath, fileBuffer, mimeType }:
    {
      filePath: string
      fileBuffer: Buffer
      mimeType: string
    }
): Promise<UploadImageResponse> {
  const { data, error } = await supabaseClient.storage
    .from(Environment.SUPABASE_BUCKET_NAME)
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    logger.error({ message: 'Error when upload image', error });
    throw error;
  }

  return {
    status: 'success',
    path: generateUrlPhotoProfile(filePath)
  };
}