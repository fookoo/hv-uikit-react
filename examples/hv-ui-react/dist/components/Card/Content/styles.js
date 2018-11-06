"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var styles = function styles(theme) {
  return {
    content: {
      padding: "0 ".concat(theme.spacing.sm, "px 0 ").concat(theme.spacing.sm, "px")
    },
    item: {
      padding: "0 0 ".concat(theme.spacing.sm, "px 0")
    },
    label: theme.hv.typography.labelText,
    text: theme.hv.typography.normalText
  };
};

var _default = styles;
exports["default"] = _default;