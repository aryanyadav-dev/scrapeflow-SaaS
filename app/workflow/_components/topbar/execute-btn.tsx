'use client';

import { PlayIcon } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { runWorkflow } from '@/actions/workflows/run-workflow';
import useExecutionPlan from '@/hooks/use-execution-plan';

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success('Execution started', { id: 'flow-execution' });
    },
    onError: () => {
      toast.error('Something went wrong!', { id: 'flow-execution' });
    },
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // Client side validation
          return;
        }

        mutation.mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}
