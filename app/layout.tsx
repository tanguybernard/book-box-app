import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bibliothèque Locale',
    description: 'Gérez facilement les livres présents dans votre espace, même hors connexion',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Bibliothèque Locale',
    },
    formatDetection: {
        telephone: false,
    },
    themeColor: '#059669',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className="min-h-screen bg-gray-50">
                {children}
            </body>
        </html>
    );
}
