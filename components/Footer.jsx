import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-muted dark:bg-muted mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">InternLink</h3>
            <p className="text-muted-foreground dark:text-muted-foreground">Connecter les stagiaires aux opportunités.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul>
              <li><a href="/stages">Stages</a></li>
              <li><a href="/entreprises">Entreprises</a></li>
              <li><a href="/about">À Propos</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground">GitHub</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground dark:text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InternLink. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
