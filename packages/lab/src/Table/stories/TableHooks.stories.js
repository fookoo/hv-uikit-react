import React, { useCallback, useEffect, useMemo, useState } from "react";
import range from "lodash/range";

import { useTable } from "react-table";

import { Delete, Duplicate, Lock, Unlock, Preview, Ban } from "@hv/uikit-react-icons";

import { HvBulkActions, HvEmptyState, HvPagination, HvToggleButton } from "@hv/uikit-react-core";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvTable,
  useHvPagination,
  useHvSortBy,
  useHvRowSelection,
  useHvBulkActions,
  useHvTableSticky,
  useHvRowExpand,
} from "../..";

import { makeData, getColumns, useServerData } from "./utils";
import LoadingContainer from "./LoadingContainer";

export const Main = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = useTable({
    columns,
    data,
  });

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps({ align: col.align })}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow hover {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps({ align: cell.column.align })}>
                    {cell.render("Cell")}
                  </HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const UseHvTable = () => {
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = useHvTable({
    data,
  });

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const Pagination = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(32), []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    state: { pageSize },
    getHvPaginationProps,
  } = useHvTable({ columns, data }, useHvPagination);

  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan="100%" />
    </HvTableRow>
  );

  return (
    <>
      <HvTableContainer style={{ maxHeight: 400 }}>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {range(pageSize).map((i) => {
              const row = page[i];

              if (!row) return <EmptyRow key={i} />;

              prepareRow(row);

              return (
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? <HvPagination {...getHvPaginationProps()} /> : undefined}
    </>
  );
};

export const Selection = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = useHvTable(
    { columns, data },
    useHvRowSelection
  );

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const BulkActions = () => {
  const columns = useMemo(() => getColumns(), []);
  const [data, setData] = useState(makeData(64));

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    selectedFlatRows,
    toggleAllRowsSelected,
    getHvBulkActionsProps,
    getHvPaginationProps,
  } = useHvTable(
    { columns, data, autoResetSelectedRows: false },
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const handleAction = useCallback(
    (_evt, id, action) => {
      const selected = selectedFlatRows.map((el) => el.original);
      console.log(id, action);

      switch (action.id) {
        case "duplicate": {
          const newEls = selected.map((el) => ({
            ...el,
            id: `${el.id}-copy`,
            name: `${el.name}-copy`,
          }));
          setData([...data, ...newEls]);
          break;
        }
        case "delete": {
          const selectedIds = selected.map((el) => el.id);
          toggleAllRowsSelected(false);
          setData(data.filter((el) => !selectedIds.includes(el.id)));
          break;
        }
        case "lock":
        case "preview":
        default:
          break;
      }
    },
    [data, selectedFlatRows, toggleAllRowsSelected]
  );

  const EmptyStateRow = useCallback(
    () => (
      <HvTableRow>
        <HvTableCell colSpan="100%" style={{ height: 96 }}>
          <HvEmptyState message="No data to display." icon={<Ban role="presentation" />} />
        </HvTableCell>
      </HvTableRow>
    ),
    []
  );

  return (
    <>
      <HvBulkActions
        {...getHvBulkActionsProps()}
        maxVisibleActions={1}
        actionsCallback={handleAction}
        actions={[
          { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
          { id: "delete", label: "Delete", icon: <Delete /> },
          { id: "lock", label: "Lock", icon: <Lock /> },
          { id: "preview", label: "Preview", icon: <Preview /> },
        ]}
      />
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page?.length ? (
              page.map((row) => {
                prepareRow(row);

                return (
                  <HvTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                    ))}
                  </HvTableRow>
                );
              })
            ) : (
              <EmptyStateRow />
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? <HvPagination {...getHvPaginationProps()} /> : undefined}
    </>
  );
};

