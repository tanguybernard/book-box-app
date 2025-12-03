"use client";

import { useState } from "react";
import { MapContainer } from "./containers/MapContainer";
import BookBoxList from "./components/BookBoxList";
import SearchBar from "./components/SearchBar";
import { mockBookBoxes, BookBox } from "./data/mockBookBoxes";
import styles from "./page.module.css";

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
        <main className={styles.main}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <SearchBar onSearch={handleSearch} />
                <BookBoxList bookBoxes={filteredBoxes} onSelectBox={handleSelectBox} />
            </div>

            {/* Map */}
            <div className={styles.mapContainer}>
                <MapContainer bookBoxes={filteredBoxes} center={mapCenter} zoom={mapZoom} />
            </div>
        </main>
    );
}