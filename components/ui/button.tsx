import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-[#DAA640] hover:bg-[#E5B85C] text-black font-semibold rounded-xl border border-[#DAA640]/40 transition-all duration-200 shadow-md hover:shadow-[0_0_15px_rgba(218,166,64,0.25)]',
        destructive:
          'bg-rose-600/90 text-white hover:bg-rose-600 border border-rose-500/20 focus-visible:ring-rose-500/20 rounded-xl transition-all',
        outline:
          'bg-transparent border border-white/10 hover:bg-white/5 text-zinc-200 hover:text-white rounded-xl font-medium transition-all duration-200',
        secondary:
          'bg-[#141417] text-zinc-200 border border-white/10 hover:bg-[#1C1C22] hover:text-white rounded-xl font-medium transition-all duration-200',
        ghost:
          'hover:bg-white/5 text-zinc-300 hover:text-white rounded-xl transition-all duration-200',
        link: 'text-[#DAA640] underline-offset-4 hover:underline rounded-xl',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3 text-sm',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2 text-xs',
        lg: 'h-12 px-6 py-3 has-[>svg]:px-5 text-sm font-semibold',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      suppressHydrationWarning={true}
      {...props}
    />
  )
}

export { Button, buttonVariants }
