import React from "react";

import { render } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { Main, CustomDefault, ReadOnly } from "../stories/TimePicker.stories";
import HvTimePicker from "../TimePicker";

describe("Timepicker", () => {
  describe("snapshot tests", () => {
    it("Main", () => {
      const { container } = render(<CustomDefault />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("timepicker functionality tests", () => {
    it("renders time in placeholder in 12H format component as expected", () => {
      const { getAllByRole } = render(
        <HvTimePicker hours={14} minutes={35} seconds={45} period="AM" timeFormat={12} />
      );

      const inputs = getAllByRole("textbox");
      const [timepickerInput] = inputs;

      expect(timepickerInput).toBeInTheDocument();
    });

    it("Opens timepicker when dropdown button is clicked", async () => {
      const { getByRole, getAllByRole, findByRole } = render(<Main />);

      let timepickerDropdown = getByRole("combobox");
      expect(timepickerDropdown).toBeInTheDocument();
      expect(timepickerDropdown).toHaveAttribute("aria-expanded", "false");
      userEvent.click(timepickerDropdown); // try to open
      timepickerDropdown = await findByRole("combobox");
      expect(timepickerDropdown).toHaveAttribute("aria-expanded", "true");

      const [pickerTooltip] = getAllByRole("tooltip");
      expect(pickerTooltip).toBeInTheDocument();
    });

    it("When in read only mode it shouldn't open the tooltip", async () => {
      const { getByRole, queryByRole } = render(<ReadOnly />);

      const timepickerDropdown = getByRole("combobox");
      expect(timepickerDropdown).toBeInTheDocument();
      expect(timepickerDropdown).toHaveAttribute("aria-expanded", "false");
      userEvent.click(timepickerDropdown); // try to open

      const pickerTooltip = queryByRole("tooltip");
      expect(pickerTooltip).not.toBeInTheDocument();
    });
  });
});
