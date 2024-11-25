import React from "react";
import renderer from "react-test-renderer";
import { HistoryType } from "@/types/data";
import HistoryItem from "../HistoryElement/HistoryItem";

describe("<HistoryItem />", () => {
  const mockItem: HistoryType = {
    time: "2024-11-24 12:00 PM",
    searchedText: "test1",
  };

  it("should render", () => {
    const tree = renderer.create(<HistoryItem item={mockItem} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
