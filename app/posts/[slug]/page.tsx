import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts, getPostBySlug } from '@/data/posts'
import styles from './page.module.css'

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Define next post in the journey
  const getNextPost = (currentSlug: string) => {
    if (currentSlug === 'you-live-in-a-system') {
      return posts.find(p => p.slug === 'the-chain-of-creators-planet-that-teaches')
    }
    if (currentSlug === 'the-chain-of-creators-planet-that-teaches') {
      return posts.find(p => p.slug === 'the-next-link-in-the-chain-children-of-creators')
    }
    if (currentSlug === 'the-next-link-in-the-chain-children-of-creators') {
      return posts.find(p => p.slug === 'why-these-ideas-matter-the-future-azimuth')
    }
    return null
  }

  const nextPost = getNextPost(params.slug)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.postPageTitle}>{post.title}</h1>
      </header>

      <main className={styles.postContent}>
        <div className={styles.postBody}>
          {post.content ? (
            <div className={styles.postContent}>
              {post.content
                .replace(/<p>/g, '')
                .replace(/<\/p>/g, '\n\n')
                .split('\n\n')
                .filter(p => p.trim())
                .map((paragraph, idx) => (
                  <p key={idx}>
                    {paragraph.split('\n').map((line, lineIdx) => (
                      <span key={lineIdx}>
                        {line}
                        {lineIdx < paragraph.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
            </div>
          ) : (
            <p className={styles.comingSoon}>Content coming soon...</p>
          )}
        </div>

        {nextPost && (
          <section className={styles.journey}>
            <h2 className={styles.journeyTitle}>Continue the Journey</h2>
            <p className={styles.journeyText}>
              Now that you understand the system,<br />
              perhaps you're ready to see the chain of creators,<br />
              and understand your place in the teaching cycle.
            </p>
            <Link href={`/posts/${nextPost.slug}`} className={styles.journeyButton}>
              Explore: {nextPost.title} →
            </Link>
          </section>
        )}

        {!nextPost && params.slug === 'why-these-ideas-matter-the-future-azimuth' && (
          <section className={styles.endOfJourney}>
            <h2 className={styles.endTitle}>End of the Journey</h2>
            <p className={styles.endText}>
              The right path leads to the future — and now, you know it.
            </p>
            <p className={styles.endText}>
              It is the path where we build tools, AI, and systems to teach, create, and expand humanity, not replace it.
            </p>
            <p className={styles.endText}>
              It is the trajectory of ethics, respect, and conscious creation — the chain that continues through us into tomorrow.
            </p>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

