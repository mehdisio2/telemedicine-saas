"use client"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import FileInput from "./ui/input-special-1"

export function IdentityVerificationForm() {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="national-id-upload">
                National ID Card
              </FieldLabel>
              <FieldDescription>
                Upload front and back of your national ID card (max 10MB per file)
              </FieldDescription>
              <FileInput />
            </Field>

            <Field>
              <FieldLabel htmlFor="medical-license-upload">
                Medical License
              </FieldLabel>
              <FieldDescription>
                Upload your valid medical license document (max 10MB per file)
              </FieldDescription>
              <FileInput />
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  )
}