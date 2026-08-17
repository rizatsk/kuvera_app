
import CustomText from "@/components/custom-text";
import environment from "@/constants/environment";
import { Colors } from "@/constants/theme";
import { asyncSignInWithGoogle } from "@/states/auth-user/action";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const handleSignInGoogle = () => {
    dispatch(asyncSignInWithGoogle() as any)
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require('@/assets/images/kuvera-vertical.png')}
          style={{ width: 80, height: 80, position: "absolute" }}
          contentFit="fill" />
      </View>
      <View>
        <CustomText style={{ color: Colors.grey[700], fontWeight: 600, marginTop: 25 }}>
          Manage Money, Control Life
        </CustomText>
        <CustomText style={{ color: Colors.grey[700], fontWeight: 600, marginBottom: 20 }}>
          Sign in and achieve your financial goals.
        </CustomText>
      </View>
      <View style={styles.viewForm}>
        {/* Sign in with google */}
        <CustomText style={{ color: Colors.grey[500] }}>Continue with</CustomText>
        <TouchableOpacity activeOpacity={0.6} style={styles.buttonSingInGoogle} onPress={() => handleSignInGoogle()}>
          <Image
            source={require('@/assets/images/google-icon.webp')}
            style={{ width: 30, height: 30 }}
            contentFit="contain"
          />
          <CustomText style={{ fontWeight: "bold" }}>Sign in with Google</CustomText>
        </TouchableOpacity>

        <CustomText style={{marginVertical: 20, textAlign: 'center'}}>An easy-to-use income and expense management application, equipped with real-time price information for Antam Gold and the IHSG stock index. All your financial data is safe and guaranteed.</CustomText>
        <CustomText style={{marginTop: 10}}>Version {environment.VERSION_APP}</CustomText>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "flex-start",
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  iconContainer: {
    height: 180,
    overflow: 'hidden',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    backgroundColor: Colors.greyBackground2,
    transform: [{ scaleX: 2.3 }],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  viewForm: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  line: {
    marginVertical: 25,
    width: "100%",
    height: 0.8,
    backgroundColor: Colors.grey[200],
  },
  buttonSingInGoogle: {
    marginTop: 10,
    width: '100%',
    backgroundColor: "white",
    paddingVertical: 10, paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center", alignItems: "center",
    gap: 10,
    borderWidth: 0.5,
    borderColor: Colors.grey[500]
  }
});