"use client"
import { MapContainer } from "../containers/MapContainer"
import { mockBookBoxes } from "../data/mockBookBoxes"

export default function MapPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-2xl font-semibold mb-6">Carte de Paris</h1>
            <MapContainer bookBoxes={mockBookBoxes} />
        </main>
    )
}