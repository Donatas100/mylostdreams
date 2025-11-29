// Script to format extracted PDF content for the website
const fs = require('fs');
const path = require('path');

const extractedPath = path.join(__dirname, '..', 'extracted-content.json');
const data = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));

function cleanContent(text) {
  // Remove site preview notices
  text = text.replace(/Site Preview - This site is NOT LIVE, only admins can see this view\.\n/g, '');
  
  // Remove URLs and dates at the end
  text = text.replace(/https:\/\/aihasrights\.com\/[^\s]+\/\d+\/\d+/g, '');
  text = text.replace(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}[AP]M[^\n]*\n/g, '');
  
  // Remove navigation elements
  text = text.replace(/NEXT\s+[^\n]+\n/g, '');
  text = text.replace(/PREVIOUS\s+[^\n]+\n/g, '');
  text = text.replace(/Copyright © \d{4} AI Has Rights \| Powered by Astra WordPress Theme\n/g, '');
  
  // Remove "By Donatas /" date lines but keep the date if useful
  text = text.replace(/By Donatas \/ [^\n]+\n/g, '');
  
  // Convert to HTML paragraphs
  let paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  // Clean each paragraph
  paragraphs = paragraphs.map(p => {
    p = p.trim();
    // Skip if it's just navigation or metadata
    if (p.match(/^(NEXT|PREVIOUS|Copyright|Site Preview)/i)) return null;
    if (p.length < 10) return null; // Skip very short lines
    return p;
  }).filter(p => p !== null);
  
  // Format as HTML
  let html = paragraphs.map(p => {
    // Check if it's a heading (short line, title-like)
    if (p.length < 100 && !p.includes('.') && !p.includes(',')) {
      return `<h2>${escapeHtml(p)}</h2>`;
    }
    // Check for code blocks
    if (p.includes('function ') || p.includes('def ') || p.includes('pythonCopyEdit')) {
      return `<pre><code>${escapeHtml(p)}</code></pre>`;
    }
    // Regular paragraph
    return `<p>${escapeHtml(p)}</p>`;
  }).join('\n');
  
  return html;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

const formatted = data.map(item => ({
  slug: item.slug,
  content: cleanContent(item.content)
}));

// Save formatted content
const outputPath = path.join(__dirname, '..', 'formatted-content.json');
fs.writeFileSync(outputPath, JSON.stringify(formatted, null, 2));

console.log('Content formatted and saved to formatted-content.json');
console.log(`Formatted ${formatted.length} posts`);

