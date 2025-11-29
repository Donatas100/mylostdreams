import Link from 'next/link'
import { posts } from '@/data/posts'
import styles from '../page.module.css'

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.link}>← Back to Lumen</Link>
        <h1 className={styles.title} style={{ marginTop: '2rem' }}>
          All Posts
        </h1>
      </header>

      <main className={styles.main}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '2rem',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 191, 36, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h2 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 400, 
                marginBottom: '0.5rem',
                color: 'var(--text-primary)'
              }}>
                {post.title}
              </h2>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)',
                fontWeight: 300
              }}>
                {post.date}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

