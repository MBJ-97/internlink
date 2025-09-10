"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function deleteCompany(id) {
  const supabase = createClient();
  const { error } = await supabase.from("companies").delete().match({ id });

  if (error) {
    console.error("Failed to delete company:", error);
    if (error.code === '23503') { // Foreign key violation error code
      throw new Error("Cannot delete company: It has associated internship records. Please delete all internships tied to this company first.");
    } else {
      throw new Error("Failed to delete company.");
    }
  }

  revalidatePath("/admin/entreprises");
}

export async function deleteInternship(id) {
  const supabase = createClient();
  const { error } = await supabase.from("offers").delete().match({ id });

  if (error) {
    console.error("Failed to delete internship:", error);
    throw new Error("Failed to delete internship.");
  }

  revalidatePath("/admin");
}