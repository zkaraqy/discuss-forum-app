# Storybook with Tailwind CSS and DaisyUI

This documentation explains how to properly configure Storybook to work with Tailwind CSS and DaisyUI in your React project.

## Configuration Overview

We've set up Storybook to properly display components styled with Tailwind CSS and DaisyUI by implementing these key changes:

1. Created a dedicated Tailwind CSS file specifically for Storybook
2. Updated the Storybook preview configuration to load Tailwind and DaisyUI
3. Added helper styles to ensure consistent component rendering
4. Added a decorator to wrap stories in a styled container

## Key Files

- `.storybook/tailwind.css` - Base Tailwind imports
- `.storybook/styles.css` - Custom styles for component display in Storybook
- `.storybook/preview.js` - Configuration for stories display and decorators
- `.storybook/preview-head.html` - HTML that's injected into the iframe head, loading CDN versions of Tailwind and DaisyUI
- `.storybook/main.js` - Core Storybook configuration with PostCSS setup

## Running Storybook

To run Storybook with the new configuration:

```bash
npm run storybook
```

## Troubleshooting

If components still don't appear styled correctly:

1. Check the browser console for any CSS loading errors
2. Verify that class names in your components match the ones defined in DaisyUI
3. Try refreshing the Storybook page or restarting the Storybook server
4. Check that your Tailwind configuration has the correct content paths

## Adding More Components

When creating stories for new components, remember to:

1. Import React explicitly at the top of your story file
2. Use DaisyUI classes directly in your stories
3. Create a variety of states and variants to fully test your components

## Example Component Story

Here's a simplified example of how to create a story for a component with Tailwind and DaisyUI:

```jsx
import React from 'react';
import MyComponent from '../../components/MyComponent';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    className: 'btn btn-primary',
    children: 'My Component',
  },
};
```
