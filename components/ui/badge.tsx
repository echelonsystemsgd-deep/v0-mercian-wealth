import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all',
  {
    variants: {
      variant: {
        default:
          'border-white/10 bg-[#141417] text-zinc-200 [a&]:hover:bg-[#1C1C22]',
        secondary:
          'border-white/10 bg-[#0B0B0D] text-zinc-400 [a&]:hover:text-zinc-200',
        destructive:
          'border-rose-500/20 bg-rose-500/10 text-rose-400',
        outline:
          'border-white/10 text-zinc-300 [a&]:hover:bg-white/5',
        gold:
          'border-[#DAA640]/30 bg-[#DAA640]/10 text-[#DAA640]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
