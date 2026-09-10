import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'The Animal Place | Veterinary Care',description:'Thoughtful care for your companions. Appointments, vaccination records, and a connected clinic workspace.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
