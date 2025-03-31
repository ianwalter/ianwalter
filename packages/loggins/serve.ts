import { serve } from 'bun';

// Build the test app to ensure it's up to date
const build = Bun.spawn(['bun', 'build:test']);
await build.exited;

const server = serve({
  port: 3333,
  fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;
    
    // Default to index.html for root path
    if (filePath === '/') {
      filePath = '/index.html';
    }
    
    try {
      // Try to read the file
      const file = Bun.file(`.${filePath}`);
      return new Response(file);
    } catch (error) {
      // Return 404 for missing files
      return new Response('Not Found', { status: 404 });
    }
  }
});

console.log(`Server running at http://localhost:${server.port}`);
