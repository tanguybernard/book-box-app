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
        <div className="p-4 border-b sticky top-0 bg-white z-10">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    placeholder="Search destination (e.g. Paris)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
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
