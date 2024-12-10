import { BrainIcon } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const ExtractDataWithAiTask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: 'Extract data with AI',
  icon: (props) => <BrainIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  credits: 4,
  inputs: [
    {
      name: 'Content',
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: 'Credentials',
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: 'Prompt',
      type: TaskParamType.STRING,
      required: true,
      variant: 'textarea',
    },
  ] as const,
  outputs: [
    {
      name: 'Extracted data',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
