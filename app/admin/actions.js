"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function addCompany(formData) {
  const supabase = createClient();

  const name = formData.get("name");
  const email = formData.get("email");
  const website = formData.get("website");
  const description = formData.get("description");
  const address = formData.get("address");
  const phone = formData.get("phone");

  const { error } = await supabase.from("companies").insert({
    name,
    email,
    website,
    description,
    address,
    phone,
  });

  if (error) {
    console.error("Error adding company:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/entreprises");
  return { success: true, redirectTo: "/admin/entreprises" };
}

export async function updateCompany(formData) {
  const supabase = createClient();

  const id = formData.get("id");
  const name = formData.get("name");
  const email = formData.get("email");
  const website = formData.get("website");
  const description = formData.get("description");
  const address = formData.get("address");
  const phone = formData.get("phone");

  const { error } = await supabase
    .from("companies")
    .update({
      name,
      email,
      website,
      description,
      address,
      phone,
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

  const { error } = await supabase.from("companies").delete().eq("id", id);

  if (error) {
    console.error("Error deleting company:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/entreprises");
}

export async function addInternship(formData) {
  const supabase = createClient();

  const title = formData.get("title");
  const description = formData.get("description");
  const company_id = formData.get("company_id");
  const location = formData.get("location");
  const duration = formData.get("duration");
  const salary = formData.get("salary");
  const application_link = formData.get("application_link");
  const is_active = formData.get("is_active") === "on";

  const { error } = await supabase.from("offers").insert({
    title,
    description,
    company_id,
    location,
    duration,
    salary,
    application_link,
    is_active,
  });

  if (error) {
    console.error("Error adding internship:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/offres");
  return { success: true, redirectTo: "/admin/offres" };
}

export async function updateInternship(formData) {
  const supabase = createClient();

  const id = formData.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  const company_id = formData.get("company_id");
  const location = formData.get("location");
  const duration = formData.get("duration");
  const salary = formData.get("salary");
  const application_link = formData.get("application_link");
  const is_active = formData.get("is_active") === "on";

  const { error } = await supabase
    .from("offers")
    .update({
      title,
      description,
      company_id,
      location,
      duration,
      salary,
      application_link,
      is_active,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating internship:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/offres");
  return { success: true, redirectTo: "/admin/offres" };
}

export async function deleteInternship(id) {
  const supabase = createClient();

  const { error } = await supabase.from("offers").delete().eq("id", id);

  if (error) {
    console.error("Error deleting internship:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/offres");
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
  return { success: true };
}
