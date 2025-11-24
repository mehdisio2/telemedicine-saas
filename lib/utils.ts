import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "@/lib/supabaseClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function signUpUser(
  email: string,
  password: string,
  role: "patient" | "doctor",
  name: string
) {
  if (!supabase) throw new Error("Supabase client not initialized");
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;
  console.log("Created user:", user);
  if (!user) throw new Error("User was not created");

  const { error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: user.id,
        email: user.email,
        role,
        name,
      },
    ]);

  if (profileError) throw profileError;

  return user;
}

export async function loginUser(email: string, password: string) {
  if (!supabase) throw new Error("Supabase client not initialized");
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;

  // Query your profiles table using the authenticated user's id
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) throw profileError;

  return profile;
}
