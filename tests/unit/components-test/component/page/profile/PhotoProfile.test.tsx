import PhotoProfile from "@/components/page/profile/photo-profile";
import pickImage from "@/helper/get-pictures/pick-image";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";
import { Provider } from "react-redux";

// Mock dependencies
jest.mock("expo-image-picker");
jest.mock("@/helper/get-pictures/pick-camera-image", () =>
  jest.fn().mockResolvedValue(null),
);
jest.mock("@/helper/get-pictures/pick-image", () =>
  jest.fn().mockResolvedValue(null),
);

// Mock reducer authUser
const authUserReducer = (
  state = {
    name: "John Doe",
    email: "john@example.com",
    photo_profile_url: "https://example.com/photo.jpg",
  },
) => {
  return state;
};

// Mock async action redux action
jest.mock("@/states/auth-user/action", () => {
  return {
    asyncUpdateProfileUser: jest.fn((payload) => ({
      type: "authUser/asyncUpdateProfileUser",
      payload,
    })),
  };
});

describe("PhotoProfile Component", () => {
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
  it("should render component correctly with user data", () => {
    // Act
    const { getByText } = render(
      <Provider store={store}>
        <PhotoProfile />
      </Provider>,
    );

    // Arrange
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("john@example.com")).toBeTruthy();
  });
  it("should display user photo profile image", () => {
    // Act
    const { getByTestId } = render(
      <Provider store={store}>
        <PhotoProfile />
      </Provider>,
    );

    // Assert
    const profileImage = getByTestId("profile-photo");
    expect(profileImage).toBeTruthy();
  });
  it("should handle image picker when user taps change photo button", () => {
    // Act
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <PhotoProfile />
      </Provider>,
    );

    const changePhotoButton = getByTestId("change-photo-button");
    fireEvent.press(changePhotoButton);

    // Assert
    expect(getByTestId("modal-change-profile-photo")).toBeTruthy();
    expect(getByText("Open Camera")).toBeTruthy();
    expect(getByText("Open Galery")).toBeTruthy();
  });
  it("when click button 'Open Galery' and select image modal is visible", async () => {
    // Arrange
    (pickImage as jest.Mock).mockResolvedValue({
      fileName: "test.png",
      uri: "https://test",
      mimeType: "png",
    });

    // Act
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <PhotoProfile />
      </Provider>,
    );

    const changePhotoButton = getByTestId("change-photo-button");
    fireEvent.press(changePhotoButton);

    const buttonOpenGalery = getByTestId("button-open-galery");
    fireEvent.press(buttonOpenGalery);

    // Assert - wait for promise to resolve
    await waitFor(() => {
      expect(queryByTestId("modal-change-profile-photo")).toBeNull();
    });
  });
});
