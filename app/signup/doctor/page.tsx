"use client"

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

const steps = [
  { title: 'Basic Account Information', icon: UserCircle },
  { title: 'Professional Details', icon: Stethoscope },
  { title: 'Identity Verification Uploads', icon: FileCheck },
  { title: 'Review & Submit', icon: Eye },
]

export default function DoctorSignupPage() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[#111111]">Doctor Registration</h1>
          <p className="text-sm font-light text-[#888888]">
            Complete the following steps to create your doctor account.
          </p>
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
            {steps.map((step, index) => {
              return (
                <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
                  <StepperTrigger className="flex flex-col items-start justify-center gap-2.5 grow" asChild>
                    <StepperIndicator className="size-8 border-2 data-[state=completed]:text-white data-[state=completed]:bg-[#2AB3A3] data-[state=active]:border-[#2AB3A3] data-[state=active]:text-[#2AB3A3] data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground">
                      <step.icon className="size-4" />
                    </StepperIndicator>
                    <div className="flex flex-col items-start gap-1">
                      <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                        Step {index + 1}
                      </div>
                      <StepperTitle className="text-start text-sm font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                        {step.title}
                      </StepperTitle>
                      <div>
                        <Badge
                          size="sm"
                          className="hidden group-data-[state=active]/step:inline-flex bg-[#2AB3A3]/10 text-[#2AB3A3] hover:bg-[#2AB3A3]/20"
                        >
                          In Progress
                        </Badge>

                        <Badge
                          size="sm"
                          className="hidden group-data-[state=completed]/step:inline-flex bg-[#2AB3A3] text-white hover:bg-[#1F8478]"
                        >
                          Completed
                        </Badge>

                        <Badge
                          variant="secondary"
                          size="sm"
                          className="hidden group-data-[state=inactive]/step:inline-flex text-muted-foreground"
                        >
                          Pending
                        </Badge>
                      </div>
                    </div>
                  </StepperTrigger>

                  {steps.length > index + 1 && (
                    <StepperSeparator className="absolute top-4 inset-x-0 start-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-[#2AB3A3]" />
                  )}
                </StepperItem>
              )
            })}
          </StepperNav>

          <StepperPanel className="text-sm">
            {steps.map((step, index) => (
              <StepperContent key={index} value={index + 1} className="min-h-[400px]">
                <div className="rounded-xl  p-6 ">
                  <h2 className="text-xl font-semibold text-[#111111] mb-4">{step.title}</h2>
                  <div className="text-[#4A4A4A]">
                    {/* Replace this section with your actual form content */}
                    {index === 0 && (
                      // Step 1: Basic Account Information
                        <SignupForm />
                    )}
                    
                    {index === 1 && (
                        // Step 2: Professional Details
                        <ProfessionalDetailsForm />
                    )}
                    
                    {index === 2 && (
                      // Step 3: Identity Verification Uploads
                      <div className="space-y-4">
                        {/* Add file upload components for ID, certificates, etc. */}
                        <p className="text-sm text-[#888888]">File upload components for ID, medical license, certificates here</p>
                      </div>
                    )}
                    
                    {index === 3 && (
                      // Step 4: Review & Submit
                      <div className="space-y-4">
                        {/* Display summary of all entered information */}
                        <p className="text-sm text-[#888888]">Review summary of all information here</p>
                      </div>
                    )}
                  </div>
                </div>
              </StepperContent>
            ))}
          </StepperPanel>

          <div className="flex items-center justify-between gap-2.5">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 1}
              className="border-[#E5E5E5] text-[#111111] hover:bg-[#F9FAFB]"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={currentStep === steps.length}
              className="bg-[#2AB3A3] text-white hover:bg-[#1F8478]"
            >
              {currentStep === steps.length ? 'Submit' : 'Next'}
            </Button>
          </div>
        </Stepper>
      </div>
    </div>
  )
}