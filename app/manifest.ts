import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Bibliothèque Locale',
        short_name: 'BiblioBox',
        description: 'Gérez facilement les livres présents dans votre espace, même hors connexion',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#059669', // emerald-600
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
