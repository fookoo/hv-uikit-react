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

import React from "react";
import { storiesOf } from "@storybook/react";
import HvTable from "@hv-ui/react/core/Table/Main/Main";
// We are importating the raw table because the table is wrapped inside 2 HOC
// The Plugin generating the docs can't reach the documentation because the HOC are hiding it

storiesOf("Core", module).add(
  "Table",
  () => (
    <HvTable />
  ),
  {
    title: "Table",
    description: "A Table visualization used to show data",
    designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
    usage: "import HvTable from '@hv-ui/react/core/Table'",
    examples: [
      {
        title: "Simple Table",
        description: "Simple Table with in it's most basic presentation",
        src: "core/table/tableSimple"
      },
      {
        title: "Empty Table",
        description: "Table with no data showing the default no rows message",
        src: "core/table/tableEmpty"
      },
      {
        title: "Table with expander",
        description: "each row can be clicked to expand its content",
        src: "core/table/tableExpander"
      },
      {
        title: "Table with checkbox",
        description: "each row can be checked to be selected",
        src: "core/table/tableCheckbox"
      },
      {
        title: "Typical Table ",
        description: "each row can be checked to be selected and some cells contain custom content",
        src: "core/table/tableTypical"
      },
      {
        title: "Typical Table ",
        description: "each row can be clicked to expand its content and some cells contain custom content",
        src: "core/table/tableScrollingExpander"
      }
    ]
  }
);
