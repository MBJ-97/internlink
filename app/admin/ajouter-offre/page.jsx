'use client'

import { addInternship } from '@/app/admin/actions'
import Link from 'next/link'
import { useActionState } from 'react'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import wilayas from "@/lib/wilayas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useRouter } from 'next/navigation'

function AddOfferPage() {
  const [state, formAction] = useActionState(addInternship, { success: false, error: null, data: null })
  const formRef = useRef(null)
  const [companies, setCompanies] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchCompanies() {
      const { data } = await supabase.from('companies').select('id, name')
      setCompanies(data || [])
    }
    fetchCompanies()
  }, [])

  useEffect(() => {
    if (state.success && state.redirectTo) {
      formRef.current.reset()
      router.push(state.redirectTo)
    }
  }, [state.success, state.redirectTo, router])

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-md">
        <Link href="/admin" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au tableau de bord
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">Ajouter une nouvelle offre de stage</h1>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <label htmlFor="company_id" className="block text-sm font-medium text-foreground">
              Entreprise
            </label>
            <select
              name="company_id"
              id="company_id"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            >
              <option value="">Sélectionner une entreprise</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground">
              Titre du stage
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-foreground">
              Lieu
            </label>
            <Select name="location" id="location">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un lieu" />
              </SelectTrigger>
              <SelectContent>
                {wilayas.map((wilaya) => (
                  <SelectItem key={wilaya} value={wilaya}>
                    {wilaya}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="field" className="block text-sm font-medium text-foreground">
              Domaine
            </label>
            <input
              type="text"
              name="field"
              id="field"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-foreground">
              Durée
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="apply_url" className="block text-sm font-medium text-foreground">
              URL pour postuler
            </label>
            <input
              type="text"
              name="apply_url"
              id="apply_url"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          >
            Ajouter le stage
          </button>
          {state.success && <p className="text-green-500 text-center mt-4">Stage ajouté avec succès !</p>}
          {state.error && <p className="text-destructive text-center mt-4">{state.error}</p>}
        </form>
      </div>
    </div>
  )
}

export default AddOfferPage
