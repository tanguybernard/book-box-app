"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import { useRouter } from "next/navigation"
import { BookBox } from "../data/mockBookBoxes"

interface MapProps {
    bookBoxes: BookBox[]
    center?: [number, number]
    zoom?: number
}

export default function Map({ bookBoxes, center = [48.8566, 2.3522], zoom = 12 }: MapProps) {
    const mapRef = useRef<L.Map | null>(null)
    const markersRef = useRef<L.Marker[]>([])
    const router = useRouter()

    useEffect(() => {
        if (!mapRef.current) {
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "/leaflet/marker-icon-2x.png",
                iconUrl: "/leaflet/marker-icon.png",
                shadowUrl: "/leaflet/marker-shadow.png",
            })

            const map = L.map("map", {
                center,
                zoom,
                scrollWheelZoom: true,
            })

            L.tileLayer(
                "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
                {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
                }
            ).addTo(map)

            mapRef.current = map
        } else {
            // Update view if center or zoom changes
            mapRef.current.setView(center, zoom)
        }
    }, [center, zoom])

    // Update markers when bookBoxes change
    useEffect(() => {
        if (!mapRef.current) return

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove())
        markersRef.current = []

        bookBoxes.forEach((box) => {
            const marker = L.marker([box.lat, box.lng]).addTo(mapRef.current!)

            const popupContent = `
                <div style="text-align:center; font-family: sans-serif;">
                    <strong style="font-size: 16px; color: #1c1917;">${box.name}</strong><br/>
                    <p style="margin: 4px 0 8px; font-size: 13px; color: #57534e;">${box.address}</p>
                    <button id="btn-${box.id}" 
                        style="margin-top:4px; background:#d97706; color:white; padding:8px 16px; border:none; border-radius:9999px; cursor:pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;">
                        Voir les détails
                    </button>
                </div>
            `
            marker.bindPopup(popupContent)

            marker.on("popupopen", () => {
                const btn = document.getElementById(`btn-${box.id}`)
                if (btn) {
                    btn.addEventListener("click", () => router.push(`/address/${box.id}`))
                }
            })

            markersRef.current.push(marker)
        })
    }, [bookBoxes, router])

    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [])

    return <div id="map" className="w-full h-full" />
}
