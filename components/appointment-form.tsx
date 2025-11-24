"use client"

import { useState, useEffect, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabaseClient"

interface Doctor {
  id: string
  name: string | null
}

export function NewAppointment() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    async function loadDoctors() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name")
        .eq("role", "doctor")

      if (!error && data) {
        setDoctors(data as Doctor[])
      }
    }

    loadDoctors()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const datetime = new Date(`${date}T${time}:00`).toISOString()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from("appointments").insert({
      patient_id: user.id,
      doctor_id: doctorId,
      datetime,
      description,
      status: "scheduled",
    })

    if (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-6">
      <FieldGroup>

        <Field>
          <FieldLabel>Doctor</FieldLabel>
          <Select onValueChange={(value: string) => setDoctorId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.name ?? "Unnamed doctor"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Date</FieldLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Time</FieldLabel>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Reason for visit</FieldLabel>
          <FieldDescription>Describe your symptoms or concerns.</FieldDescription>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </Field>

      </FieldGroup>

      <Button type="submit">Schedule Appointment</Button>
    </form>
  )
}
