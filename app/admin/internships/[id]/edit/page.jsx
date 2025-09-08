'use client'

import { updateInternship } from '@/app/admin/actions'
import Link from 'next/link'
import { useActionState, useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'

function EditInternshipPage({ params }) {
  const { id } = use(params)
  const [internship, setInternship] = useState(null)
  const [companies, setCompanies] = useState([])
  const [state, formAction] = useActionState(updateInternship, { success: false, error: null, data: null })

  useEffect(() => {
    async function fetchInternship() {
      const { data } = await supabase.from('offers').select('*').eq('id', id).single()
      setInternship(data)
    }
    async function fetchCompanies() {
      const { data } = await supabase.from('companies').select('id, name')
      setCompanies(data || [])
    }
    if (id) {
      fetchInternship()
      fetchCompanies()
    }
  }, [id])

  if (!internship) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <Link href="/admin" className="text-gray-500 hover:text-gray-700 mb-4 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Internship Offer</h1>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={internship.id} />
          <div>
            <label htmlFor="company_id" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <select
              name="company_id"
              id="company_id"
              required
              defaultValue={internship.company_id}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Internship Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              defaultValue={internship.title}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              defaultValue={internship.location}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="field" className="block text-sm font-medium text-gray-700">
              Field
            </label>
            <input
              type="text"
              name="field"
              id="field"
              required
              defaultValue={internship.field}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              required
              defaultValue={internship.duration}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              required
              defaultValue={internship.description}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="apply_url" className="block text-sm font-medium text-gray-700">
              Apply URL
            </label>
            <input
              type="url"
              name="apply_url"
              id="apply_url"
              required
              defaultValue={internship.apply_url}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Internship
          </button>
          {state.success && <p className="text-green-500 text-center mt-4">Internship updated successfully!</p>}
          {state.error && <p className="text-red-500 text-center mt-4">{state.error}</p>}
        </form>
      </div>
    </div>
  )
}

export default EditInternshipPage
