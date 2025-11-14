"use client";

import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

interface BarcodeScannerProps {
    onDetected: (isbn: string) => void;
}

export default function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
    const [value, setValue] = useState("");

    return (
        <div className="flex flex-col items-center gap-4">
            <BarcodeScannerComponent
                width={300}
                height={300}
                onUpdate={(err, result) => {
                    if (result) {
                        const text = result.getText().trim();
                        setValue(text);
                        onDetected(text);
                    }
                }}
            />
            <p className="text-sm text-gray-600">
                {value ? `ISBN détecté : ${value}` : "Scanne un code-barres de livre"}
            </p>
        </div>
    );
}
