import { Colors } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('window');
export const modalStyles = StyleSheet.create({
  closeButton: {
    padding: 5,
  },
  container: {
    paddingVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.tealKuvera,
    borderRadius: 8,
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonSave: {
    paddingVertical: 10, 
    backgroundColor: Colors.tealKuvera, 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 10
  },
});
