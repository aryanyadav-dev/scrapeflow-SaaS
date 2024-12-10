'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { downloadInvoice } from '@/actions/billing/download-invoice';

export default function InvoiceBtn({ id }: { id: string }) {
  const mutation = useMutation({
    mutationFn: downloadInvoice,
    onSuccess: (data) => (window.location.href = data as string),
    onError: () => {
      toast.error('Something went wrong!');
    },
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs gap-2 text-muted-foreground px-1"
      onClick={() => mutation.mutate(id)}
    >
      Invoice
      {mutation.isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
    </Button>
  );
}
