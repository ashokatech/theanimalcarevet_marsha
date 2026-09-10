import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#132e51',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'The Animal Place | Modern Veterinary Care in Hyderabad',
  description: 'Thoughtful veterinary care for your companions. Wellness, diagnostics, surgery, vaccinations, grooming & more. Srinagar Colony, Hyderabad. Open 7 days, 9AM-9PM.',
  keywords: ['veterinary clinic', 'vet', 'Hyderabad', 'Srinagar Colony', 'animal care', 'pet grooming', 'pet surgery'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'The Animal Place',
  },
  openGraph: {
    title: 'The Animal Place | Modern Veterinary Care',
    description: 'Thoughtful veterinary care for your companions in Srinagar Colony, Hyderabad.',
    url: 'https://theanimalplace.vet',
    siteName: 'The Animal Place',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: 'The Animal Place Veterinary Clinic',
    image: 'https://theanimalplace.vet/tap-logo.jpg',
    '@id': 'https://theanimalplace.vet',
    url: 'https://theanimalplace.vet',
    // [DATA NEEDED: Official Clinic Phone Number]
    telephone: '+91-XXXXXXXXXX',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      // [DATA NEEDED: Exact Building / Door No. & Landmark]
      streetAddress: 'Srinagar Colony, Yousufguda [DATA NEEDED: Exact Landmark]',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500073',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      // [DATA NEEDED: Latitude & Longitude for Srinagar Colony location]
      latitude: '17.4368',
      longitude: '78.4357'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '09:00',
        closes: '21:00'
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
