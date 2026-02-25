'use client'

import { CreateLandingPageForm } from '@/components/dashboard/landing-pages/CreateForm'

export default function RegistrationPage() {
  return (
    <div className="flex flex-col -mx-6 -my-6 h-[calc(100vh-4rem)]">
      <CreateLandingPageForm />
    </div>
  )
}
