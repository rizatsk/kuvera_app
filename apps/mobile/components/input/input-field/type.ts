import { ReactNode } from "react";
import { MaskInputProps } from 'react-native-mask-input';
import { SelectOptions } from "../radio-input/type";

export interface InputProps extends MaskInputProps {
    label: string;
    helperMessage?: string;
    editable?: boolean;
    isError?: boolean;
    errorMessage?: string;
    counter?: number;
    inputIcon?: ReactNode;
    inputType?: 'text' | 'money';
    selectOptions?: SelectOptions[],
    onSelect?: (value: string | SelectOptions) => void,
    onSelectDate?: (value: string) => void,
}

export interface RadioButtonProps extends MaskInputProps {
    label: string;
    helperMessage?: string;
    editable?: boolean;
    isError?: boolean;
    errorMessage?: string;
    inputIcon?: ReactNode;
    selectOptions?: SelectOptions[],
    onSelect?: (value: SelectOptions) => void,
    onSelectDate?: (value: string) => void,
}