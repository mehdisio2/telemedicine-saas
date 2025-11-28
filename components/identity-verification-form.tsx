"use client"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'

export function IdentityVerificationForm() {
  const nationalIdProps = useSupabaseUpload({
    bucketName: 'doctor-documents',
    path: 'national-ids',
    allowedMimeTypes: ['image/*', 'application/pdf'],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 10, // 10MB
  })

  const medicalLicenseProps = useSupabaseUpload({
    bucketName: 'doctor-documents',
    path: 'medical-licenses',
    allowedMimeTypes: ['image/*', 'application/pdf'],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 10, // 10MB
  })

  const certificatesProps = useSupabaseUpload({
    bucketName: 'doctor-documents',
    path: 'certificates',
    allowedMimeTypes: ['image/*', 'application/pdf'],
    maxFiles: 5,
    maxFileSize: 1000 * 1000 * 10, // 10MB
  })

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
              <Dropzone {...nationalIdProps}>
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
            </Field>

            <Field>
              <FieldLabel htmlFor="medical-license-upload">
                Medical License
              </FieldLabel>
              <FieldDescription>
                Upload your valid medical license document (max 10MB per file)
              </FieldDescription>
              <Dropzone {...medicalLicenseProps}>
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  )
}