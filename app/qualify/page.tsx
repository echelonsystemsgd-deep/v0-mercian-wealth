import { redirect } from "next/navigation"

export default async function QualifyPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = await props.searchParams
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(searchParams || {})) {
    if (typeof v === "string") {
      q.set(k, v)
    }
  }
  const queryStr = q.toString()
  redirect(queryStr ? `/book?${queryStr}` : "/book")
}
