import { supabase } from "./supabase"

export async function saveEntry(entry: {
  date: string
  tag?: string
  note?: string
}) {
  return supabase.from("entries").upsert([entry])
}

export async function getEntries(): Promise<Record<string, { tag?: string; note?: string }>> {
  const { data } = await supabase.from("entries").select("*")
  const result: Record<string, { tag?: string; note?: string }> = {}
  data?.forEach((row) => {
    result[row.date] = { tag: row.tag, note: row.note }
  })
  return result
}
