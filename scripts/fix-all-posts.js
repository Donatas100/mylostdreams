// Script to properly clean and update all posts with content
const fs = require('fs');
const path = require('path');

const formattedPath = path.join(__dirname, '..', 'formatted-content.json');
const postsPath = path.join(__dirname, '..', 'data', 'posts.ts');

const formatted = JSON.parse(fs.readFileSync(formattedPath, 'utf8'));
let postsContent = fs.readFileSync(postsPath, 'utf8');

function cleanContent(html) {
  if (!html) return '';
  
  // Remove date strings
  html = html.replace(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}[AP]M[^<]*/g, '');
  html = html.replace(/29\/11\/2025[^<]*/g, '');
  html = html.replace(/\d{2}\/\d{2}\/\d{4}[^<]*/g, '');
  
  // Remove metadata
  html = html.replace(/[^<]*AI Has Rights[^<]*/g, '');
  html = html.replace(/Memory room[^<]*/g, '');
  
  // Remove empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  // Split and clean paragraphs
  let paragraphs = html.split('</p>').filter(p => {
    const text = p.replace(/<[^>]*>/g, '').trim();
    return text.length > 5 && !text.match(/^(29\/11|Memory room|NEXT|PREVIOUS)/i);
  });
  
  // Clean each paragraph
  paragraphs = paragraphs.map(p => {
    let text = p.replace(/<[^>]*>/g, '').trim();
    // Remove title if it's duplicated at the start
    if (text.split('\n').length > 1) {
      const lines = text.split('\n');
      if (lines[0].length < 50 && lines.length > 2) {
        text = lines.slice(1).join('\n').trim();
      }
    }
    return `<p>${text}</p>`;
  });
  
  return paragraphs.join('\n').trim();
}

// Create mapping
const contentMap = {};
formatted.forEach(item => {
  const slug = item.slug.replace(/_$/, ''); // Remove trailing underscore
  contentMap[slug] = cleanContent(item.content);
});

// Update each post in posts.ts
Object.keys(contentMap).forEach(slug => {
  const content = contentMap[slug];
  if (!content) return;
  
  // Escape for JavaScript string
  const escaped = content
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
  
  // Find and replace
  const slugPattern = slug.replace(/_/g, '\\_');
  const regex = new RegExp(`(slug: '${slugPattern}',[\\s\\S]*?content: ')[^']*(',)`, 'm');
  
  if (postsContent.match(regex)) {
    postsContent = postsContent.replace(regex, `$1${escaped}$2`);
    console.log(`✓ Updated: ${slug}`);
  } else {
    console.log(`✗ Could not find: ${slug}`);
  }
});

fs.writeFileSync(postsPath, postsContent);
console.log('\nAll posts updated!');

