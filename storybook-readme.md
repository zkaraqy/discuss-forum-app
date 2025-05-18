# Storybook Setup with Tailwind CSS and DaisyUI

This documentation describes how the Storybook configuration is set up to work with Tailwind CSS and DaisyUI in this project.

## Key Files

- `.storybook/main.js`: Core Storybook configuration
- `.storybook/preview.js`: Storybook preview configuration with decorators
- `.storybook/preview-head.html`: HTML injected into the iframe head
- `.storybook/tailwind.css`: Tailwind CSS directives and component styles
- `.storybook/manager.js`: Storybook UI configuration

## How It Works

1. **Tailwind CSS Processing**: 
   - We process Tailwind directives in `.storybook/tailwind.css`
   - We use DaisyUI CDN in the preview head for immediate styling

2. **Component Styling**:
   - Defined Tailwind component classes in the `@layer components` section
   - Used basic utility classes in components

3. **Story Decorators**:
   - Added a wrapper around stories for consistent styling
   - Enabled proper display of Tailwind/DaisyUI components

## Running Storybook

```bash
npm run storybook
```

## Adding New Components

When creating a new component story:

1. Import React explicitly
2. Use a state-managed template for input components
3. Use DaisyUI class names directly in your stories
4. Add appropriate controls in the argTypes

## Troubleshooting

If components aren't styled correctly:

1. Check browser console for CSS errors
2. Ensure the component uses the correct DaisyUI class names
3. Make sure the CSS layers are loaded in the correct order
4. Try restarting the Storybook server
