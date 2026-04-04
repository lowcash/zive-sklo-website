const WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000)
const MAX_ATTEMPTS = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 3)

type Entry = {
  count: number
  expiresAt: number
}

type RateLimitResult = {
  allowed: boolean
  retryAfterSeconds: number
}

const globalStore = globalThis as typeof globalThis & {
  __contactRateLimitStore?: Map<string, Entry>
}

const store = globalStore.__contactRateLimitStore ?? new Map<string, Entry>()
globalStore.__contactRateLimitStore = store

function getNow() {
  return Date.now()
}

function toKey(identifier: string) {
  return `contact:${identifier}`
}

function pruneExpired(now: number) {
  for (const [key, entry] of store.entries()) {
    if (entry.expiresAt <= now) {
      store.delete(key)
    }
  }
}

export function checkContactRateLimit(identifier: string): RateLimitResult {
  const now = getNow()
  pruneExpired(now)

  const key = toKey(identifier)
  const existing = store.get(key)

  if (!existing || existing.expiresAt <= now) {
    store.set(key, {
      count: 1,
      expiresAt: now + WINDOW_MS,
    })

    return {
      allowed: true,
      retryAfterSeconds: 0,
    }
  }

  if (existing.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.expiresAt - now) / 1000),
    }
  }

  existing.count += 1
  store.set(key, existing)

  return {
    allowed: true,
    retryAfterSeconds: 0,
  }
}
