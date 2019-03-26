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

const styles = theme => ({
  root: {
    margin: `${theme.spacing.xs}px 0 0 ${theme.spacing.sm}px`
  },
  list: {
    maxHeight: 320,
    overflow: "auto"
  },
  hidden: {
    display: "none"
  },
  selection: {
    width: "100%",
    userSelect: "none",
    cursor: "pointer"
  },
  singleSelection: {
    padding: `6px ${theme.spacing.xs}px`,
    ...theme.typography.body1,
    cursor: "pointer",
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    }
  },
  multiSelection: {
    cursor: "pointer"
  },
  selected: {
    background: theme.hv.palette.accent.acce1,
    color: theme.palette.common.white,
    "&:hover": {
      background: theme.hv.palette.accent.acce1,
      color: theme.palette.common.white
    }
  },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  result: {
    display: "block"
  },
  selectAll: {
    margin: `${theme.spacing.xs}px 0 ${theme.spacing.xs}px 0`,
    "& > span": {
      ...theme.typography.subtitle1
    }
  },
  actions: {
    textAlign: "right",
    margin: `${theme.spacing.sm}px ${theme.spacing.sm}px ${
      theme.spacing.sm
    }px 0`
  },
  paddingRight: {
    paddingRight: `${theme.spacing.sm}px`
  },
  marginBottom: {
    marginBottom: `${theme.spacing.sm}px`
  }
});

export default styles;
