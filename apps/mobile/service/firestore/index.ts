import { dbFirestore } from "@/config/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const getSettingAppFirestore = async () => {
    const settingQuery = doc(collection(dbFirestore, 'setting_app_kuvera'));
    const result = await getDoc(settingQuery);

    const data = result.data();
    console.log("Data query", data);
};
