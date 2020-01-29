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
import FileUploader from "@hv/uikit-react-core/dist/FileUploader";

storiesOf("Components", module).add("FileUploader", () => <FileUploader />, {
  title: "FileUploader",
  description: "",
  usage: "import FileUploader from '@hv/uikit-react-core/dist/FileUploader'",
  examples: [
    {
      title: "Basic",
      description: "Sample usage of FileUploader",
      src: "components/fileuploader/sample.js"
    },
    {
      title: "With single file upload",
      description: "A file uploader which permits the upload of a single file",
      src: "components/fileuploader/single.js"
    }
  ]
});