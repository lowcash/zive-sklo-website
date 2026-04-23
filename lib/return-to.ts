const RETURN_TO_URL_PARSER_BASE = 'https://return-to.invalid'
const DEFAULT_RETURN_TO = '/'

type ReturnToSearchParams = {
  returnTo?: string | string[]
}

export async function resolveReturnToFromSearchParams(searchParams?: Promise<ReturnToSearchParams>) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined

  return resolveReturnTo(resolvedSearchParams?.returnTo)
}

export function resolveReturnTo(returnTo: string | string[] | undefined) {
  return isSafeReturnTo(returnTo) ? returnTo : DEFAULT_RETURN_TO
}

function isSafeReturnTo(returnTo: string | string[] | undefined): returnTo is string {
  return typeof returnTo === 'string' && returnTo.startsWith('/')
}

export function appendReturnToParam(href: string, returnTo: string) {
  const targetUrl = new URL(href, RETURN_TO_URL_PARSER_BASE)
  targetUrl.searchParams.set('returnTo', returnTo)

  return `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
}
