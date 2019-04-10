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
import PropTypes from "prop-types";
import CardActions from "@material-ui/core/CardActions";

/**
 * The right content container has the actions of the list item
 *
 * @param {Object} {
 *   classes,
 *   actions,
 *   onSelect,
 *   ...other
 * }
 */
const RightContent = ({
  classes,
  actions,
  ...other
}) => (
  <CardActions className={classes.root} {...other}>
    <div className={classes.container}>{actions}</div>
  </CardActions>
);

RightContent.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the actions container of the component.
     */
    container: PropTypes.string
  }).isRequired,
  /**
   *  The renderable content inside the Actions slot of the footer.
   */
  actions: PropTypes.node
};

RightContent.defaultProps = {
  actions: undefined
};

export default RightContent;
