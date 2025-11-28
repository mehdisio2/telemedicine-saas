"use client"

export const dynamic = "force-dynamic";

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { UserCircle, Stethoscope, FileCheck, Check, LoaderCircleIcon, Eye } from 'lucide-react'
import { SignupForm } from '@/components/signup-form1'
import { ProfessionalDetailsForm } from '@/components/professional-details-form'
import { IdentityVerificationForm } from '@/components/identity-verification-form'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Type definitions
type BasicInfo = {
  full_name: string
  email: string
  password: string
}

type ProfessionalInfo = {
  specialty: string
  license_number: string
  identity_card_number: string
}

type IdentityInfo = {
  nationalIdFiles: File[]
  medicalLicenseFiles: File[]
}

type DoctorFormData = {
  basicInfo: BasicInfo
  professionalInfo: ProfessionalInfo
  identityInfo: IdentityInfo
}

const steps = [
  { title: 'Basic Account Information', icon: UserCircle },
  { title: 'Professional Details', icon: Stethoscope },
  { title: 'Identity Verification Uploads', icon: FileCheck },
  { title: 'Review & Submit', icon: Eye },
]

export default function DoctorSignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState<DoctorFormData>({
    basicInfo: { full_name: '', email: '', password: '' },
    professionalInfo: { specialty: '', license_number: '', identity_card_number: '' },
    identityInfo: { nationalIdFiles: [], medicalLicenseFiles: [] },
  })

  const updateBasicInfo = (data: Partial<BasicInfo>) =>
    setFormData(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, ...data } }))

  const updateProfessionalInfo = (data: Partial<ProfessionalInfo>) =>
    setFormData(prev => ({ ...prev, professionalInfo: { ...prev.professionalInfo, ...data } }))

  const updateIdentityInfo = (field: string, value: File[]) =>
    setFormData(prev => ({ ...prev, identityInfo: { ...prev.identityInfo, [field]: value } }))

  const handleSubmit = async () => {
    console.log('🚀 Submission start')
    console.log('📋 Payload snapshot:', {
      basicInfo: { ...formData.basicInfo, password: '***' },
      professionalInfo: formData.professionalInfo,
      identityFiles: {
        nationalIdFiles: formData.identityInfo.nationalIdFiles.map(f => f.name),
        medicalLicenseFiles: formData.identityInfo.medicalLicenseFiles.map(f => f.name),
      },
    })

    setIsSubmitting(true)
    try {
      console.log('📝 Creating auth user...')
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.basicInfo.email,
        password: formData.basicInfo.password,
        options: {
          data: {
            full_name: formData.basicInfo.full_name,
            user_type: 'doctor',
          },
        },
      })
      if (authError) { console.error('❌ Auth error', authError); throw authError }
      if (!authData.user) throw new Error('Missing user data after signup')

      const doctorId = authData.user.id
      console.log('✅ Auth user created:', doctorId)

      console.log('📤 Uploading documents to bucket: doctors-documents')
      let nationalIdPath: string | null = null
      let licensePath: string | null = null

      if (formData.identityInfo.nationalIdFiles.length > 0) {
        const file = formData.identityInfo.nationalIdFiles[0]
        nationalIdPath = `${doctorId}/national-id-${Date.now()}-${file.name}`
        console.log('➡️ Upload national ID file:', { name: file.name, path: nationalIdPath })
        const { error: upErr } = await supabase.storage
          .from('doctor-documents')
          .upload(nationalIdPath, file)
        if (upErr) { console.error('❌ National ID upload failed', upErr); throw upErr }
        console.log('✅ National ID stored')
      } else {
        console.log('ℹ️ No national ID file provided')
      }

      if (formData.identityInfo.medicalLicenseFiles.length > 0) {
        const file = formData.identityInfo.medicalLicenseFiles[0]
        licensePath = `${doctorId}/license-${Date.now()}-${file.name}`
        console.log('➡️ Upload license file:', { name: file.name, path: licensePath })
        const { error: upErr } = await supabase.storage
          .from('doctor-documents')
          .upload(licensePath, file)
        if (upErr) { console.error('❌ License upload failed', upErr); throw upErr }
        console.log('✅ License stored')
      } else {
        console.log('ℹ️ No license file provided')
      }

      const doctorRow = {
        id: doctorId,
        full_name: formData.basicInfo.full_name,
        specialty: formData.professionalInfo.specialty || null,
        license_number: formData.professionalInfo.license_number || null,
        national_id: formData.professionalInfo.identity_card_number || null,
        verification_status: 'pending',
        license_document_path: licensePath,
        national_id_document_path: nationalIdPath,
      }

      console.log('💾 Inserting doctor row:', doctorRow)
      const { error: insertErr } = await supabase.from('doctors').insert(doctorRow)
      if (insertErr) { console.error('❌ Insert error', insertErr); throw insertErr }
      console.log('✅ Doctor row inserted')

      toast.success('Registration successful. Verify your email.')
      console.log('🎉 Submission complete')
      router.push('/signup/success')
    } catch (err: any) {
      console.error('🛑 Submission failed:', {
        message: err.message,
        code: err.code,
        details: err.details,
        hint: err.hint,
      })
      toast.error(err.message || 'Submission failed')
    } finally {
      setIsSubmitting(false)
      console.log('🏁 Submission end')
    }
  }

  const handleNextOrSubmit = async () => {
    if (currentStep === steps.length) await handleSubmit()
    else setCurrentStep(s => s + 1)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[#111111]">Doctor Registration</h1>
          <p className="text-sm font-light text-[#888888]">Complete the following steps.</p>
        </div>

        <Stepper
          value={currentStep}
          onValueChange={setCurrentStep}
          indicators={{
            completed: <Check className="size-4" />,
            loading: <LoaderCircleIcon className="size-4 animate-spin" />,
          }}
          className="space-y-8"
        >
          <StepperNav className="gap-3 mb-15">
            {steps.map((step, i) => (
              <StepperItem key={i} step={i + 1} className="relative flex-1 items-start">
                <StepperTrigger className="flex flex-col items-start justify-center gap-2.5 grow" asChild>
                  <StepperIndicator className="size-8 border-2 data-[state=completed]:text-white data-[state=completed]:bg-[#2AB3A3] data-[state=active]:border-[#2AB3A3] data-[state=active]:text-[#2AB3A3] data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground">
                    <step.icon className="size-4" />
                  </StepperIndicator>
                  <StepperTitle className="text-sm font-medium text-[#111111]">
                    {step.title}
                  </StepperTitle>
                </StepperTrigger>
                {steps.length > i + 1 && (
                  <StepperSeparator className="absolute top-4 inset-x-0 start-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[state=completed]/step:bg-[#2AB3A3]" />
                )}
              </StepperItem>
            ))}
          </StepperNav>

            <StepperPanel className="text-sm">
              {steps.map((step, i) => (
                <StepperContent key={i} value={i + 1} className="min-h-[400px]">
                  <div className="rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-[#111111] mb-4">{step.title}</h2>
                    {i === 0 && (
                      <SignupForm data={formData.basicInfo} onUpdate={updateBasicInfo} />
                    )}
                    {i === 1 && (
                      <ProfessionalDetailsForm data={formData.professionalInfo} onUpdate={updateProfessionalInfo} />
                    )}
                    {i === 2 && (
                      <IdentityVerificationForm data={formData.identityInfo} onUpdate={updateIdentityInfo} />
                    )}
                    {i === 3 && (
                      <div className="space-y-6 text-sm">
                        <div>
                          <h3 className="font-semibold">Basic</h3>
                          <p>Name: {formData.basicInfo.full_name || '—'}</p>
                          <p>Email: {formData.basicInfo.email || '—'}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Professional</h3>
                          <p>Specialty: {formData.professionalInfo.specialty || '—'}</p>
                          <p>License #: {formData.professionalInfo.license_number || '—'}</p>
                          <p>National ID #: {formData.professionalInfo.identity_card_number || '—'}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Documents</h3>
                          <p>National ID File: {formData.identityInfo.nationalIdFiles[0]?.name || 'None'}</p>
                          <p>License File: {formData.identityInfo.medicalLicenseFiles[0]?.name || 'None'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </StepperContent>
              ))}
            </StepperPanel>

          <div className="flex items-center justify-between gap-2.5">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(p => p - 1)}
              disabled={currentStep === 1 || isSubmitting}
              className="border-[#E5E5E5]"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextOrSubmit}
              disabled={isSubmitting}
              className="bg-[#2AB3A3] text-white hover:bg-[#1F8478]"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : currentStep === steps.length ? 'Submit' : 'Next'}
            </Button>
          </div>
        </Stepper>
      </div>
    </div>
  )
}