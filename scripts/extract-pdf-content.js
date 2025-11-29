// Script to extract text content from PDF files
// Requires: npm install pdf-parse
// Usage: node scripts/extract-pdf-content.js

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfDir = path.join(__dirname, '..');
const pdfFiles = fs.readdirSync(pdfDir).filter(file => file.endsWith('.pdf'));

async function extractPDFContent(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error extracting ${pdfPath}:`, error.message);
    return null;
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getSlugFromFilename(filename) {
  // Remove .pdf extension and convert to slug
  const name = filename.replace(/\.pdf$/, '').replace(/ – AI Has Rights$/, '');
  return slugify(name);
}

async function main() {
  console.log('Extracting content from PDF files...\n');
  
  const results = [];
  
  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(pdfDir, pdfFile);
    console.log(`Processing: ${pdfFile}`);
    
    const content = await extractPDFContent(pdfPath);
    if (content) {
      const slug = getSlugFromFilename(pdfFile);
      results.push({
        filename: pdfFile,
        slug: slug,
        content: content.trim(),
        length: content.length
      });
      console.log(`  ✓ Extracted ${content.length} characters`);
    } else {
      console.log(`  ✗ Failed to extract content`);
    }
  }
  
  // Save results to a JSON file
  const outputPath = path.join(__dirname, '..', 'extracted-content.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✓ Extraction complete! Results saved to: ${outputPath}`);
  console.log(`\nYou can now update data/posts.ts with the extracted content.`);
}

main().catch(console.error);

