import path from 'path';
import logger from '../../../config/logger';
import { uploadImage } from '../supabase/image-photo-profle';
import { UploadPhotoProfileResponse } from './type';

export async function uploadPhotoProfile(photo_profile: Express.Multer.File, account_id: string): Promise<UploadPhotoProfileResponse> {
    try {
        const saveFolder = `/images/photo_profiles`;
        // if (!fs.existsSync(saveFolder)) {
        //     fs.mkdirSync(saveFolder, { recursive: true });
        // }

        const pathFileName = path.extname(photo_profile.originalname);
        const pathFile = `${saveFolder}/${account_id}${pathFileName}`;

        // fs.writeFileSync(`${pathFile}`, photo_profile.buffer);
        const response = await uploadImage({
            fileBuffer: photo_profile.buffer,
            filePath: pathFile,
            mimeType: photo_profile.mimetype
        })

        return {
            pathFile,
            urlImage: response.path
        };
    } catch (error) {
        logger.error({ message: 'Error save or delete file', error });
        throw error;
    };
};
