import { defineConfig } from 'vite';
//import reactRefresh from '@vitejs/plugin-react-refresh';
import macrosPlugin from 'vite-plugin-babel-macros';
import reactPlugin from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path, { resolve } from 'path';

console.log('env:dev', process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin(), macrosPlugin(), tsconfigPaths()],
  build: {
    // sourcemap: true,
    commonjsOptions: {
      include: /node_modules/,
      transformMixedEsModules: true,
    },
  },
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import {jsx, css} from '@emotion/react'`,
  },

  define: {},
  optimizeDeps: {
    entries: ['index.html'],
    //include: [],
    exclude: ['@apollo/client', `graphql`],
  },
  resolve: {
    mainFields: ['module', 'main', 'browser'],
    alias: {
      '~~': resolve(__dirname, 'src'),
      /** browserify for web3 components */
      stream: 'stream-browserify',
      http: 'http-browserify',
      https: 'http-browserify',
      timers: 'timers-browserify',
      process: 'process',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
