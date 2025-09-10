'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, UsersIcon, ChartBarIcon, MegaphoneIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import BenefitCard from "@/components/BenefitCard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <div
        className="flex min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 mx-4 md:mx-16 my-16 rounded-3xl"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%), url(/hero-image.jpg)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 text-center max-w-3xl"
        >
          <h1 className="text-primary-foreground text-5xl font-black leading-tight tracking-[-0.033em] sm:text-6xl">
            Libérez Votre Potentiel avec une Expérience Concrète
          </h1>
          <h2 className="text-primary-foreground text-base font-normal leading-normal sm:text-lg">
            Connectez-vous avec des entreprises de premier plan et trouvez des stages qui correspondent à vos compétences et à vos objectifs de carrière.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row w-full max-w-[480px] gap-4 items-center"
        >
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="w-full">
            <Button asChild size="lg" className="h-11 bg-primary hover:bg-primary/90 text-primary-foreground w-full font-bold">
              <a href="/admin/ajouter-offre">Ajouter une Offre de Stage</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="w-full">
            <Button className="h-11 bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full font-bold" asChild size="lg">
              <a href="/stages">Trouver des Stages</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="px-8 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pt-5">Avantages pour les Employeurs</h2>
          <div className="flex flex-col gap-10 px-4 py-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-foreground tracking-light text-[32px] font-bold leading-tight sm:text-4xl max-w-[720px]">
                Renforcez Votre Future Main-d'œuvre
              </h1>
              <p className="text-foreground text-base font-normal leading-normal max-w-[720px]">
                Trouvez les meilleurs stagiaires pour contribuer au succès de votre entreprise et bâtir un solide vivier de talents.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0"
            >
              <BenefitCard
                icon={<UsersIcon className="h-6 w-6 text-foreground" />}
                title="Accédez à des Étudiants Talentueux"
                description="Connectez-vous avec un bassin diversifié d'étudiants ambitieux à la recherche d'une expérience concrète."
              />
              <BenefitCard
                icon={<ChartBarIcon className="h-6 w-6 text-foreground" />}
                title="Améliorez Votre Marque Employeur"
                description="Mettez en valeur la culture et les valeurs de votre entreprise pour attirer les meilleurs talents."
              />
              <BenefitCard
                icon={<MegaphoneIcon className="h-6 w-6 text-foreground" />}
                title="Recrutement Simplifié"
                description="Simplifiez votre programme de stage grâce à notre plateforme facile à utiliser."
              />
            </motion.div>
            <div className="flex justify-center mt-8"> {/* Centering div */}
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <a href="/admin/ajouter-offre">Ajouter une Offre de Stage</a>
              </Button>
            </div>
          </div>

          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pt-5 mt-16">Avantages pour les Étudiants</h2>
          <div className="flex flex-col gap-10 px-4 py-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-foreground tracking-light text-[32px] font-bold leading-tight sm:text-4xl max-w-[720px]">
                Lancez Votre Carrière en Toute Confiance
              </h1>
              <p className="text-foreground text-base font-normal leading-normal max-w-[720px]">
                Trouvez le stage idéal pour démarrer votre carrière et acquérir une précieuse expérience industrielle.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0"
            >
              <BenefitCard
                icon={<MagnifyingGlassIcon className="h-6 w-6 text-foreground" />}
                title="Recherche de Stage Facile"
                description="Trouvez des stages qui correspondent à vos compétences et à vos intérêts grâce à nos outils de recherche intuitifs."
              />
              <BenefitCard
                icon={<BriefcaseIcon className="h-6 w-6 text-foreground" />}
                title="Pont vers le Monde Professionnel"
                description="Acquérez une expérience précieuse et construisez votre CV avec des projets concrets."
              />
            </motion.div>
            <div className="flex justify-center mt-8"> {/* Centering div */}
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold">
                <a href="/stages">Trouver des Stages</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
