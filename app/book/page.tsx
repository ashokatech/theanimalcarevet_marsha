import Booking from './booking';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Visit | The Animal Place',
  description: 'Book your veterinary appointment at The Animal Place in Srinagar Colony, Hyderabad.',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <Booking />;
}
