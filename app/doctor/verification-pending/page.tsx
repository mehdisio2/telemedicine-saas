import { DoctorSidebar } from "@/components/doctor/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerificationPendingPage() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <DoctorSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 text-center">
            {/* Icon */}
            <div className="mx-auto w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-amber-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-semibold text-[#111111] mb-4">
              Verification Pending
            </h1>

            {/* Description */}
            <p className="text-lg text-[#4A4A4A] mb-6 leading-relaxed">
              Thank you for signing up! Your application is currently under review by our
              verification team. This process typically takes 24-48 hours.
            </p>

            {/* What happens next */}
            <div className="bg-[#F9FAFB] rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-[#111111] mb-4">
                What happens next?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#2AB3A3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#4A4A4A]">
                    Our team will review your credentials and documentation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#2AB3A3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#4A4A4A]">
                    You'll receive an email notification once verified
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#2AB3A3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#4A4A4A]">
                    After approval, you can start accepting appointments
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact support */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-[#888888] mb-4">
                Have questions or need to update your information?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/doctor/settings">
                  <Button
                    variant="outline"
                    className="border-[#E5E5E5] text-[#4A4A4A] hover:bg-gray-100 w-full sm:w-auto"
                  >
                    Update Profile
                  </Button>
                </Link>
                <Link href="mailto:support@telemedicine.com">
                  <Button className="bg-[#2AB3A3] hover:bg-[#1F8478] text-white w-full sm:w-auto">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}