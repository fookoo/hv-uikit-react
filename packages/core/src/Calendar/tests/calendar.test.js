import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";
import { HvComposedNavigation } from "../CalendarNavigation";
import { makeUTCDate } from "../utils";
import { HvCalendar } from "..";

describe("v3 <Calendar /> with minimum configuration", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvCalendar id="calendar" />
      </HvProvider>
    );
  });

  it("should render composed navigation components", () => {
    expect(wrapper.find(HvComposedNavigation).length).toBe(1);
  });
});

describe("v3 <Calendar /> with configurations", () => {
  let wrapper;
  const selectedDate = makeUTCDate(1970, 1, 1);

  const handleDateChangeMock = jest.fn();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvCalendar
          id="default"
          value={selectedDate}
          locale="en-US"
          handleDateChange={handleDateChangeMock}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvCalendar).length).toMatchSnapshot();
  });
});
