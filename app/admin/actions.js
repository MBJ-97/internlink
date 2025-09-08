
'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function updateInternshipStatus(id, newIsActive) {
  console.log('Updating internship status:', { id, newIsActive })
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { error } = await supabase
    .from('offers')
    .update({ is_active: newIsActive })
    .eq('id', id)

  if (error) {
    console.error('Error updating internship:', error)
    return { error: 'Failed to update internship' }
  }

  console.log('Internship status updated successfully')
  revalidatePath('/admin')
  revalidatePath('/internships')
  revalidatePath('/internships', 'layout')
  return { success: true }
}

export async function addCompany(prevState, formData) {
  console.log('addCompany action started');
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { name, website } = Object.fromEntries(formData.entries())
  console.log('Form data:', { name, website });

  const { data, error } = await supabase.from('companies').insert([{ name, website }]).select()

  console.log('Supabase insert result:', { data, error });

  if (error) {
    console.error('Error adding company:', error)
    return { success: false, error: error.message, data: null }
  }

  console.log('Company added successfully:', data);

  revalidatePath('/admin/add-offer')
  revalidatePath('/admin/add-company')
  return { success: true, error: null, data }
}

export async function addInternship(prevState, formData) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    company_id,
    title,
    location,
    field,
    duration,
    description,
    apply_url,
  } = Object.fromEntries(formData.entries())

  const { data, error } = await supabase.from('offers').insert([
    {
      company_id,
      title,
      location,
      field,
      duration,
      description,
      apply_url,
    },
  ]).select()

  if (error) {
    console.error('Error adding internship:', error)
    return { success: false, error: error.message, data: null }
  }

  revalidatePath('/admin')
  revalidatePath('/internships')
  revalidatePath('/internships', 'layout')
  revalidatePath('/admin/add-offer')
  return { success: true, error: null, data }
}

export async function updateCompany(prevState, formData) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { id, name, website } = Object.fromEntries(formData.entries())

  const { data, error } = await supabase
    .from('companies')
    .update({ name, website })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating company:', error)
    return { success: false, error: error.message, data: null }
  }

  revalidatePath('/admin/companies')
  return { success: true, error: null, data }
}

export async function updateInternship(prevState, formData) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    id,
    company_id,
    title,
    location,
    field,
    duration,
    description,
    apply_url,
  } = Object.fromEntries(formData.entries())

  const { data, error } = await supabase
    .from('offers')
    .update({
      company_id,
      title,
      location,
      field,
      duration,
      description,
      apply_url,
    })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating internship:', error)
    return { success: false, error: error.message, data: null }
  }

  revalidatePath('/admin')
  revalidatePath(`/admin/internships/${id}/edit`)
  return { success: true, error: null, data }
}
