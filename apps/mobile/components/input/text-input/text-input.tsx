import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import InputFieldKuvera from "../input-field";
import { getStyle } from "../input-field/style";
import { InputProps } from "../input-field/type";

export const TextInput: React.FunctionComponent<InputProps> = (props) => {
  const {
    value,
    label,
    errorMessage,
    counter = 0,
    onTouchStart,
    showSoftInputOnFocus = true,
    inputType = 'text',
    onChangeText,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);

  const computedStyle = getStyle(props, focused);
  
  const handleOnFocus = () => {
      setFocused(true);
  };
  const handleOnBlur = () => {
    setFocused(false);
  };

  const handleOnTouchStart = (e: GestureResponderEvent) => {
    onTouchStart?.(e);
  };

  const handleOnchangeText = (
    masked: string,
    unmasked: string,
    obfuscated: string
  ) => {
    if (counter) {
      if (unmasked.length <= counter) {
        onChangeText?.(masked, unmasked, obfuscated);
      }
    } else {
      onChangeText?.(masked, unmasked, obfuscated);
    }
  }

  return (
    <InputFieldKuvera 
      counter={counter}
      value={value}
      label={label}
      errorMessage={errorMessage}
      isInput={true}
      computedStyle={computedStyle}
      focused={focused}
      handleOnFocus={handleOnFocus}
      handleOnTouchStart={handleOnTouchStart}
      handleOnBlur={handleOnBlur}
      showSoftInputOnFocus={showSoftInputOnFocus}
      handleOnchangeText={handleOnchangeText}
      keyboardType={rest.keyboardType}
      inputType={inputType}
    />
  )
}