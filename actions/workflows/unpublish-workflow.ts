'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { WorkflowStatus } from '@/types/workflow';

export async function unpublishWorkflow(id: string) {
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

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error('workflow is not published');
  }

  await prisma.workflow.update({
    where: { id, userId },
    data: {
      status: WorkflowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
