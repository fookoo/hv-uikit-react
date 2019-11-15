/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "../InputAdornment";
import validationStates from "../validationStates";
import HvProvider from "../../Provider";

describe("InputAdornment", () => {
  let wrapper;
  const handleClearMock = jest.fn();

  const theme = {
    hv: {
      spacing: {
        md: 10
      },
      palette: {
        semantic: {
          sema1: "#FFFFF",
          sema6: "#FFFFF"
        }
      }
    }
  };

  const StyledInputAdornment = withStyles({
    adornmentsBox: {
      display: "flex",
      flexDirection: "row",
      height: 30,
      justifyContent:"center"
    },
    adornmentButton: {
      backgroundColor: "transparent",
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer"
    },
    adornmentIconBox: {
      width: `${theme.hv.spacing.md}px`,
      height: `${theme.hv.spacing.md}px`,
      position: "relative",
      "& svg": {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto"
      }
    }
  }, {withTheme: true})(InputAdornment);

  beforeEach(async () => {
    handleClearMock.mockClear();

    wrapper = mount(
      <HvProvider>
        <StyledInputAdornment
          classes={{}}
          validationState={validationStates.filled}
          handleClear={handleClearMock}
          theme={theme}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleClear when mouseDown on the clear button", () => {
    wrapper.find('button').simulate("mousedown");
    expect(handleClearMock).toHaveBeenCalled();
  });

  it("should call handleClear when keydown", () => {
    wrapper.find('button').simulate("keydown", {keyCode: 13});
    expect(handleClearMock).toHaveBeenCalled();
  });

  it("should not call handleClear when mousedown and keydown when not clickable", () => {
    wrapper = mount(
      <HvProvider>
        <StyledInputAdornment
          classes={{}}
          validationState={validationStates.empty}
          handleClear={handleClearMock}
          theme={theme}
        />
      </HvProvider>
    );

    wrapper.simulate("keydown", {keyCode: 13});
    wrapper.simulate("mousedown");

    expect(handleClearMock).not.toHaveBeenCalled();
  });
});
