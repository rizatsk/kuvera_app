import { MaskInputProps } from 'react-native-mask-input';

export type SelectOptions = {
    id: string,
    name: string
}

export interface RadioInputProps extends MaskInputProps {
    label: string;
    helperMessage?: string;
    isError?: boolean;
    errorMessage?: string;
    selectOptions: SelectOptions[],
    onSelect: (value: SelectOptions) => void
}