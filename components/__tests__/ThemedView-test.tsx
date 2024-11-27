import * as React from "react";
import renderer from "react-test-renderer";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

jest.mock("@/hooks/useThemeColor", () => ({
  useThemeColor: jest.fn(),
}));

describe("<ThemedView />", () => {
  it("should render correctly with default props", () => {
    (useThemeColor as jest.Mock).mockReturnValue("white");

    const tree = renderer.create(<ThemedView />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should apply the correct background color from lightColor", () => {
    (useThemeColor as jest.Mock).mockReturnValue("lightblue");

    const tree = renderer
      .create(<ThemedView lightColor="lightblue" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should apply the correct background color from darkColor", () => {
    (useThemeColor as jest.Mock).mockReturnValue("darkblue");

    const tree = renderer.create(<ThemedView darkColor="darkblue" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should merge custom styles with themed background color", () => {
    (useThemeColor as jest.Mock).mockReturnValue("white");

    const tree = renderer
      .create(<ThemedView style={{ padding: 10, margin: 5 }} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveProperty("props.style", [
      { backgroundColor: "white" },
      { padding: 10, margin: 5 },
    ]);
  });

  it("should pass other props to the View component", () => {
    (useThemeColor as jest.Mock).mockReturnValue("white");

    const testID = "themed-view";
    const tree = renderer.create(<ThemedView testID={testID} />).toJSON();

    expect(tree).toHaveProperty("props.testID", testID);
  });

  it("should handle undefined lightColor and darkColor gracefully", () => {
    (useThemeColor as jest.Mock).mockReturnValue(null);

    const tree = renderer.create(<ThemedView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
