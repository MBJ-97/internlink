
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
  const logoFile = formData.get("logo_url");
  const sector = formData.get("sector");
  const description = formData.get("description");
  const values_culture = formData.get("values_culture");
  const contact_name = formData.get("contact_name");
  const contact_email = formData.get("contact_email");

  let logoUrl = null;

  if (logoFile && logoFile.size > 0) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("company_logos")
      .upload(`public/${name.replace(/\s+/g, '-')}-${Date.now()}`, logoFile);

    if (uploadError) {
      console.error("Error uploading logo:", uploadError);
      return { error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from("company_logos")
      .getPublicUrl(uploadData.path);

    logoUrl = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from("companies").insert({
    name,
    website,
    logo_url: logoUrl,
    sector,
    description,
    values_culture,
    contact_name,
    contact_email,
  });

  if (error) {
    console.error("Error adding company:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/entreprises");
  revalidatePath("/entreprises");
  return { success: true, redirectTo: "/admin/entreprises" };
}

export async function updateCompany(prevState, formData) {
  console.log("Server-side FormData (updateCompany):");
  console.log(Object.fromEntries(formData.entries()));
  const supabase = createClient();

  const id = formData.get("id");
  const name = formData.get("name");
  const website = formData.get("website");
  const logoFile = formData.get("logo_url");
  const currentLogoUrl = formData.get("current_logo_url");
  const sector = formData.get("sector");
  const description = formData.get("description");
  const values_culture = formData.get("values_culture");
  const contact_name = formData.get("contact_name");
  const contact_email = formData.get("contact_email");

  let logoUrl = currentLogoUrl;

  if (logoFile && logoFile.size > 0) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("company_logos")
      .upload(`public/${name.replace(/\s+/g, '-')}-${Date.now()}`, logoFile);

    if (uploadError) {
      console.error("Error uploading new logo:", uploadError);
      return { error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from("company_logos")
      .getPublicUrl(uploadData.path);

    logoUrl = publicUrlData.publicUrl;

    // Delete the old logo if it exists
    if (currentLogoUrl) {
      const oldLogoPath = currentLogoUrl.split('/company_logos/')[1];
      if(oldLogoPath) {
        await supabase.storage.from("company_logos").remove([oldLogoPath]);
      }
    }
  }

  const { error } = await supabase
    .from("companies")
    .update({
      name,
      website,
      logo_url: logoUrl,
      sector,
      description,
      values_culture,
      contact_name,
      contact_email,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating company:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/entreprises");
  revalidatePath("/entreprises");
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
    console.error('Error checking for associated offers:', offersError);
    return { error: 'An unexpected error occurred while checking for associated offers.' };
  }

  if (offers && offers.length > 0) {
    return { error: 'This company cannot be deleted because it has associated offers. Please delete the offers first.' };
  }

  // First, get the company details to find the logo URL
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('logo_url')
    .eq('id', id)
    .single();

  if (companyError) {
    console.error('Error fetching company for deletion:', companyError);
    return { error: 'Could not find the company to delete.' };
  }

  // Now, try to delete the company from the database
  const { error: deleteError } = await supabase.from("companies").delete().eq("id", id);

  if (deleteError) {
    console.error("Error deleting company:", deleteError);
    return { error: "An unexpected error occurred while deleting the company." };
  }

  // If the company was deleted successfully, delete its logo from storage
  if (company.logo_url) {
    const oldLogoPath = company.logo_url.split('/company_logos/')[1];
    if (oldLogoPath) {
        const { error: storageError } = await supabase.storage
            .from('company_logos')
            .remove([oldLogoPath]);

        if (storageError) {
            console.error('Error deleting company logo:', storageError);
            // This is not a critical error, the company is deleted.
            // We can just log it and not return an error to the user.
        }
    }
  }

  revalidatePath("/admin/entreprises");
  revalidatePath("/entreprises");
  return { success: true };
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
  const domain = formData.get("domain");
  const speciality = formData.get("speciality");
  const is_active = formData.get("is_active") === "on";

  const { error } = await supabase.from("offers").insert({
    title,
    description,
    company_id,
    location,
    duration,
    apply_url,
    domain,
    speciality,
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
  const domain = formData.get("domain");
  const speciality = formData.get("speciality");
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
      domain,
      speciality,
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
