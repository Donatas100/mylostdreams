import Link from 'next/link'
import styles from './page.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '1rem',
            display: 'inline-block',
          }}
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

