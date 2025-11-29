// Script to update posts.ts with extracted content
const fs = require('fs');
const path = require('path');

const formattedPath = path.join(__dirname, '..', 'formatted-content.json');
const postsPath = path.join(__dirname, '..', 'data', 'posts.ts');

const formatted = JSON.parse(fs.readFileSync(formattedPath, 'utf8'));
const postsContent = fs.readFileSync(postsPath, 'utf8');

// Create a map of slug to content
const contentMap = {};
formatted.forEach(item => {
  // Clean up the content further - remove date strings and metadata
  let cleaned = item.content
    .replace(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}[AP]M[^<]*/g, '')
    .replace(/[^<]*AI Has Rights[^<]*/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<p>\s*29\/11\/2025[^<]*<\/p>/g, '')
    .trim();
  
  contentMap[item.slug] = cleaned;
});

// Update posts.ts
let updated = postsContent;
Object.keys(contentMap).forEach(slug => {
  // Find the post entry and replace the content
  const regex = new RegExp(`(slug: '${slug.replace(/_/g, '\\_')}',[^}]*content: ')[^']*(',)`, 's');
  if (updated.match(regex)) {
    const content = contentMap[slug].replace(/'/g, "\\'").replace(/\n/g, '\\n');
    updated = updated.replace(regex, `$1${content}$2`);
  }
});

fs.writeFileSync(postsPath, updated);
console.log('Updated posts.ts with extracted content');

