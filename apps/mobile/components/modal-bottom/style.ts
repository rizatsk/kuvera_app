import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('window');
export const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Backdrop gelap
  },
  modalContent: {
    width: '100%',
    maxHeight: height * 0.7, // Maksimal 70% tinggi layar
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30, // Ruang untuk area aman bawah
  },
  header: {
    flexDirection: 'row',
    marginLeft: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    padding: 5,
  },
});