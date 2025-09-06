import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">InternLink</h3>
            <p className="text-gray-500 dark:text-gray-400">Connecting interns with opportunities.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/internships">Internships</a></li>
              <li><a href="/companies">Companies</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">LinkedIn</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">GitHub</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} InternLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
