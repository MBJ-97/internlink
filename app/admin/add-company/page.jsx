'use client'

import { addCompany } from '../actions'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { useEffect, useRef } from 'react'

function AddCompanyPage() {
  const [state, formAction] = useFormState(addCompany, { success: false, error: null, data: null })
  const formRef = useRef(null)

  useEffect(() => {
    if (state.success) {
      formRef.current.reset()
    }
  }, [state.success])

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-gray-50 p-8 rounded-lg shadow-md">
        <Link href="/admin" className="text-gray-500 hover:text-gray-700 mb-4 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Company</h1>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              name="website"
              id="website"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Company
          </button>
          {state.success && <p className="text-green-500 text-center mt-4">Company added successfully!</p>}
          {state.error && <p className="text-red-500 text-center mt-4">{state.error}</p>}
        </form>
      </div>
    </div>
  )
}

export default AddCompanyPage
