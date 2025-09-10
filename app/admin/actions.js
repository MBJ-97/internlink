"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function addCompany(data) {
  const supabase = createClient();

  const name = data.name;
  const email = data.email;
  const website = data.website;
  const description = data.description;
  const address = data.address;
  const phone = data.phone;

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

export async function updateCompany(data) {
  const supabase = createClient();

  const id = data.id;
  const name = data.name;
  const email = data.email;
  const website = data.website;
  const description = data.description;
  const address = data.address;
  const phone = data.phone;

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

export async function addInternship(data) {
  const supabase = createClient();

  const title = data.title;
  const description = data.description;
  const company_id = data.company_id;
  const location = data.location;
  const duration = data.duration;
  const salary = data.salary;
  const application_link = data.application_link;
  const is_active = data.is_active;

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

export async function updateInternship(data) {
  const supabase = createClient();

  const id = data.id;
  const title = data.title;
  const description = data.description;
  const company_id = data.company_id;
  const location = data.location;
  const duration = data.duration;
  const salary = data.salary;
  const application_link = data.application_link;
  const is_active = data.is_active;

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
