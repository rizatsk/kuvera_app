// Mock expo-image
jest.mock('expo-image', () => {
  return {
    Image: 'Image',
  }
});

// Mock Feather icons
jest.mock('@expo/vector-icons/Feather', () => 'Feather');

// Mock Ionicons
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

// Mock react-native ToastAndroid
jest.mock('react-native/Libraries/Components/ToastAndroid/ToastAndroid', () => {
  return {
    show: jest.fn(),
  }
});

// Suppress console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};