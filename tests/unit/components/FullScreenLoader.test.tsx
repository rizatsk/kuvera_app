import FullScreenLoader from "@/components/fullscreen-loader";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react-native";
import { Animated, BackHandler } from "react-native";
import { Provider } from "react-redux";

jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");

describe("FullScreenLoader", () => {
    let store: any;
    beforeEach(() => {
        jest.clearAllMocks();

        store = configureStore({
            reducer: {
                visibleLoading: () => true,
            },
        });

        BackHandler.addEventListener = jest.fn().mockReturnValue({
            remove: jest.fn(),
        });
        jest.spyOn(Animated, 'timing').mockReturnValue({
            start: jest.fn(),
        } as any);
    });

    it("should return null when visibleLoading is false", () => {
        store = configureStore({
            reducer: {
                visibleLoading: () => false,
            },
        });

        const { queryByTestId } = render(
            <Provider store={store}>
                <FullScreenLoader />
            </Provider>
        );


        expect(queryByTestId("modal-full-screen-loading")).toBeNull();
    });

    it("should render modal when visibleLoading is true", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <FullScreenLoader />
            </Provider>
        );

        expect(getByTestId("modal-full-screen-loading")).toBeTruthy();
    });

    it("should add back handler when loading is visible", () => {
        render(
            <Provider store={store}>
                <FullScreenLoader />
            </Provider>
        );

        expect(BackHandler.addEventListener).toHaveBeenCalledWith(
            "hardwareBackPress",
            expect.any(Function)
        );
    });

    it("should remove back handler when loading becomes invisible", () => {
        const mockRemove = jest.fn();
        BackHandler.addEventListener = jest.fn().mockReturnValue({
            remove: mockRemove,
        });

        const { rerender } = render(
            <Provider store={store}>
                <FullScreenLoader />
            </Provider>
        );

        store = configureStore({
            reducer: {
                visibleLoading: () => false,
            },
        });
        rerender(
            <Provider store={store}>
                <FullScreenLoader />
            </Provider>
        );

        expect(mockRemove).toHaveBeenCalled();
    });

    it("should render AntDesign icon with loading name", () => {
        const { UNSAFE_getByType } = render(
            <Provider store={store}>
                <FullScreenLoader />
            </Provider>
        );

        expect(UNSAFE_getByType("AntDesign" as any)).toBeTruthy();
    });

    it("should have correct modal props", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <FullScreenLoader />
            </Provider>
        );
        const modal = getByTestId("modal-full-screen-loading");

        expect(modal.props.transparent).toBe(true);
        expect(modal.props.animationType).toBe("fade");
        expect(modal.props.visible).toBe(true);
    });
});