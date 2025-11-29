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
              className={styles.postCard}
            >
              <h2 className={styles.postCardTitle}>
                {post.title}
              </h2>
              <p className={styles.postCardDate}>
                {post.date}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

