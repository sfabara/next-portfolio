import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { useOnClickOutside } from "usehooks-ts"

import { cn } from "@/lib/utils"

interface Tab {
  title: string
  icon: LucideIcon
  target?: string
}

interface Separator {
  type: "separator"
}

type TabItem = Tab | Separator

function isSeparator(item: TabItem): item is Separator {
  return 'type' in item && item.type === 'separator'
}

interface ExpandedTabsProps {
  tabs: TabItem[]
  className?: string
  activeColor?: string
  onChange?: (index: number | null) => void
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
}

const transition = { delay: 0.1, type: "spring" as const, bounce: 0, duration: 0.6 }

export function ExpandedTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandedTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null)
  const outsideClickRef = React.useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  )

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null)
    onChange?.(null)
  })

  const handleSelect = (index: number) => {
    setSelected(index)
    onChange?.(index)
  }

  const Separator = () => (
    <div className=" h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
  )

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        " flex gap-2 rounded-2xl border bg-background p-1 shadow-sm ",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (isSeparator(tab)) {
          return <Separator key={`separator-${index}`} />
        }

        const Icon = tab.icon
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn("bg-[#e8d5b8] dark:bg-muted", activeColor)
                : "text-[#3B3A3A] dark:text-muted-foreground hover:bg-[#e8d5b8] dark:hover:bg-muted hover:text-[#151515] dark:hover:text-foreground"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
