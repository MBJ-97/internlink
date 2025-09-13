'use client'

import { addCompany } from "@/app/admin/actions";
import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { companySectors } from '@/lib/sectors';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";

function AddCompanyPage() {
  const [state, formAction] = useActionState(addCompany, { success: false, error: null, data: null })
  const formRef = useRef(null)
  const router = useRouter()
  const [logoPreview, setLogoPreview] = useState(null)

  useEffect(() => {
    if (state.success && state.redirectTo) {
      formRef.current.reset()
      router.push(state.redirectTo)
    }
  }, [state.success, state.redirectTo, router])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoPreview(URL.createObjectURL(file))
    } else {
      setLogoPreview(null)
    }
  }

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-md">
        <Link href="/admin" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au tableau de bord
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">Ajouter une nouvelle entreprise</h1>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-foreground">
              Site web
            </label>
            <input
              type="url"
              name="website"
              id="website"
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="logo_url" className="block text-sm font-medium text-foreground">
              Logo de l'entreprise
            </label>
            <input
              type="file"
              name="logo_url"
              id="logo_url"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
            {logoPreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground">Aperçu du logo :</p>
                <img src={logoPreview} alt="Aperçu du logo" className="mt-2 h-20 w-20 object-contain" />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="sector" className="block text-sm font-medium text-foreground">
              Secteur
            </label>
            <Select name="sector">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un secteur" />
              </SelectTrigger>
              <SelectContent>
                {companySectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="values_culture" className="block text-sm font-medium text-foreground">
              Valeurs et culture
            </label>
            <textarea
              name="values_culture"
              id="values_culture"
              rows="4"
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="contact_name" className="block text-sm font-medium text-foreground">
              Nom du contact
            </label>
            <input
              type="text"
              name="contact_name"
              id="contact_name"
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="contact_email" className="block text-sm font-medium text-foreground">
              Email du contact
            </label>
            <input
              type="email"
              name="contact_email"
              id="contact_email"
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          >
            Ajouter l'entreprise
          </button>
          {state.success && <p className="text-green-500 text-center mt-4">Entreprise ajoutée avec succès !</p>}
          {state.error && <p className="text-destructive text-center mt-4">{state.error}</p>}
        </form>
      </div>
    </div>
  )
}

export default AddCompanyPage