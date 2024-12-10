'use client';

import { ParamProps } from '@/types/appnode';

export default function BrowserInstanceParam({ param }: ParamProps) {
  return <p className="text-xs">{param.name}</p>;
}
