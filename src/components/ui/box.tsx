import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  bgColor?: string
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, bgColor = 'bg-white', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bgColor, 'border border-gray-100', className)}
        {...props}
      />
    )
  }
)
Box.displayName = 'Box'

export { Box }
