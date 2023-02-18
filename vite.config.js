import { defineConfig } from 'vite';

require('dotenv').config();

export default defineConfig(() => ({
  // path to static assets to serve, only during dev
  publicDir: 'resources/static',
  server: {
    // allows to serve assets on vite server, edit with your vite port
    origin: 'http://localhost:5173'
  },
  // base URL to get assets
  base: '',
  build: {
    // assets dir output, default is "assets"
    assetsDir: '',
    // clean dir output
    emptyOutDir: true,
    // manifest to link assets
    manifest: true,
    // dir output
    outDir: `public/themes/${process.env.WP_DEFAULT_THEME}/assets`,
    rollupOptions: {
      // change the default entrypoint
      input: 'resources/js/index.js',
      // allows to create dir for each script => /img, /css, /js
      output: {
        assetFileNames: (assetInfo) => {
          var info = assetInfo.name.split(".");
          var extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          } else if (/woff|woff2/.test(extType)) {
            extType = "css";
          }
          return `${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },
  },
  plugins: [
    {
      name: 'php',
      // reload .php file to vite server
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.php')) {
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      },
    },
  ],
}));
