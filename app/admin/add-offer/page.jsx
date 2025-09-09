'use client'

import { addInternship } from '../actions'
import Link from 'next/link'
import { useActionState } from 'react'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

function AddOfferPage() {
  const [state, formAction] = useActionState(addInternship, { success: false, error: null, data: null })
  const formRef = useRef(null)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    async function fetchCompanies() {
      const { data } = await supabase.from('companies').select('id, name')
      setCompanies(data || [])
    }
    fetchCompanies()
  }, [])

  useEffect(() => {
    if (state.success) {
      formRef.current.reset()
    }
  }, [state.success])

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-md">
        <Link href="/admin" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Internship Offer</h1>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <label htmlFor="company_id" className="block text-sm font-medium text-foreground">
              Company
            </label>
            <select
              name="company_id"
              id="company_id"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground">
              Internship Title
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
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="field" className="block text-sm font-medium text-foreground">
              Field
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
              Duration
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
              Apply URL
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
            Add Internship
          </button>
          {state.success && <p className="text-green-500 text-center mt-4">Internship added successfully!</p>}
          {state.error && <p className="text-destructive text-center mt-4">{state.error}</p>}
        </form>
      </div>
    </div>
  )
}

export default AddOfferPage
