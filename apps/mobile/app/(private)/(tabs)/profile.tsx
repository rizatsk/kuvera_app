import CustomText from "@/components/custom-text";
import AccountTabsCard from "@/components/page/profile/account-tabs";
import ButtonLogout from "@/components/page/profile/button-logout";
import OtherTabs from "@/components/page/profile/other-tabs";
import PhotoProfile from "@/components/page/profile/photo-profile";
import environment from "@/constants/environment";
import { Colors } from "@/constants/theme";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      <ScrollView>
        {/* Photo user */}
        <PhotoProfile />
        <AccountTabsCard />
        <OtherTabs />
        <ButtonLogout />
        <View style={{ marginHorizontal: 18 }}>
          <CustomText style={{ marginVertical: 20, textAlign: 'center' }}>Kuvera an easy-to-use income and expense management application, equipped with real-time price information for Antam Gold and the IHSG stock index. All your financial data is safe and guaranteed.</CustomText>
          <CustomText style={styles.versionApp}>Version {environment.VERSION_APP}</CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  fullScreenBackground: {
    height: '100%',
    width: '100%',
  },
  iconNotif: {
    backgroundColor: Colors.whiteTransaparent,
    borderRadius: 10,
    width: 32, height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.tealKuvera
  },
  containerAvatar: {
    backgroundColor: "white",
    height: 70,
    width: 70,
    alignItems: 'center',
    borderRadius: 10000,
    borderColor: Colors.tealKuvera,
    borderWidth: 3,
  },
  containerEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    borderWidth: 4,
    borderColor: Colors.greyBackground,
    backgroundColor: Colors.greyBackground2,
    borderRadius: 10000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  versionApp: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
    color: Colors.grey[500]
  }
})