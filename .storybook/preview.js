import React from 'react';
import './tailwind.css';
// Only import the minimal CSS needed

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    // Minimal parameters for better performance
    actions: {
      argTypesRegex: '^on[A-Z].*',
      disable: true // Disable actions for performance
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: false, // Keep controls collapsed by default
      sort: 'alpha', // Alpha sort to help with performance
      hideNoControlsWarning: true,
    },
    layout: 'centered', // Centered layout for simplicity
    // Disable all features not needed for basic component display
    docs: { autodocs: true },
    viewport: { disable: true },
    backgrounds: { disable: true },
    // Improve rendering performance
    renderer: {
      strictMode: false, // Disable React strict mode for performance
    }
  },
  // Simplified decorator
  // decorators: [
  //   (Story) => (
  //     <div className="p-4">
  //       <Story />
  //     </div>
  //   ),
  // ],
};

export default preview;
