/**
 * next/image does not prepend basePath to string `src` values, so static
 * assets referenced by URL must add it themselves. NEXT_PUBLIC_BASE_PATH
 * is inlined at build time from next.config.ts.
 */
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
}
