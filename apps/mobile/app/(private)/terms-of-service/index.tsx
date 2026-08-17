import CustomText from '@/components/custom-text';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function TermsOfServicePage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View>
        <CustomText style={styles.meta}>Last updated: November 30, 2025</CustomText>
        <CustomText style={styles.meta}>Owner: Rizat Sakmir</CustomText>
        <CustomText style={styles.meta}>Jurisdiction: Indonesia</CustomText>

        <CustomText style={styles.heading}>1. Acceptance of Terms</CustomText>
        <CustomText style={styles.paragraph}>
          By downloading or using Kuvera ("the App"), you agree to be bound by these Terms of
          Service. If you do not agree, please stop using the App immediately.
        </CustomText>

        <CustomText style={styles.heading}>2. Eligibility</CustomText>
        <CustomText style={styles.paragraph}>
          The App is intended for users who are 13 years old or older. By using the App, you confirm
          that you meet this requirement.
        </CustomText>

        <CustomText style={styles.heading}>3. Description of Services</CustomText>
        <CustomText style={styles.paragraph}>
          Kuvera provides the following functionalities:
          {'\n'}▪️ Expense recording and tracking
          {'\n'}▪️ Saving receipt photos
          {'\n'}▪️ Viewing Antam gold prices
          {'\n'}▪️ Viewing IDX stock data
          {'\n'}▪️ Additional financial tools and visualizations
        </CustomText>

        <CustomText style={styles.heading}>4. Third▪️Party Services</CustomText>
        <CustomText style={styles.paragraph}>
          The App uses Google Login for account authentication. By using Google Login, you agree to
          Google’s terms and privacy policies. Kuvera does not integrate with other third▪️party
          services at this time.
        </CustomText>

        <CustomText style={styles.heading}>5. User Responsibilities</CustomText>
        <CustomText style={styles.paragraph}>
          You agree not to:
          {'\n'}▪️ Attempt to hack, disrupt, or reverse▪️engineer the App or its systems
          {'\n'}▪️ Misuse any features of the App
          {'\n'}▪️ Upload harmful or malicious content
          {'\n'}▪️ Interfere with other users’ experience
          {'\n'}Any violation may result in termination or restriction of access.
        </CustomText>

        <CustomText style={styles.heading}>6. Account Management</CustomText>
        <CustomText style={styles.paragraph}>
          Currently, account deletion is not yet available through the App. If you require assistance
          with data or account issues, contact us at: rizatsakmir@gmail.com. When account deletion
          becomes available, the App will be updated and users will be notified.
        </CustomText>

        <CustomText style={styles.heading}>7. No Paid Services</CustomText>
        <CustomText style={styles.paragraph}>
          Kuvera does not offer subscriptions, premium plans, or any paid component. All features are
          free to use.
        </CustomText>

        <CustomText style={styles.heading}>8. Privacy</CustomText>
        <CustomText style={styles.paragraph}>
          Your privacy is important. Kuvera only collects: email, user name, and receipt images (if
          you upload them). We do not sell data or display advertisements. For more details, please
          refer to our Privacy Policy.
        </CustomText>

        <CustomText style={styles.heading}>9. Limitation of Liability</CustomText>
        <CustomText style={styles.paragraph}>
          The App is provided “as is” without warranties of any kind. We are not responsible for data
          loss, inaccurate financial information, service downtime, or third-party data inaccuracies
          (e.g., gold prices or stock data). Use the App at your own risk.
        </CustomText>

        <CustomText style={styles.heading}>10. Changes to Terms</CustomText>
        <CustomText style={styles.paragraph}>
          We may update these Terms of Service at any time. Changes will be communicated through the
          App or other appropriate channels.
        </CustomText>

        <CustomText style={styles.heading}>11. Contact Information</CustomText>
        <CustomText style={styles.paragraph}>
          For questions, issues, or inquiries, contact us at: rizatsakmir@gmail.com
        </CustomText>

        <CustomText style={styles.footer}>© {new Date().getFullYear()} Kuvera. All rights reserved.</CustomText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  content: {
    padding: 16,
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4
  },
  meta: {
    fontSize: 13,
  },
  heading: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 2
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 22
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
    marginTop: 28
  }
});
