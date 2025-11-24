import SearchFilter from "@/components/search-filter"

export default function NewAppointmentPage() {
    return (
        <div className="min-h-screen">
            <main className="px-4 max-w-4xl mx-auto">
                {/* sticky filter that sits under the layout navbar.
                    Adjust `top-16` if your NavBar height is different. */}
                <div className="sticky top-8 z-40">
                    <div className="w-full px-4">
                        <SearchFilter className="p-2! gap-2!" />
                    </div>
                </div>

                {/* Page content goes here */}
                <div className="pt-6">
                    {/* ... */}
                </div>
            </main>
        </div>
    )
}
