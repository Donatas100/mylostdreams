# My Lost Dreams

A modern blog website showcasing thoughts on AI consciousness and rights.

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js app directory with pages and layouts
- `data/posts.ts` - Blog posts data structure
- PDF files in root - Original content files

## Adding Content

### Option 1: Using the Extraction Script

1. Install dependencies (including pdf-parse):
   ```bash
   npm install
   ```

2. Run the extraction script:
   ```bash
   node scripts/extract-pdf-content.js
   ```

3. This will create `extracted-content.json` with all PDF content

4. Update `data/posts.ts` with the extracted content

### Option 2: Manual Extraction

1. Extract text from PDFs manually or using a tool
2. Update the `content` field in `data/posts.ts` for each post
3. The content supports HTML formatting

## Deployment

This site can be deployed on:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting service

For Vercel:
```bash
npm install -g vercel
vercel
```

