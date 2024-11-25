import React from "react";
import renderer from "react-test-renderer";
import { Text } from "react-native";
import HistoryItem from "../HistoryElement/HistoryItem";
import { mockHistoryItem1 } from "@/types/mock-data";

describe("<HistoryItem />", () => {
  const mockHistoryItem = mockHistoryItem1;

  it("should render", () => {
    const tree = renderer
      .create(<HistoryItem item={mockHistoryItem} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display the correct time", () => {
    const component = renderer.create(<HistoryItem item={mockHistoryItem} />);
    const root = component.root;

    const timeText = root.findAllByType(Text)[0];
    expect(timeText.props.children).toBe(mockHistoryItem.time);
  });

  it("should display the correct searched text", () => {
    const component = renderer.create(<HistoryItem item={mockHistoryItem} />);
    const root = component.root;

    const searchedText = root.findAllByType(Text)[1];
    expect(searchedText.props.children).toBe(mockHistoryItem.searchedText);
  });

  it("should have the correct styles applied", () => {
    const component = renderer.create(<HistoryItem item={mockHistoryItem} />);
    const root = component.root;

    const timeText = root.findAllByType(Text)[0];
    const searchedText = root.findAllByType(Text)[1];

    expect(timeText.props.style).toContainEqual({ marginRight: 10 });
  });
});
