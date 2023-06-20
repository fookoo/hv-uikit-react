import {
  HvBaseChart,
  HvBaseChartClasses,
  HvBaseChartCommonProps,
  HvBaseChartLineProps,
} from "../BaseChart";

export interface HvLineChartClasses extends HvBaseChartClasses {}

export interface HvLineChartProps
  extends HvBaseChartCommonProps,
    HvBaseChartLineProps {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLineChartClasses;
}

/**
 * A line chart or line plot or line graph is a type of chart which displays information as a series of data points
 * connected by straight line segments. It is a basic type of chart common in many fields.
 */
export const HvLineChart = ({
  data,
  groupBy,
  splitBy,
  measures,
  sortBy,
  xAxis,
  yAxis,
  legend,
  tooltip,
  seriesNameFormatter,
  area = false,
  stack,
  emptyCellMode = "void",
  horizontalRangeSlider,
  areaOpacity = 0.5,
  classes,
  grid,
}: HvLineChartProps) => {
  return (
    <HvBaseChart
      type="line"
      data={data}
      groupBy={groupBy}
      splitBy={splitBy}
      measures={measures}
      sortBy={sortBy}
      xAxis={xAxis}
      yAxis={yAxis}
      legend={legend}
      tooltip={tooltip}
      seriesNameFormatter={seriesNameFormatter}
      area={area}
      stack={stack}
      emptyCellMode={emptyCellMode}
      horizontalRangeSlider={horizontalRangeSlider}
      areaOpacity={areaOpacity}
      classes={classes}
      grid={grid}
    />
  );
};