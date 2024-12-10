'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { flowToExecutionPlan } from '@/lib/workflow/execution-plan';
import { calculateWorkflowCost } from '@/lib/workflow/helpers';
import { WorkflowStatus } from '@/types/workflow';

export async function publishWorkflow({ id, flowDefinition }: { id: string; flowDefinition: string }) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    throw new Error('workflow not found');
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error('workflow is not a draft');
  }

  const flow = JSON.parse(flowDefinition);
  const result = flowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error('flow validation not valid');
  }

  if (!result.executionPlan) {
    throw new Error('no execution plan generated');
  }

  const creditsCost = calculateWorkflowCost(flow.nodes);

  await prisma.workflow.update({
    where: { id, userId },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
