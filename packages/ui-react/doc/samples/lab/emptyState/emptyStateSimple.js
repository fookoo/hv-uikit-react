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
import HvEmptyState from "@hv-ui/react/core/EmptyState";
import AlertIcon from "@hv-ui/icons/core/L-icons/Level3Alert96";

export default (
  <HvEmptyState
    title="No data routes."
    message="After you start adding Data Routes, they will appear in here."
    icon={<AlertIcon />}
  />
);
