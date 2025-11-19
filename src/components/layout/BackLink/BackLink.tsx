'use client';

import Link from 'next/link';

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

const BackLink = ({ href, children }: BackLinkProps): React.ReactElement => (
  <div style={{ marginBottom: '1rem' }}>
    <Link href={href} className="text-purple-500 hover:underline">
      {children}
    </Link>
  </div>
);

export default BackLink;
