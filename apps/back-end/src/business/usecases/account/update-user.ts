import Environment from "../../../helper/constan/environment";
import { uploadPhotoProfile } from "../../domain/account/photo-profile";
import { updateUserByAccountId } from "../../repositories/account";
import { UsecaseUpdateUserByAccountIdParam } from "./type";

const usecaseUpdateUserByAccountId = async ({
    account_id,
    name = null,
    photo_profile
}: UsecaseUpdateUserByAccountIdParam) => {
    let photo_profile_path: string | null = null,
        photo_profile_url: string | null = null;

    if (photo_profile) {
        const {pathFile, urlImage} = await uploadPhotoProfile(photo_profile, account_id);
        photo_profile_path = pathFile;
        photo_profile_url = urlImage;
    }

    await updateUserByAccountId({
        account_id,
        name,
        photo_profile_path: photo_profile_path
    });

    return {
        update_name: name,
        photo_profile_url,
    }
};

export default usecaseUpdateUserByAccountId;
