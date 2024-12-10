'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CoinsIcon, CreditCard } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { purchaseCredits } from '@/actions/billing/purchase-credits';
import { CreditsPack, PackId } from '@/types/billing';

export default function CreditsPurchase() {
  const [selectedPack, setSelectedPack] = useState(PackId.MEDIUM);

  const mutation = useMutation({
    mutationFn: purchaseCredits,
    onSuccess: () => {},
    onError: () => {},
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <CoinsIcon className="h-6 w-6 text-primary" />
          Purchase Credits
        </CardTitle>
        <CardDescription>Select the number of credits you want to purchase</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={(value) => setSelectedPack(value as PackId)} value={selectedPack}>
          {CreditsPack.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3 hover:bg-secondary"
            >
              <RadioGroupItem value={pack.id} id={pack.id} />
              <Label htmlFor={pack.id} className="flex justify-between w-full cursor-pointer">
                <span className="font-medium">
                  {pack.name} - {pack.label}
                </span>
                <span className="font-bold text-primary">$ {(pack.price / 100).toFixed(2)}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={mutation.isPending}
          onClick={() => {
            mutation.mutate(selectedPack);
          }}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Purchase credits
        </Button>
      </CardFooter>
    </Card>
  );
}
