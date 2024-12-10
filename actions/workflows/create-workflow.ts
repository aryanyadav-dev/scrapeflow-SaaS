'use server';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Edge } from '@xyflow/react';

import prisma from '@/lib/prisma';
import { createFlowNode } from '@/lib/workflow/create-flow-node';
import { createWorkflowSchema, type createWorkflowSchemaType } from '@/schema/workflows';
import { WorkflowStatus } from '@/types/workflow';
import { AppNode } from '@/types/appnode';
import { TaskType } from '@/types/task';

export async function createWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  // Let's add the flow entry point
  initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) {
    throw new Error('Failed to create workflow');
  }

  redirect(`/workflow/editor/${result.id}`);
}
