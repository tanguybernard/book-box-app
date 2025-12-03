"use client";

import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="p-6 border-b border-stone-200 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto w-full">
                <input
                    type="text"
                    placeholder="Rechercher une ville (ex: Paris)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-full border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all shadow-sm hover:shadow-md"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </form>
        </div>
    );
}
