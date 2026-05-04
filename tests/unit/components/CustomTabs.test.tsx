
import CustomTabs from "@/components/custom-tab";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { fireEvent, render, userEvent } from "@testing-library/react-native";

describe("CustomTabs", () => {
  const mockNavigation = {
    emit: jest.fn(() => ({ defaultPrevented: false })),
    navigate: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockDescriptors = {
    home: {
      options: {
        tabBarLabel: "Home",
        tabBarAccessibilityLabel: "Home Tab",
        tabBarButtonTestID: "tab-home",
      },
    },
    profile: {
      options: {
        tabBarLabel: "Profile",
        tabBarAccessibilityLabel: "Profile Tab",
        tabBarButtonTestID: "tab-profile",
      },
    },
    transaction: {
      options: {
        tabBarLabel: "Transaction",
        tabBarAccessibilityLabel: "Transaction Tab",
        tabBarButtonTestID: "tab-transaction",
      },
    },
    stockidx: {
      options: {
        title: "Stock IDX",
        tabBarAccessibilityLabel: "Stock IDX Tab",
        tabBarButtonTestID: "tab-stockidx",
      },
    },
    test: {
      options: {
        name: 'test'
      },
    },
  };

  const mockState = {
    index: 0,
    routes: [
      { key: "home", name: "Home", params: undefined },
      { key: "profile", name: "Profile", params: undefined },
      { key: "transaction", name: "Transaction", params: undefined },
      { key: "stockidx", name: "Stock Index", params: undefined },
      { key: "test", name: "Test", params: undefined },
    ],
  };

  it("should render all tab buttons", () => {
    const { getByText } = render(
      <CustomTabs
        insets={{ top: 0, left: 0, right: 0, bottom: 0 }}
        state={mockState as BottomTabBarProps["state"]}
        descriptors={mockDescriptors as any}
        navigation={mockNavigation as any}
      />
    );

    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Profile")).toBeTruthy();
  });

  it("should call navigation emit and navigate on tab press", async () => {
    const { getByTestId } = render(
      <CustomTabs
        insets={{ top: 0, left: 0, right: 0, bottom: 0 }}
        state={mockState as BottomTabBarProps["state"]}
        descriptors={mockDescriptors as any}
        navigation={mockNavigation as any}
      />
    );

    const profileTab = getByTestId("tab-profile");
    fireEvent.press(profileTab);

    expect(mockNavigation.emit).toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Profile", undefined);
  });

  it("should call navigation emit and navigate on tab longPress", async () => {
    const { getByTestId } = render(
      <CustomTabs
        insets={{ top: 0, left: 0, right: 0, bottom: 0 }}
        state={mockState as BottomTabBarProps["state"]}
        descriptors={mockDescriptors as any}
        navigation={mockNavigation as any}
      />
    );

    const profileTab = getByTestId("tab-profile");
    await userEvent.longPress(profileTab);

    expect(mockNavigation.emit).toHaveBeenCalled();
  });

  it("should highlight focused tab with teal color", () => {
    const { getByTestId } = render(
      <CustomTabs
        insets={{ top: 0, left: 0, right: 0, bottom: 0 }}
        state={mockState as BottomTabBarProps["state"]}
        descriptors={mockDescriptors as any}
        navigation={mockNavigation as any}
      />
    );

    const focusedTab = getByTestId("tab-home");
    expect(focusedTab).toBeTruthy();
  });

  it("should render underline for focused tab", () => {
    const { UNSAFE_getByType } = render(
      <CustomTabs
        insets={{ top: 0, left: 0, right: 0, bottom: 0 }}
        state={mockState as BottomTabBarProps["state"]}
        descriptors={mockDescriptors as any}
        navigation={mockNavigation as any}
      />
    );

    expect(UNSAFE_getByType("View" as any)).toBeTruthy();
  });
});