import { HelloWave } from "@/components/hello-wave";
import { fireEvent, render } from "@testing-library/react-native";

describe('HelloWave Component', () => {
    it("should render button with correct text", () => {
        // Act
        const { getByText } = render(<HelloWave />);
        
        // Assert
        expect(getByText('Hello Wave')).toBeTruthy();
    });

    it("should render animated text with initial state", () => {
        // Act
        const { getByText } = render(<HelloWave />);
        
        // Assert
        expect(getByText('hai')).toBeTruthy();
    });

    it("should have button with correct testID", () => {
        // Act
        const { getByTestId } = render(<HelloWave />);
        
        // Assert
        expect(getByTestId('button-hai')).toBeTruthy();
    });

    it("should update hello state when button is pressed", () => {
        // Act
        const { getByTestId, getByText } = render(<HelloWave />);
        const button = getByTestId('button-hai');
        
        fireEvent.press(button);

        // Assert
        expect(getByText('hello')).toBeTruthy();
    });
});