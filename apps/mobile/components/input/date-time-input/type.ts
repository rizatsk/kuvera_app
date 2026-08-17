import { MaskInputProps } from 'react-native-mask-input';

export interface CalenderInputProps extends MaskInputProps {
    label: string;
    helperMessage?: string;
    isError?: boolean;
    errorMessage?: string;
    onSelectDate: (value: string) => void;
}