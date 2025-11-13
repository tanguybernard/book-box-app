"use client"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("../components/Map"), {
    ssr: false, // indispensable pour Leaflet
    loading: () => <p>Chargement de la carte...</p>,
})

export function MapContainer() {
    return (
        <div className="flex justify-center items-center">
            <div className="w-[30rem] h-[30rem] border-2 border-black rounded-2xl overflow-hidden shadow-lg">
                <Map />
            </div>
        </div>
    )
}
