/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvProvider, HvMultiButton } from "../..";
import { Main, OnlyIcons, OnlyLabels } from "../stories/MultiButton.stories";

describe("[v3] Multibutton withStyles - Icons Only", () => {
  const wrapper = mount(
    <HvProvider>
      <OnlyIcons />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(HvMultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });

  it("should render the inner buttons and match to definitions", () => {
    const multiButtonComponent = wrapper.find(HvMultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
});

describe("[v3] Multibutton - Text Only", () => {
  const wrapper = mount(
    <HvProvider>
      <OnlyLabels />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(HvMultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
});

describe("[v3] Multibutton - Text and Icons", () => {
  const wrapper = mount(
    <HvProvider>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(HvMultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
});
