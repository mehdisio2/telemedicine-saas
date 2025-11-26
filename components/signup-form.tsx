"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUpUser } from "@/lib/utils"

export function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirm = formData.get("confirm-password") as string
    const role = formData.get("role") as "patient" | "doctor"
    const name = formData.get("name") as string

    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    try {
      setLoading(true)
      await signUpUser(email, password, role, name)
      // Redirect or show success toast
    } catch (e) {
      setError("Unable to create account. Please try again.")
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-6">
      <FieldGroup className="rounded-xl border border-gray-200/60 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-semibold text-[#111111]">Create your account</h1>
          <p className="text-sm text-[#4A4A4A]">Fill in the form below to get started</p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel className="text-[#111111]" htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-white/90 border-gray-200/60 rounded-lg focus-visible:ring-2 focus-visible:ring-[#2AB3A3] focus-visible:border-[#2AB3A3]"
          />
        </Field>

        <Field>
          <FieldLabel className="text-[#111111]" htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-white/90 border-gray-200/60 rounded-lg focus-visible:ring-2 focus-visible:ring-[#2AB3A3] focus-visible:border-[#2AB3A3]"
          />
        </Field>

        <Field>
          <FieldLabel className="text-[#111111]" htmlFor="role">Role</FieldLabel>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className="block w-full px-3 py-2.5 text-sm rounded-lg bg-white/90 border border-gray-200/60 text-[#111111] placeholder:text-[#9CA3AF]
                       focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3] transition"
          >
            <option value="" disabled>Select a role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </Field>

        <Field>
          <FieldLabel className="text-[#111111]" htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-white/90 border-gray-200/60 rounded-lg focus-visible:ring-2 focus-visible:ring-[#2AB3A3] focus-visible:border-[#2AB3A3]"
          />
          <FieldDescription className="text-[#4A4A4A]">Must be at least 8 characters long.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel className="text-[#111111]" htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            className="bg-white/90 border-gray-200/60 rounded-lg focus-visible:ring-2 focus-visible:ring-[#2AB3A3] focus-visible:border-[#2AB3A3]"
          />
          <FieldDescription className="text-[#4A4A4A]">Please confirm your password.</FieldDescription>
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-[#2AB3A3] hover:bg-[#1F8478] text-white font-medium shadow-sm hover:shadow-md transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <FieldDescription className="px-6 text-center text-[#4A4A4A]">
            Already have an account?{" "}
            <a href="/login" className="text-[#1F8478] hover:text-[#2AB3A3] font-medium">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
