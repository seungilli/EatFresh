import React from "react";
import renderer, { act } from "react-test-renderer";
import { FlatList } from "react-native";
import HistoryList from "../HistoryElement/HistoryList";
import HistoryItem from "../HistoryElement/HistoryItem";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(JSON.stringify([]))),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

jest.mock("@/hooks/useHistoryProvider", () => ({
  useHistoryContext: jest.fn(),
}));

const mockHistory = [
  { time: "2023-11-23T12:00:00Z", details: "History Item 1" },
  { time: "2023-11-24T14:00:00Z", details: "History Item 2" },
];

describe("<HistoryList />", () => {
  const mockUseHistoryContext =
    require("@/hooks/useHistoryProvider").useHistoryContext;

  beforeEach(() => {
    mockUseHistoryContext.mockReturnValue({ history: mockHistory });
  });

  it("should render", async () => {
    const tree = renderer.create(<HistoryList />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should render the correct number of HistoryItem components", async () => {
    const component = renderer.create(<HistoryList />);
    const root = component.root;

    const historyItems = root.findAllByType(HistoryItem);
    expect(historyItems.length).toBe(mockHistory.length);
  });

  it("should pass the correct data to HistoryItem components", async () => {
    const component = renderer.create(<HistoryList />);
    const root = component.root;

    const historyItems = root.findAllByType(HistoryItem);

    historyItems.forEach((itemComponent, index) => {
      expect(itemComponent.props.item).toEqual(mockHistory[index]);
    });
  });

  it("should render an empty list when there is no history", async () => {
    mockUseHistoryContext.mockReturnValue({ history: [] });

    const component = renderer.create(<HistoryList />);
    const root = component.root;

    const flatList = root.findByType(FlatList);
    expect(flatList.props.data.length).toBe(0);
  });
});
