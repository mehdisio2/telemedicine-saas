export default function DoctorPage() {
    const appointments = [
        { id: "a1", patient: "John Smith", time: "09:00 AM" },
        { id: "a2", patient: "Maria Garcia", time: "10:30 AM" },
        { id: "a3", patient: "Liam Wong", time: "01:00 PM" },
    ];

    return (
        <main style={{ fontFamily: "system-ui", padding: 20 }}>
            <h1>Dr. Jane Doe</h1>
            <p>Telemedicine - General Practice</p>

            <h2>Today's Appointments</h2>
            <ul>
                {appointments.map((a) => (
                    <li key={a.id}>
                        {a.time} — {a.patient}
                    </li>
                ))}
            </ul>
        </main>
    );
}
