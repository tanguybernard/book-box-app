"use client";

import { useState } from "react";
import { MapContainer } from "./containers/MapContainer";
import BookBoxList from "./components/BookBoxList";
import SearchBar from "./components/SearchBar";
import { mockBookBoxes, BookBox } from "./data/mockBookBoxes";

export default function HomePage() {
    const [filteredBoxes, setFilteredBoxes] = useState<BookBox[]>(mockBookBoxes);
    const [mapCenter, setMapCenter] = useState<[number, number]>([48.8566, 2.3522]);
    const [mapZoom, setMapZoom] = useState(12);

    const handleSearch = (query: string) => {
        const lowerQuery = query.toLowerCase();
        const filtered = mockBookBoxes.filter(
            (box) =>
                box.name.toLowerCase().includes(lowerQuery) ||
                box.city.toLowerCase().includes(lowerQuery) ||
                box.address.toLowerCase().includes(lowerQuery)
        );
        setFilteredBoxes(filtered);

        if (filtered.length > 0) {
            setMapCenter([filtered[0].lat, filtered[0].lng]);
            setMapZoom(13);
        }
    };

    const handleSelectBox = (box: BookBox) => {
        setMapCenter([box.lat, box.lng]);
        setMapZoom(15);
    };

    return (
        <main className="flex h-screen w-screen overflow-hidden bg-stone-50">
            {/* Sidebar */}
            <div className="w-1/3 min-w-[350px] max-w-[500px] flex flex-col border-r border-stone-200 shadow-xl z-20 bg-white">
                <SearchBar onSearch={handleSearch} />
                <BookBoxList bookBoxes={filteredBoxes} onSelectBox={handleSelectBox} />
            </div>

            {/* Map */}
            <div className="flex-1 relative z-0">
                <MapContainer bookBoxes={filteredBoxes} center={mapCenter} zoom={mapZoom} />
            </div>
        </main>
    );
}