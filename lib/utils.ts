import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "./supabase/client";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function signUpUser(
  email: string,
  password: string,
  name: string
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;
  console.log("Created user:", user);
  if (!user) throw new Error("User was not created");

  const { error: profileError } = await supabase
    .from("patients")
    .insert([
      {
        id: user.id,
        email: user.email,
        name,
      },
    ]);

  if (profileError) throw profileError;

  return user;
}

export async function loginUser(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;

  // Query your profiles table using the authenticated user's id
  const { data: profile, error: profileError } = await supabase
    .from("patients")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) throw profileError;

  return profile;
}

// app/getDoctorsBySpecialty.ts

export async function getDoctorsBySpecialty({ specialty }: { specialty: string }) {
  console.log("Fetching doctors with specialty:", specialty);
  const supabase = createClient();
  const { data, error } = await supabase
    .from('doctors')
    .select('id, name, email, specialty')
    .eq('role', 'doctor')
    .eq('specialty', specialty);

  if (error) throw error;
  return data ?? [];
}
