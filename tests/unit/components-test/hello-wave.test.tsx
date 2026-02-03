import { HelloWave } from "@/components/hello-wave";
import { render } from "@testing-library/react-native";

describe('HelloWave Component', () => {
    it("should render correctly", () => {
        // Act
        const { getByText } = render(<HelloWave />);
        // Assert
        expect(getByText('👋')).toBeTruthy();
    });
});