import { css } from "@emotion/css";
import {
  HvFlowNode,
  HvFlowNodeFC,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";

import { NodeData, data } from "./data";
import type { NodeGroups } from ".";

export const BarChart: HvFlowNodeFC<NodeGroups> = (props) => {
  const { id } = props;
  const inputNodes = useFlowInputNodes<NodeData>(id);
  const country = inputNodes[0]?.data.country;

  return (
    <HvFlowNode
      description="Bar Chart"
      expanded
      classes={{ root: css({ width: 500 }) }}
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["data"],
          maxConnections: 1,
        },
      ]}
      {...props}
    >
      {country && (
        <div
          className={css({
            height: 300,
          })}
        >
          <HvBarChart
            data={data[country]}
            groupBy="Month"
            measures="Precipitation"
            yAxis={{
              name: "mm",
            }}
            grid={{ bottom: 40, top: 40 }}
          />
        </div>
      )}
    </HvFlowNode>
  );
};

BarChart.meta = {
  label: "Bar Chart",
  groupId: "visualizations",
};
