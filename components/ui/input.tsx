import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-10 w-full min-w-0 rounded-xl border border-white/10 bg-[#141417] px-3.5 py-2 text-base text-white placeholder:text-zinc-500 shadow-sm transition-all outline-none md:text-sm',
        'focus-visible:border-[#DAA640] focus-visible:ring-1 focus-visible:ring-[#DAA640]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-rose-500/20 aria-invalid:border-rose-500',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
