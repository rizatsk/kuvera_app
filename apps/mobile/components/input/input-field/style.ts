import { Colors } from "@/constants/theme";
import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { InputProps, RadioButtonProps } from "./type";

export interface ComputedStyleProps {
  fieldWrapper?: ViewStyle;
  fieldContainer?: ViewStyle;
  labelContainer?: ViewStyle;
  label?: TextStyle;
  inputWrapper?: ViewStyle;
  textField?: TextStyle;
  messageHelper?: TextStyle;
  counter?: TextStyle;
  inputIconWrapper?: ViewStyle;
}

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background gelap transparan
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  closeText: {
    fontWeight: 'bold',
  }
});

export const getStyle = (props: InputProps | RadioButtonProps, isFocused: boolean): ComputedStyleProps => {
  const { editable = true, isError, errorMessage } = props;

  const stateColor =
    isError || errorMessage
      ? { text: Colors.red[500], border: Colors.red[500] }
      : {
        text: Colors.black[900],
        border: isFocused ? Colors.grey[900] : Colors.grey[200],
      };

  const computedStyle: any = {};

  computedStyle.fieldWrapper = {
    width: '100%',
  };

  computedStyle.fieldContainer = {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  };

  computedStyle.labelContainer = {
    zIndex: 99,
    position: 'absolute',
  };

  computedStyle.label = {
    color: editable ? Colors.black[900] : Colors.grey[500],
    backgroundColor: !editable ? Colors.grey[50] : Colors.white[50],
    paddingHorizontal: 4,
    borderRadius: 4,
    marginLeft: 8,
  };

  computedStyle.inputWrapper = {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: stateColor.border,
    backgroundColor: !editable ? Colors.grey[50] : Colors.white[50],
    borderRadius: 8,
    padding: 8,
    width: '100%',
  };

  computedStyle.textField = {
    flex: 1,
    color: editable ? Colors.black[900] : Colors.grey[500],
    padding: 0,
    margin: 0,
    overflow: 'visible',
    fontSize: 14,
    lineHeight: Platform.OS === 'ios' ? 0 : 21
  };

  computedStyle.messageHelper = {
    alignSelf: 'flex-start',
    marginTop: 2,
    color: stateColor.text,
    fontSize: 13,
    paddingLeft: 3,
  };

  computedStyle.counter = {
    marginLeft: 4,
    color: isFocused ? Colors.black[900] : Colors.grey[500],
  };

  computedStyle.inputIconWrapper = {
    marginLeft: 4,
  };

  return StyleSheet.create(computedStyle);
};
