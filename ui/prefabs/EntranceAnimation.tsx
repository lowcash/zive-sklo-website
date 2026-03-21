'use client'

import type { ReactNode } from 'react'

import { motion } from 'framer-motion'

/**
 * EntranceAnimation - Client leaf component for staggered reveal
 * Uses framer-motion for entrance animations
 */
export function EntranceAnimation({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
