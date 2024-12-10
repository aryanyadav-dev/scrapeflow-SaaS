import { memo } from 'react';
import { NodeProps } from '@xyflow/react';

import NodeCard from '@/app/workflow/_components/nodes/node-card';
import NodeHeader from '@/app/workflow/_components/nodes/node-header';
import { NodeInput, NodeInputs } from '@/app/workflow/_components/nodes/node-inputs';
import { NodeOutput, NodeOutputs } from '@/app/workflow/_components/nodes/node-outputs';

import { TaskRegistry } from '@/lib/workflow/task/registry';
import { AppNodeData } from '@/types/appnode';

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>

      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput key={output.name} output={output} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';
