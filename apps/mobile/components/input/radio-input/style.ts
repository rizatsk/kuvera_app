import { Colors } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('window');
export const modalStyles = StyleSheet.create({
  optionsContainer: {
    paddingVertical: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.grey[100]
  },
  optionLabel: {
    fontSize: 15,
    textTransform: 'capitalize',
  },
  buttonSave: {
    paddingVertical: 10, 
    backgroundColor: Colors.tealKuvera, 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 10
  }
});
