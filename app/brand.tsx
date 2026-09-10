import Link from 'next/link';
import Image from 'next/image';

export default function Brand({ size = 'default' }: { size?: 'small' | 'default' }) {
  const width = size === 'small' ? 140 : 176;
  const height = size === 'small' ? 70 : 88;
  const className = size === 'small' ? 'tap-logo-window small' : 'tap-logo-window';

  return (
    <Link href="/" aria-label="The Animal Place Homepage" className="inline-block">
      <div className={className} style={{ width, height, overflow: 'hidden', position: 'relative' }}>
        <Image 
          src="/tap-logo.jpg" 
          alt="The Animal Place Logo" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </Link>
  );
}
