import { supabase } from "./supabase"

export async function saveEntry(entry: {
  date: string
  tag?: string
  note?: string
}) {
  return supabase.from("entries").insert([entry])
}

export async function getEntries(): Promise<Record<string, { tag?: string; note?: string }>> {
  const { data, error } = await supabase.from("entries").select("*")
  if (error) {
    console.log("Error fetching entries:", error) 
  } else {
    console.log("Entries fetched successfully:", data)
  }
  const result: Record<string, { tag?: string; note?: string }> = {}
  data?.forEach((row) => {
    result[row.date] = { tag: row.tag, note: row.note }
  })
  return result
}
