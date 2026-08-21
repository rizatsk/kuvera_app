import Environment from "./constan/environment";

export function generateUrlPhotoProfile(filePath: string): string {
    if (filePath?.includes('https')) {
        return filePath;
    } else {
        return `${Environment.SUPABASE_URL}${Environment.SUPABASE_BUCKET_PUBLIC_PATH}/${Environment.SUPABASE_BUCKET_NAME}${filePath}`
    }
}