"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { fetchUserRole } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await loginUser(email, password);

      if (!user) {
        console.error("User not found");
        return;
      }

      console.log("Logged in user:", user);
      router.push("patient/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error logging in:", error);
    }

    // If you later use role-based redirect, ensure this stays inside handleLogin and is awaited.
    const userRole = await fetchUserRole();
    if (userRole.role === "patient") {
      router.push("/patient/dashboard");
    } else if (userRole.role === "doctor" && userRole.status === "approved") {
      router.push("/doctor/dashboard");
    } else if (userRole.role === "doctor" && userRole.status === "pending") {
      router.push("/doctor/verification-pending");  
    } else {
      router.push("/login");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel
            htmlFor="email"
            className="text-sm font-medium text-[#4A4A4A]"
          >
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="h-10 border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3] text-[#111111] placeholder:text-[#888888]"
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel
              htmlFor="password"
              className="text-sm font-medium text-[#4A4A4A]"
            >
              Password
            </FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm text-[#2AB3A3] hover:text-[#1F8478] underline-offset-4 hover:underline font-normal"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-10 border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3] text-[#111111]"
          />
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full h-10 bg-[#2AB3A3] text-white font-medium rounded-lg hover:bg-[#1F8478] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:ring-offset-2 transition-colors"
          >
            Login
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center text-sm font-light text-[#888888]">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-[#2AB3A3] hover:text-[#1F8478] underline underline-offset-4 font-normal"
            >
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}