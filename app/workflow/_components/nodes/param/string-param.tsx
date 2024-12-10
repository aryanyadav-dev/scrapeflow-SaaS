'use client';

import { useEffect, useId, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { ParamProps } from '@/types/appnode';

export default function StringParam({ param, value, updateNodeParamValue, disabled }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === 'textarea') {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        className="text-xs "
        value={internalValue}
        placeholder="Enter value here"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInternalValue(e.target.value)}
        onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && <p className="text-muted-foreground px-2">{param.helperText}</p>}
    </div>
  );
}
