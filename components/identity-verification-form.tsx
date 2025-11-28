"use client"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import FileInput from "./ui/input-special-1"

interface IdentityVerificationFormProps {
  data: {
    nationalIdFiles?: File[];
    medicalLicenseFiles?: File[];
  };
  onUpdate: (field: string, value: File[]) => void;
}

export function IdentityVerificationForm({ data, onUpdate }: IdentityVerificationFormProps) {
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
              <FileInput 
                id="national-id-upload"
                data={data.nationalIdFiles}
                onUpdate={(files) => onUpdate("nationalIdFiles", files)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="medical-license-upload">
                Medical License
              </FieldLabel>
              <FieldDescription>
                Upload your valid medical license document (max 10MB per file)
              </FieldDescription>
              <FileInput 
                id="medical-license-upload"
                data={data.medicalLicenseFiles}
                onUpdate={(files) => onUpdate("medicalLicenseFiles", files)}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  )
}