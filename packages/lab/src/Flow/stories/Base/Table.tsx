import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import type { NodeGroups } from ".";

export const Table: HvFlowNodeFC<NodeGroups> = (props) => {
  return (
    <HvFlowNode
      description="Table description"
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["prediction", "detection"],
        },
      ]}
      outputs={[
        {
          label: "Insight",
          isMandatory: true,
          provides: "insight",
        },
      ]}
      {...props}
    />
  );
};

Table.meta = {
  label: "Table",
  groupId: "insights",
};
