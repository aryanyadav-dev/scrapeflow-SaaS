'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { duplicateWorkflowSchema, type duplicateWorkflowSchemaType } from '@/schema/workflows';
import { WorkflowStatus } from '@/types/workflow';

export async function duplicateWorkflow(form: duplicateWorkflowSchemaType) {
  const { success, data } = duplicateWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const sourceWorkflow = await prisma.workflow.findUnique({
    where: { id: data.workflowId, userId },
  });

  if (!sourceWorkflow) {
    throw new Error('workflow not found');
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
      status: WorkflowStatus.DRAFT,
      definition: sourceWorkflow.definition,
    },
  });

  if (!result) {
    throw new Error('Failed to duplicate workflow');
  }

  revalidatePath('/workflows');
}
