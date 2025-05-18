/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  // Limit story files for faster loading
  stories: [
    '../src/stories/components/**/*.stories.@(js|jsx)', // Only load component stories
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false, // Disable docs for better performance
        backgrounds: false, // Disable unnecessary backgrounds
        actions: true, // Keep actions for interactive testing
        controls: true, // Keep controls for component testing
        viewport: false, // Disable viewport for better performance
      },
    },
    // Keep only the minimum required addons
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.js',
      },
    },
  },
  // Performance optimizations
  features: {
    storyStoreV7: true,
    buildStoriesJson: false, // Disable stories.json generation
    breakingChangesV7: false, // Disable v7 features that could slow things down
    interactionsDebugger: false, // Disable interactions debugger
  },
  viteFinal: async (config) => {
    // Advanced Vite optimizations
    return {
      ...config,
      // Optimize build performance
      build: {
        ...config.build,
        sourcemap: false, // Disable sourcemaps completely
        minify: 'esbuild', // Use esbuild for faster minification
        cssMinify: true, // Minify CSS
        chunkSizeWarningLimit: 1000, // Increased chunk size limit
      },
      // Optimize server performance
      server: {
        ...config.server,
        fs: {
          strict: true, // Stricter file serving
        },
        hmr: {
          overlay: false, // Disable HMR overlay
        },
      },
      // Optimize CSS
      css: {
        // Use postcss without heavy processing
        postcss: {
          plugins: [require('autoprefixer')], // Only use autoprefixer
        },
        // Disable CSS modules for better performance
        modules: {
          scopeBehaviour: 'global',
        },
      },
      // Optimize plugins
      plugins: config.plugins.filter(
        (plugin) =>
          // Filter out slow or unused plugins
          plugin.name !== 'vite:react-jsx' && plugin.name !== 'vite:css-post'
      ),
      // Optimize dependencies
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include || []),
          'react',
          'react-dom',
        ],
        exclude: [
          ...(config.optimizeDeps?.exclude || []),
          'daisyui', // Exclude heavy dependencies
        ],
      },
    };
  },
  // Static files (keep minimal)
  staticDirs: ['../public'],
};

export default config;
