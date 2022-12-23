import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { Grid } from "./Grid";

describe("Grid", () => {
  it("should be defined", () => {
    const { container } = render(<Grid />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Grid />);
    expect(container).toMatchSnapshot();
  });
});