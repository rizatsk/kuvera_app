import PhotoProfile from '@/components/page/profile/photo-profile';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import * as ImagePicker from 'expo-image-picker';
import { Provider } from 'react-redux';

// Mock dependencies
jest.mock('expo-image-picker');
jest.mock('@/helper/get-pictures/pick-camera-image', () => jest.fn().mockResolvedValue(null));
jest.mock('@/helper/get-pictures/pick-image', () =>  jest.fn().mockResolvedValue(null));

// Mock reducer authUser
const authUserReducer = (state = {
  name: 'John Doe',
  email: 'john@example.com',
  photo_profile_url: 'https://example.com/photo.jpg'
}, action: any) => {
  switch (action.type) {
    case 'authUser/asyncUpdateProfileUser/fulfilled':
      return { ...state, photo_profile_url: action.payload.photo_profile_url };
    default:
      return state;
  }
};

// Mock async thunk action
jest.mock('@/states/auth-user/action', () => {
  return {
    asyncUpdateProfileUser: jest.fn((payload) => ({
      type: 'authUser/asyncUpdateProfileUser',
      payload,
    }))
  }
});

describe('PhotoProfile Component', () => {
  let store: any;

  beforeEach(() => {
    // Setup store untuk setiap test
    store = configureStore({
      reducer: {
        authUser: authUserReducer,
      },
    });

    // Clear semua mock sebelum setiap test
    jest.clearAllMocks();

    // Mock getPendingResultAsync
    (ImagePicker.getPendingResultAsync as jest.Mock).mockResolvedValue(null);
  });

  it('should render component correctly with user data', () => {
    // Act
    const { getByText } = render(
      <Provider store={store}>
        <PhotoProfile />
      </Provider>
    );

    // Arrange
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
  });
});