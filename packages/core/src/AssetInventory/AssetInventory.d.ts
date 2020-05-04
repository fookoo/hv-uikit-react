import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvActionsCommonProps } from "../Actions";
import { CardViewConfiguration } from "./CardView";
import { ListViewConfiguration } from "./ListView";
import { ListValueProp } from "../List";
import { MultiButtonData } from "../MultiButton";

export interface AssetInventoryConfiguration extends ListViewConfiguration, CardViewConfiguration {}

export type AssetInventoryMetadata = {
  /**
   * TODO: improve type
   */
  id?: string;
  /**
   * TODO: improve type
   */
  title?: string;
  /**
   * TODO: improve type
   */
  accessor?: string;
  /**
   * TODO: improve type
   */
  cellType?: "alpha-numeric" | "numeric" | "date" | "node";
  /**
   * TODO: improve type
   */
  sortable?: boolean;
  /**
   * TODO: improve type
   * @param value1
   * @param value2
   */
  sortFunction?: (value1: any, value2: any) => boolean;
  /**
   * TODO: improve type
   */
  searchable?: boolean;
  /**
   * TODO: improve type
   * @param value1
   * @param value2
   */
  searchFunction?: (value1: any, value2: any) => boolean;
};

export interface HvAssetInventoryProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ClassKey>,
    HvActionsCommonProps {
  /**
   * Data passed to the component.
   */
  values: {
    id: string;
  }[];
  /**
   * Labels.
   */
  labels?: {
    /**
     * The label of the sort.
     */
    sortBy?: string;
    /**
     * The label on top of the search box.
     */
    inputLabel?: string;
    /**
     * the placeholder value of the search box.
     */
    placeholder?: string;
  };
  /**
   * Contains the metadata for the values and the necessary configuration for the views,
   * check the views for the specific view configuration.
   */
  configuration: {
    metadata: AssetInventoryMetadata[];
    viewConfiguration: AssetInventoryConfiguration;
  };
  /**
   * Callback evoked in the selection of the card.
   */
  onSelection?: (event: React.FormEvent<HTMLDivElement>, payload: object) => void;
  /**
   * Extra filters
   */
  FilterPlaceholder?: React.ReactElement;
  /**
   * Indicates if the views are selectable.
   */
  isSelectable?: boolean;
  /**
   * Values selected. The list can be maintain internally or it can be passed (overwriting the internal).
   */
  selectedValues?: string[];
  /**
   * The selected view id.
   */
  selectedView?: string;
  /**
   * Defines if it has pagination.
   * TODO: conflate with pagination props
   */
  hasPagination?: boolean;
  /**
   * Enable or disable the server side pagination mechanism
   * TODO: conflate with pagination props
   */
  paginationServerSide?: boolean;
  /**
   * The array of possible page sizes for the dropdown.
   * TODO: conflate with pagination props
   */
  pageSizeOptions?: number[];
  /**
   * Page size.
   * TODO: conflate with pagination props
   */
  pageSize?: number;
  /**
   * The currently selected page (0-indexed)
   * TODO: conflate with pagination props.
   */
  page?: number;
  /**
   * The number of pages the component has.
   * TODO: conflate with pagination props
   */
  pages?: number;
  /**
   * Page change callback.
   * TODO: conflate with pagination props
   */
  onPageChange?: (page: number) => void;
  /**
   * Page size change callback.
   * TODO: conflate with pagination props
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Search callback.
   */
  onSearch?: (value: string) => void;
  /**
   * Sort callback.
   */
  onSortChange?: (value: ListValueProp) => void;
  /**
   * View change callback.
   */
  onViewChange?: (event: React.FormEvent<HTMLDivElement>, value: MultiButtonData[]) => void;
  /**
   * Visual indication of the sort applied. The id is given by the metadata.id+Asc or metadata.id+Desc.
   */
  sortOptionId?: string;
  /**
   * Visual indicator of the search string used.
   */
  searchString?: string;
  /**
   * Disable portal on the Sort dropdown
   */
  disablePortal?: boolean;
  /**
   * Other props passed to the searchbox.
   */
  searchProps?: object;
  /**
   * Other props passed to the Sort. If you want to control the aria-label
   * use the labels.sortBy, as it is mapped directly to the aria-label.
   */
  sortProps?: object;
  /**
   * Array of others prop passed to the created button. Each element must include the id of the view
   * and other props to pe passed to each button.
   */
  multibuttonProps?: object;
}

export type ClassKey =
  | "root"
  | "controlsContainer"
  | "search"
  | "rightControls"
  | "multiButtons"
  | "viewContainer"
  | "sortContainer"
  | "searchBoxContainer"
  | "pagination";

export default function HvAssetInventory(props: HvAssetInventoryProps): JSX.Element | null;