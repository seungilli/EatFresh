import * as React from "react";
import renderer from "react-test-renderer";
import { ThemedText } from "../ThemedText";

describe("<ThemedText />", () => {
  it("should render with default styles", () => {
    const tree = renderer
      .create(<ThemedText>Default text</ThemedText>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render with title styles", () => {
    const tree = renderer
      .create(<ThemedText type="title">Title text</ThemedText>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render with subtitle styles", () => {
    const tree = renderer
      .create(<ThemedText type="subtitle">Subtitle text</ThemedText>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render with defaultSemiBold styles", () => {
    const tree = renderer
      .create(<ThemedText type="defaultSemiBold">Semi-bold text</ThemedText>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render with link styles", () => {
    const tree = renderer
      .create(<ThemedText type="link">Link text</ThemedText>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should apply light color", () => {
    const tree = renderer
      .create(
        <ThemedText lightColor="#ffffff" darkColor="#000000">
          Light color text
        </ThemedText>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should apply dark color", () => {
    const tree = renderer
      .create(
        <ThemedText lightColor="#ffffff" darkColor="#000000">
          Dark color text
        </ThemedText>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should merge custom styles", () => {
    const tree = renderer
      .create(
        <ThemedText style={{ fontSize: 18, textAlign: "center" }}>
          Custom styled text
        </ThemedText>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render without crashing with empty props", () => {
    const tree = renderer.create(<ThemedText />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
