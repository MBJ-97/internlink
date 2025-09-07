import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function BenefitCard({ icon, title, description }) {
    return (
      <Card>
        <CardHeader>
          {icon}
          <CardTitle className='mt-2 mb-4'>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    )
  }