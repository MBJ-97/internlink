'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { motion } from "framer-motion"
  
  export default function BenefitCard({ icon, title, description }) {
    return (
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card>
          <CardHeader>
            {icon}
            <CardTitle className='mt-2 mb-4'>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    )
  }