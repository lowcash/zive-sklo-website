import { scrollToHashWithOffset } from '@/lib/navigation-core-adapter'

export { applyCzechNbsp } from '@/lib/typography'

type ScrollToHashOptions = {
  navSelector?: string
  behavior?: ScrollBehavior
}

export function scrollToHashWithNavOffset(
  hash: string,
  { navSelector = 'nav[data-nav-root="true"]', behavior = 'smooth' }: ScrollToHashOptions = {},
) {
  return scrollToHashWithOffset(hash, {
    navSelector,
    behavior,
    updateHash: true,
  })
}
