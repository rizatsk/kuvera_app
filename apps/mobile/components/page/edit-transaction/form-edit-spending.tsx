import CustomText from '@/components/custom-text';
import DateTimeInput from '@/components/input/date-time-input';
import RadioInput from '@/components/input/radio-input';
import { TextInput } from '@/components/input/text-input/text-input';
import { Colors } from '@/constants/theme';
import { cleanRupiahToNumber } from '@/helper/format-rupiah';
import { formatDateTime } from '@/helper/formate-date-time';
import { CategorySpendType } from '@/service/category-spend/type';
import { UpdateTransactionByIdParam } from '@/service/transaction/type';
import { useAppSelector } from '@/states';
import { asyncGetCategorySpend } from '@/states/categories-spend/action';
import { asyncUpdateTransaction } from '@/states/transaction/action';
import { AddTransactionParams, TypeTransaction } from '@/states/transaction/type';
import { setLoading } from '@/states/visible-loading/action';
import { router } from 'expo-router';
import { Formik, FormikHelpers } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

type FormEditTransactionProps = {
    params: {
        id: string, 
        category_id: string,
        category_name: string,
        notes: string,
        money_spent: string,
        created_dt: string,
        type: TypeTransaction
    }
}

export default function FormEditTransaction({params}: FormEditTransactionProps) {
    const [initialValuesForm, setInitalValuesForm] = useState({
        category: { id: "", name: "" },
        date: `${new Date()}`,
        spend: "",
        notes: ""
    });

    const categories_spend: CategorySpendType[] = useAppSelector((states) => states.categoriesSpend);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            asyncGetCategorySpend({
                setIsLoading: setLoading
            }) as any
        )

        setInitalValuesForm({
            category: {
                id: params.category_id,
                name: params.category_name
            },
            date: params.created_dt,
            spend: params.money_spent,
            notes: params.notes
        })
    }, []);

    const goToPageSuccess = useCallback(
        (values: AddTransactionParams) => {
            router.dismiss();
            router.replace({
                pathname: '/success',
                params: values
            })
        },
        []
    );

    const handleSubmitForm = (values: UpdateTransactionByIdParam, formikHelper: FormikHelpers<any>) => {
        dispatch(
            asyncUpdateTransaction({
                param: values,
                successHandler: () => {
                    formikHelper.resetForm({ values: initialValuesForm });
                },
                goToPageSuccess,
            }) as any
        )
    };

    const typeStr = params.type === 'incoming' ? 'Income' : 'Spent'

    return (
        <ScrollView>
            <CustomText style={{ fontWeight: 600, fontSize: 16, color: Colors.tealKuvera }}>
                Every rupiah is important
            </CustomText>
            <CustomText>Log your income now and understand exactly where your money comes from. Clear records help you plan better and grow your finances.</CustomText>
            <Formik
                initialValues={initialValuesForm}
                enableReinitialize={true}
                // validationSchema={AddSpendingSchema}
                onSubmit={(values, formikHelpers) => {
                    const cleanValue = {
                        id_transaction: params.id as string,
                        category_name: values.category.name,
                        category_id: values.category.id,
                        created_dt: formatDateTime(new Date(values.date)),
                        money_spent: cleanRupiahToNumber(values.spend),
                        notes: values.notes,
                        type: params.type as TypeTransaction
                    }
                    handleSubmitForm(cleanValue, formikHelpers);
                }}
            >
                {(FormikProps) => (
                    <View style={{ gap: 18, marginTop: 15 }}>
                        <RadioInput
                            accessible={true}
                            label='Category'
                            placeholder="Category"
                            value={FormikProps.values.category.name}
                            onSelect={(value) => FormikProps.setFieldValue("category", value)}
                            selectOptions={categories_spend}
                            errorMessage={FormikProps.errors.category?.id && FormikProps.touched.category?.id ? FormikProps.errors.category.id : ""}
                        />
                        <DateTimeInput
                            label='Date & time spending'
                            onSelectDate={(value) => FormikProps.setFieldValue("date", value)}
                            value={FormikProps.values.date}
                            errorMessage={FormikProps.errors.date && FormikProps.touched.date ? FormikProps.errors.date : ""}
                        />
                        <TextInput
                            label='Money Income'
                            value={FormikProps.values.spend}
                            accessible={true}
                            keyboardType='number-pad'
                            inputType='money'
                            onChangeText={FormikProps.handleChange('spend')}
                            errorMessage={FormikProps.errors.spend && FormikProps.touched.spend ? FormikProps.errors.spend : ""}
                        />
                        <TextInput
                            label='Notes'
                            value={FormikProps.values.notes}
                            accessible={true}
                            onChangeText={FormikProps.handleChange('notes')}
                            errorMessage={FormikProps.errors.notes && FormikProps.touched.notes ? FormikProps.errors.notes : ""}
                        />
                        <TouchableOpacity activeOpacity={0.6} style={style.button_lanjut} onPress={() => FormikProps.handleSubmit()}>
                            <CustomText style={{ fontWeight: 600, color: "white", fontSize: 16 }}>Save {typeStr}</CustomText>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    button_lanjut: {
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: Colors.tealKuvera,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    }
})
