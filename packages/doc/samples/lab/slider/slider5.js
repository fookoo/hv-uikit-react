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

import React, { useState, useEffect } from "react";
import HvSlider from "@hv/uikit-react-lab/Slider";
import HvButton from "@hv/uikit-react-core/Button";

const threeKnobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    trackColor: "#72cccb"
  },
  {
    color: "#f9dc37",
    dragColor: "#fbe56a",
    trackColor: "#f9dc37"
  },
  {
    color: "#ff9100",
    dragColor: "#ffa733",
    trackColor: "#ff9100"
  }
];

const threeKnobPropertiesDefaults = [10, 20, 30];

const ExtendedHvSlider = ({ knobPropertiesDefault, knobProperties }) => {
  const [knobsValues, setKnobValues] = useState(knobPropertiesDefault);

  return (
    <>
      <HvButton onClick={() => setKnobValues(knobPropertiesDefault)}>
        Reset
      </HvButton>
      <HvSlider
        markStep={10}
        knobProperties={knobProperties}
        values={knobsValues}
        defaultValues={knobPropertiesDefault}
        onChange={({ knobsValues: values }) => {
          setKnobValues(values);
        }}
      />
    </>
  );
};

export default (
  <ExtendedHvSlider
    knobPropertiesDefault={threeKnobPropertiesDefaults}
    knobProperties={threeKnobProperties}
  />
);
