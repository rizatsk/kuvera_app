import { auth } from "@/config/firebase";
import { getAccountGraphQl } from "@/service/account/api";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { setAuthUserActionCreator, setIsLoginAction } from "../helper";
import { setLoading } from "../visible-loading/action";

export function asyncPreloadProcess() {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true))

            // Set firestore
            onAuthStateChanged(auth, async (currentUser) => {
                if (!currentUser) {
                    try {
                        await signInAnonymously(auth);
                    } catch (error) {
                        console.error('Error saat signInAnonymously:', error);
                    }
                }
            });
            
            // Get data account
            const user = await getAccountGraphQl();
            dispatch(setIsLoginAction(true));
            dispatch(setAuthUserActionCreator(user))
        } catch (error) {
            console.log("Error async preload process", error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}
