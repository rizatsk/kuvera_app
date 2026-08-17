import FormAddIncome from '@/components/page/add-transaction/form-add-income'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PageFormAddIncome() {
  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
    >
      <FormAddIncome />
    </SafeAreaView>
  )
}
