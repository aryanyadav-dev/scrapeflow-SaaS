'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { CoinsIcon, Loader2Icon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import ReactCountUpWrapper from '@/components/react-count-up-wrapper';

import { getAvailableCredits } from '@/actions/billing/get-available-credits';
import { cn } from '@/lib/utils';

export default function UserAvailableCreditsBadge() {
  const query = useQuery({
    queryKey: ['user-available-credits'],
    queryFn: () => getAvailableCredits(),
    refetchInterval: 30 * 1000, // 30 seconds
  });

  return (
    <Link
      href="/billing"
      className={cn(
        'w-full space-x-2 items-center',
        buttonVariants({
          variant: 'outline',
        })
      )}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {query.isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
        {!query.isLoading && query.data && <ReactCountUpWrapper value={query.data} />}
        {!query.isLoading && query.data === undefined && '-'}
      </span>
    </Link>
  );
}
