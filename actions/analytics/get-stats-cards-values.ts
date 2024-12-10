'use server';

import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { periodToDateRange } from '@/lib/helper/dates';
import { Period } from '@/types/analytics';
import { WorkflowExecutionStatus } from '@/types/workflow';

const { COMPLETED, FAILED } = WorkflowExecutionStatus;

export async function getStatsCardsValues(period: Period) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const dateRange = periodToDateRange(period);

  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: { in: [COMPLETED, FAILED] },
    },
    select: {
      creditsConsumed: true,
      phases: {
        where: {
          creditsConsumed: { not: null },
        },
        select: { creditsConsumed: true },
      },
    },
  });

  const stats = {
    workflowExecutions: executions.length,
    creditsConsumed: 0,
    phaseExecutions: 0,
  };

  stats.creditsConsumed = executions.reduce((sum, execution) => sum + execution.creditsConsumed, 0);
  stats.phaseExecutions = executions.reduce((sum, execution) => sum + execution.phases.length, 0);

  return stats;
}
