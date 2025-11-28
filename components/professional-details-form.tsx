"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ProfessionalDetailsForm() {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="specialty">
                Medical Specialty
              </FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                  <SelectItem value="general-practice">General Practice</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="obstetrics-gynecology">Obstetrics & Gynecology</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="psychiatry">Psychiatry</SelectItem>
                  <SelectItem value="radiology">Radiology</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                Choose your primary area of medical specialization
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="license-number">
                Medical License Number
              </FieldLabel>
              <Input
                id="license-number"
                name="license-number"
                placeholder="e.g., MD123456"
                required
              />
              <FieldDescription>
                Enter your valid medical license number
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="national-id">
                National ID Number
              </FieldLabel>
              <Input
                id="national-id"
                name="national-id"
                placeholder="e.g., 1234567890"
                required
              />
              <FieldDescription>
                Enter your national identification number
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  )
}