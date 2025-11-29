'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={styles.container}>
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong!</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          {error.message || 'An unexpected error occurred'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1rem',
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

