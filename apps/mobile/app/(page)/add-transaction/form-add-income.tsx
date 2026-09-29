import FormAddIncome from '@/components/page/add-transaction/form-add-income';
import { useAppSelector } from '@/states';
import { router, useFocusEffect } from 'expo-router';
import { View } from 'react-native';

export default function PageFormAddIncome() {
  const isLogin = useAppSelector((states) => states.isLogin);

  useFocusEffect(() => {
    if (!isLogin) {
      router.navigate({
        pathname: '/(page)/login',
        params: {
          backToHome: 'true'
        }
      });
    }
  });

  if (!isLogin) return null;

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
    >
      <FormAddIncome />
    </View>
  )
}
