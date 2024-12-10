'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PlayIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { runWorkflow } from '@/actions/workflows/run-workflow';

export default function RunBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success('Workflow started', { id: workflowId });
    },
    onError: () => {
      toast.error('Something went wrong!', { id: workflowId });
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading('Scheduling run...', { id: workflowId });
        mutation.mutate({ workflowId });
      }}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  );
}
