import CustomText from '@/components/custom-text';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function PrivacyPolicyPage() {
  return (
    <ScrollView style={styles.container} >
      <View style={styles.section}>
        <CustomText style={styles.text}>
          Kuvera we values your privacy. This policy explains what information we
          collect and how we use it.
        </CustomText>


        <CustomText style={styles.heading}>1. Data We Collect</CustomText>
        <CustomText style={styles.text}>
          ▪️Email (for login & account recovery).{"\n"}
          ▪️User name (for profile display).{"\n"}
          We do not collect any data beyond what is required for the app to function.
        </CustomText>


        <CustomText style={styles.heading}>2. Google Login</CustomText>
        <CustomText style={styles.text}>
          Kuvera uses Google Login. We only access the email and name you permit. We never store your
          Google password.
        </CustomText>


        <CustomText style={styles.heading}>3. Camera & Gallery Access</CustomText>
        <CustomText style={styles.text}>
          To scan receipts, the app requires camera and gallery permissions. Images are only used to
          process your transaction data and are not used for any other purpose.
        </CustomText>


        <CustomText style={styles.heading}>4. How We Use Your Data</CustomText>
        <CustomText style={styles.text}>
          Your data is used solely for authentication and storing your transactions. No data selling,
          no sharing, and no advertisements.
        </CustomText>


        <CustomText style={styles.heading}>5. Data Security</CustomText>
        <CustomText style={styles.text}>
          We protect your data with reasonable security standards including encryption during
          transmission and restricted access.
        </CustomText>


        <CustomText style={styles.heading}>6. User Rights</CustomText>
        <CustomText style={styles.text}>
          You may request deletion or correction of your data at any time by contacting us at:
          {"\n"}Email: rizatsakmir@gmail.com
        </CustomText>


        <CustomText style={styles.heading}>7. Policy Changes</CustomText>
        <CustomText style={styles.text}>
          We may update this policy at any time. You will be notified of significant changes.
        </CustomText>


        <CustomText style={styles.heading}>8. Contact</CustomText>
        <CustomText style={styles.text}>
          For questions, contact us at:{"\n"}
          rizatsakmir@gmail.com
        </CustomText>


        <CustomText style={styles.footer}>© {new Date().getFullYear()} Kuvera. All rights reserved.</CustomText>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
   backgroundColor: 'white'
  },
  section: {
     padding: 16,
    paddingBottom: 30 
  },
  heading: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 22
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
    marginTop: 22,
    marginBottom: 24
  }
});