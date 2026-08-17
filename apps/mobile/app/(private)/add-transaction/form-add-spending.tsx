import FormAddSpending from '@/components/page/add-transaction/form-add-spending'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PageFormAddSpending() {
  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
    >
      <FormAddSpending />
    </SafeAreaView>
  )
}
