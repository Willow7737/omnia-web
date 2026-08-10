import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Button — ALF design language (DESIGN.md §4, §6).
 *
 *   • Pills: `rounded-full` at every size, not 12px rounded rectangles.
 *   • No elevated cards: `shadow-xs` is the only shadow (a hair-thin
 *     separation, not a card lift).
 *   • Press interaction is scale (0.97) + opacity (0.85), not Material's
 *     ink ripple and not `translate-y-px`.
 *
 * Padding/typography per `src/components/Button.tsx` in bluesky-social/social-app:
 *   large  · 12/24  · gap-6  · 15/medium
 *   small  · 8/14   · gap-5  · 13.1/medium
 *   tiny   · 5/10   · gap-3  · 11.3/semibold
 */
const buttonVariants = cva(
  "pressable active:pressable-active inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // solid primary: primary_500 → primary_600 on hover/active (DESIGN.md §4)
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:outline-destructive dark:bg-destructive/60",
        // solid secondary: contrast_50 → contrast_100
        outline:
          "border border-border bg-card text-foreground shadow-xs hover:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
      },
      size: {
        // large · 12/24 · gap-6 · 15/medium
        default: "h-10 px-6 gap-1.5 text-[15px] has-[>svg]:px-5",
        // small · 8/14 · gap-5 · 13.1/medium
        sm: "h-8 px-3.5 gap-1.25 text-[13px] has-[>svg]:px-3",
        // tiny · 5/10 · gap-3 · 11.3/semibold
        xs: "h-7 px-2.5 gap-0.75 text-[11px] font-semibold has-[>svg]:px-2",
        lg: "h-12 px-8 gap-1.5 text-[15px] has-[>svg]:px-7",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
