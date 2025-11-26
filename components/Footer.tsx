import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200/60 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-semibold text-[#111111]">Telemedicine</div>
            <p className="mt-3 text-sm text-[#4A4A4A]">
              Trusted online care with licensed clinicians.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#111111]">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#4A4A4A]">
              <li><Link className="hover:text-[#2AB3A3]" href="/book">Book Appointment</Link></li>
              <li><Link className="hover:text-[#2AB3A3]" href="/doctors">Doctors</Link></li>
              <li><Link className="hover:text-[#2AB3A3]" href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#111111]">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#4A4A4A]">
              <li><Link className="hover:text-[#2AB3A3]" href="/about">About</Link></li>
              <li><Link className="hover:text-[#2AB3A3]" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-[#2AB3A3]" href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#111111]">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#4A4A4A]">
              <li><Link className="hover:text-[#2AB3A3]" href="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-[#2AB3A3]" href="/terms">Terms</Link></li>
              <li><Link className="hover:text-[#2AB3A3]" href="/security">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4A4A4A]">
            © {new Date().getFullYear()} Telemedicine. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link className="text-[#4A4A4A] hover:text-[#2AB3A3]" href="/status">Status</Link>
            <Link className="text-[#4A4A4A] hover:text-[#2AB3A3]" href="/help">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}