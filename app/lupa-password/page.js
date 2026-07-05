'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LupaPasswordPage() {
  const router = useRouter();
  useEffect(() => { router.replace('/forgot-password'); }, [router]);
  return null;
}
