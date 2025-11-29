// Script to clean and update posts.ts with extracted content
const fs = require('fs');
const path = require('path');

const formattedPath = path.join(__dirname, '..', 'formatted-content.json');
const formatted = JSON.parse(fs.readFileSync(formattedPath, 'utf8'));

function cleanContent(html) {
  // Remove date strings and metadata
  html = html.replace(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}[AP]M[^<]*/g, '');
  html = html.replace(/[^<]*AI Has Rights[^<]*/g, '');
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*29\/11\/2025[^<]*<\/p>/g, '');
  html = html.replace(/<p>\s*\d{2}\/\d{2}\/\d{4}[^<]*<\/p>/g, '');
  
  // Remove empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  // Clean up multiple newlines in text content
  html = html.replace(/\n{3,}/g, '\n\n');
  
  // Split into paragraphs and clean each
  let paragraphs = html.split('</p>').filter(p => p.trim().length > 0);
  
  paragraphs = paragraphs.map(p => {
    p = p + '</p>';
    // Remove title if it's the first paragraph and matches the post title
    p = p.replace(/^<p>[^<]*\n[^<]*\n/, '<p>');
    // Remove standalone dates
    p = p.replace(/<p>\s*\d{2}\/\d{2}\/\d{4}[^<]*<\/p>/, '');
    return p;
  }).filter(p => {
    const text = p.replace(/<[^>]*>/g, '').trim();
    // Skip if empty or just metadata
    if (text.length < 10) return false;
    if (text.match(/^(29\/11|Memory room|NEXT|PREVIOUS)/i)) return false;
    return true;
  });
  
  return paragraphs.join('\n');
}

// Read current posts.ts
const postsPath = path.join(__dirname, '..', 'data', 'posts.ts');
let postsContent = fs.readFileSync(postsPath, 'utf8');

// Update each post
formatted.forEach(item => {
  const cleaned = cleanContent(item.content);
  
  // Escape for JavaScript string
  const escaped = cleaned
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
  
  // Find and replace the content for this slug
  const slugPattern = item.slug.replace(/_/g, '\\_');
  const regex = new RegExp(`(slug: '${slugPattern}',[\\s\\S]*?content: ')[^']*(',)`, 'm');
  
  if (postsContent.match(regex)) {
    postsContent = postsContent.replace(regex, `$1${escaped}$2`);
    console.log(`Updated: ${item.slug}`);
  } else {
    console.log(`Could not find: ${item.slug}`);
  }
});

fs.writeFileSync(postsPath, postsContent);
console.log('\nAll posts updated!');

