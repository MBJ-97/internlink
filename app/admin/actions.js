
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function addCompany(prevState, formData) {
  console.log("Server-side FormData (addCompany):");
  console.log(Object.fromEntries(formData.entries()));
  const supabase = createClient();

  const name = formData.get("name");
  const website = formData.get("website");

  const { error } = await supabase.from("companies").insert({
    name,
    website,
  });

  if (error) {
    console.error("Error adding company:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/entreprises");
  return { success: true, redirectTo: "/admin/entreprises" };
}

export async function updateCompany(prevState, formData) {
  console.log("Server-side FormData (updateCompany):");
  console.log(Object.fromEntries(formData.entries()));
  const supabase = createClient();

  const id = formData.get("id");
  const name = formData.get("name");
  const website = formData.get("website");

  const { error } = await supabase
    .from("companies")
    .update({
      name,
      website,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating company:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/entreprises");
  return { success: true, redirectTo: "/admin/entreprises" };
}

export async function deleteCompany(id) {
  const supabase = createClient();

  // Check if the company has any associated offers
  const { data: offers, error: offersError } = await supabase
    .from('offers')
    .select('id')
    .eq('company_id', id);

  if (offersError) {
    console.error("Error checking for offers:", offersError);
    throw new Error('Could not verify company offers.');
  }

  if (offers && offers.length > 0) {
    console.log(`Attempted to delete company ${id} which has ${offers.length} offers.`);
    throw new Error('This company cannot be deleted because it has active offers.');
  }

  const { error } = await supabase.from("companies").delete().eq("id", id);

  if (error) {
    console.error("Error deleting company:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/entreprises");
}

export async function addInternship(prevState, formData) {
  console.log("Server-side FormData (addInternship):");
  console.log(formData);
  const supabase = createClient();

  const title = formData.get("title");
  const description = formData.get("description");
  const company_id = formData.get("company_id");
  const location = formData.get("location");
  const duration = formData.get("duration");
  const apply_url = formData.get("apply_url");
  const field = formData.get("field");
  const is_active = formData.get("is_active") === "on";

  const { error } = await supabase.from("offers").insert({
    title,
    description,
    company_id,
    location,
    duration,
    apply_url,
    field,
    is_active,
  });

  if (error) {
    console.error("Error adding internship:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/stages");
  return { success: true, redirectTo: "/admin" };
}

export async function updateInternship(prevState, formData) {
  console.log("Server-side FormData (updateInternship):");
  console.log(Object.fromEntries(formData.entries()));
  const supabase = createClient();
  const id = formData.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  const company_id = formData.get("company_id");
  const location = formData.get("location");
  const duration = formData.get("duration");
  const apply_url = formData.get("apply_url");
  const field = formData.get("field");
  const is_active = formData.get("is_active") === "on";
  const { error } = await supabase
    .from("offers")
    .update({
      title,
      description,
      company_id,
      location,
      duration,
      apply_url,
      field,
      is_active,
    })
    .eq("id", id);
  if (error) {
    console.error("Error updating internship:", error);
    return { error: error.message };
  }
  revalidatePath("/admin");
  return { success: true, redirectTo: "/admin" };
}

export async function deleteInternship(id) {
  const supabase = createClient();

  const { error } = await supabase.from("offers").delete().eq("id", id);

  if (error) {
    console.error("Error deleting internship:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/offres");
  revalidatePath("/stages");
}

export async function updateInternshipStatus(id, is_active) {
  const supabase = createClient();

  const { error } = await supabase
    .from("offers")
    .update({ is_active })
    .eq("id", id);

  if (error) {
    console.error("Error updating internship status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/offres");
  revalidatePath("/stages");
  return { success: true };
}
