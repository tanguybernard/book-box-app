"use client"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("../components/Map"), {
    ssr: false,
    loading: () => <p>Chargement de la carte...</p>,
})

interface MapContainerProps {
    bookBoxes: any[]
    center?: [number, number]
    zoom?: number
}

export function MapContainer({ bookBoxes, center, zoom }: MapContainerProps) {
    return (
        <div className="w-full h-full">
            <Map bookBoxes={bookBoxes} center={center} zoom={zoom} />
        </div>
    )
}
