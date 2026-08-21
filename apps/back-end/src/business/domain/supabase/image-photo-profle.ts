import logger from "../../../config/logger";
import supabaseClient from "../../../config/supabase";
import Environment from "../../../helper/constan/environment";
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
    path: `${Environment.SUPABASE_URL}${Environment.SUPABASE_BUCKET_PUBLIC_PATH}/${Environment.SUPABASE_BUCKET_NAME}${filePath}`
  };
}