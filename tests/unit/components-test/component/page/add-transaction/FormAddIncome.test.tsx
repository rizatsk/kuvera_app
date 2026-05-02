import FormAddIncome from "@/components/page/add-transaction/form-add-income";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";

const categoriesSpendReducer = (
  state = [
    {
        id: 'category-monthly',
        name: 'monthly',
    },
    {
        id: 'category-internet',
        name: 'internet',
    },
  ],
) => {
  return state;
};

// Mock async redux action
jest.mock("@/states/categories-spend/action", () => {
  return {
    asyncGetCategorySpend: jest.fn((payload) => ({
      type: "asyncGetCategorySpend",
      payload,
    })),
  };
});

jest.mock("@/states/transaction/action", () => {
  return {
    asyncAddTransaction: jest.fn((payload) => ({
      type: "asyncAddTransaction",
      payload,
    })),
  };
});

describe("FormAddIncome Component", () => {
  let store: any;

  beforeEach(() => {
    // Setup store untuk setiap test
    store = configureStore({
      reducer: {
        categoriesSpend: categoriesSpendReducer,
      },
    });

    // Clear semua mock sebelum setiap test
    jest.clearAllMocks();
  });

  it("should render component correctly with data categories", () => {
    // Act
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <FormAddIncome />
      </Provider>,
    );

    // Arrange
    expect(getByTestId("input-select-category")).toBeTruthy();
    expect(getByText("Monthly")).toBeTruthy();
    expect(getByTestId("input-select-date")).toBeTruthy();
    expect(getByTestId("input-money-income")).toBeTruthy();
    expect(getByTestId("input-notes")).toBeTruthy();
    expect(getByTestId("button-save")).toBeTruthy();
  });
});