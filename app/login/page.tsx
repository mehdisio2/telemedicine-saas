import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-[#F9FAFB]">
      {/* Left: Brand + Form */}
      <div className="flex flex-col gap-6 p-6 md:p-10">
        {/* Brand */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <div className="bg-[#2AB3A3] text-white flex size-9 items-center justify-center rounded-lg">
              {/* Brand mark */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13h3l2-5 3 10 2-5h6"
                />
              </svg>
            </div>
            <span className="text-[#111111]">TeleMed</span>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="rounded-xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm p-6 md:p-8">
              <div>
                <h1 className="text-2xl font-semibold text-[#111111]">
                  Welcome back
                </h1>
                <p className="mt-1 text-sm text-[#4A4A4A]">
                  Sign in to access your dashboard and appointments.
                </p>
              </div>
              <div className="mt-6">
                <LoginForm />
              </div>
            </div>

            {/* Secondary text */}
          </div>
        </div>
      </div>

      {/* Right: Themed Image */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/login-image.jpg"
          alt="Telemedicine consultation"
          fill
          priority={false}
          sizes="50vw"
          className="object-cover"
        />
        {/* Brand overlay tint to match theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6F9F0]/60 via-transparent to-[#2AB3A3]/20" />
      </div>
    </div>
  )
}