export const Sortable = () => {
  const sortSeverity = useMemo(() => {
    const levels = ["minor", "average", "major", "critical"];

    return (rowA, rowB, columnId) => {
      const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
      const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

      // eslint-disable-next-line no-nested-ternary
      return a === b ? 0 : a > b ? 1 : -1;
    };
  }, []);

  const columns = useMemo(() => {
    const cols = getColumns();
    cols[5].sortType = sortSeverity;
    return cols;
  }, [sortSeverity]);

  const data = useMemo(() => makeData(5), []);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useHvTable(
    { columns, data },
    useHvSortBy
  );

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const Expandable = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);
  const i18n = useMemo(
    () => ({
      expandRowButtonAriaLabel: "Click to expand this row",
      collapseRowButtonAriaLabel: "Click to collapse this row",
    }),
    []
  );

  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = useHvTable(
    { columns, data, labels: i18n },
    useHvRowExpand
  );

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            // expandable row
            return (
              <React.Fragment key={row.id}>
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                  ))}
                </HvTableRow>
                <HvTableRow style={{ display: row.isExpanded ? null : "none" }}>
                  <HvTableCell
                    style={{ paddingBottom: 0, paddingTop: 0, textAlign: "center" }}
                    colSpan="100%"
                  >
                    <code>{JSON.stringify(row.values, null, 2)}</code>
                  </HvTableCell>
                </HvTableRow>
              </React.Fragment>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const StickyHeadersAndColumns = () => {
  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "name", sticky: "left", width: 120 },
      { Header: "Time", accessor: "createdDate", sticky: "right", width: 100 },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status", width: 70 },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => `${value}%`,
        width: 80,
      },
      { Header: "Severity", accessor: "severity", sticky: "left", width: 100 },
      { Header: "Priority", accessor: "priority", width: 80 },
    ],
    []
  );
  const data = useMemo(() => makeData(100), []);

  const {
    getTableProps,
    getTableHeadProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = useHvTable(
    {
      columns,
      data,
      stickyHeader: true,
    },
    useHvTableSticky
  );

  return (
    <HvTableContainer style={{ maxWidth: 640, maxHeight: 480 }}>
      <HvTable {...getTableProps()}>
        <HvTableHead {...getTableHeadProps()}>
          {headerGroups.map((headerGroup) => (
            <HvTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
              ))}
            </HvTableRow>
          ))}
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const EmptyCells = () => {
  const columns = getColumns();
  const data = makeData(6).map((entry) => ({
    ...entry,
    // make some entries empty
    status: entry.status === "Closed" ? null : entry.status,
  }));

  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = useHvTable({
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }) => value ?? "—",
    },
  });

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>;
                })}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const BulkActionsManual = () => {
  const [data, setData] = useState(
    makeData(64).map((el) => ({ ...el, isSelected: false, disabled: false }))
  );

  const columns = useMemo(
    () => [
      ...getColumns(),
      {
        id: "actions",
        variant: "actions",
        Cell: ({ row }) => {
          const { id, disabled } = row.original;

          return (
            <HvToggleButton
              aria-label="Lock"
              notSelectedIcon={<Unlock />}
              selectedIcon={<Lock />}
              selected={disabled}
              onClick={() =>
                setData(data.map((el) => (el.id !== id ? el : { ...el, disabled: !disabled })))
              }
            />
          );
        },
      },
    ],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    rows,
    selectedFlatRows,
    getHvPaginationProps,
  } = useHvTable(
    { columns, data, autoResetSelectedRows: false },
    useHvPagination,
    useHvRowSelection
  );

  const enabledRows = useMemo(() => rows.filter((el) => !el.original.disabled), [rows]);
  const enabledPage = useMemo(() => page.filter((el) => !el.original.disabled), [page]);

  const handleSelectAllPages = (checked = true) => {
    enabledRows.forEach((row) => {
      prepareRow(row);
      row.toggleRowSelected(checked);
    });
  };

  const handleSelectAll = () => {
    const anySelected = enabledRows.some((el) => el.isSelected);

    if (anySelected) {
      handleSelectAllPages(false);
    } else {
      enabledPage.forEach((row) => {
        prepareRow(row);
        row.toggleRowSelected(true);
      });
    }
  };

  return (
    <>
      <HvBulkActions
        numTotal={rows.length}
        numSelected={selectedFlatRows.length}
        showSelectAllPages
        onSelectAll={handleSelectAll}
        onSelectAllPages={handleSelectAllPages}
      />
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? <HvPagination {...getHvPaginationProps()} /> : undefined}
    </>
  );
};

BulkActionsManual.parameters = {
  docs: {
    description: {
      story:
        "A paginated table with manual selectable rows and bulk actions. The Bulk Actions selection mechanism ignores disabled rows",
    },
  },
};

export const ServerSide = () => {
  const [data, columns, fetchData, loading, pageCount] = useServerData();

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    prepareRow,
    page,
    gotoPage,
    state: { pageSize, pageIndex, sortBy },
    getHvPaginationProps,
  } = useHvTable(
    {
      columns,
      data,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      disableMultiSort: true,
      pageCount,
    },
    useHvSortBy,
    useHvPagination
  );

  useEffect(() => {
    gotoPage(0);
  }, [sortBy, gotoPage]);

  useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy });
  }, [sortBy, fetchData, pageIndex, pageSize]);

  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan="100%" />
    </HvTableRow>
  );

  return (
    <LoadingContainer loading={loading}>
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps({ style: { position: "relative" } })}>
            {range(pageSize).map((i) => {
              const row = page[i];

              if (!row) return <EmptyRow key={i} />;

              prepareRow(row);

              return (
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps()} />
    </LoadingContainer>
  );
};

ServerSide.parameters = {
  docs: {
    description: {
      story:
        "A table with sorting and pagination handled server-side, using React Table. Set `manualPagination` and `manualSortBy` to have manual control over pagination and sorting.",
    },
  },
};
