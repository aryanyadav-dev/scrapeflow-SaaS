'use server';

import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';

export async function getWorkflowExecutions(workflowId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  return prisma.workflowExecution.findMany({
    where: {
      userId,
      workflowId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
