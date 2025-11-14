"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import { useRouter } from "next/navigation"


export default function Map() {
    const mapRef = useRef<L.Map | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Nettoyage si une carte existait déjà
        if (mapRef.current) {
            mapRef.current.remove()
            mapRef.current = null
        }

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "./leaflet/marker-icon-2x.png",
            iconUrl: "./fealflet/marker-icon.png",
            shadowUrl: "./leaflet/marker-shadow.png",
        })

        // Création de la carte Leaflet
        const map = L.map("map", {
            center: [48.8566, 2.3522], // coordonnées de Paris
            zoom: 10,
            scrollWheelZoom: false,
        })

        L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png",
            {
                attribution: "©Stamen Design, ©OpenStreetMap contributors",
            }
        ).addTo(map)

        const cities = [
            { name: "Paris", coords: [48.8566, 2.3522], slug: "paris" },
            { name: "Lyon", coords: [45.764, 4.8357], slug: "lyon" },
            { name: "Marseille", coords: [43.2965, 5.3698], slug: "marseille" },
        ]

        cities.forEach((city) => {
            const marker = L.marker(city.coords as [number, number]).addTo(map)
            const popupContent = `
    <div style="text-align:center;">
      <strong>${city.name}</strong><br/>
      <button id="btn-${city.slug}" 
        style="margin-top:6px;background:#2563eb;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;">
        Voir les détails
      </button>
    </div>
  `
            marker.bindPopup(popupContent)

            marker.on("popupopen", () => {
                const btn = document.getElementById(`btn-${city.slug}`)
                if (btn) {
                    btn.addEventListener("click", () => router.push(`/address/${city.slug}`))
                }
            })
        })


        mapRef.current = map

        // Cleanup lors du démontage du composant
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [router])

    return <div id="map" className="w-full h-full" />
}
