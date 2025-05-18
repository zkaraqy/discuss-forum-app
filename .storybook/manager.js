import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

// Configure Storybook UI theme and performance options
addons.setConfig({
  theme: themes.light,
  // Improve UI performance
  sidebar: {
    showRoots: false, // Hide roots in the sidebar
    collapsedRoots: ['components'], // Collapse roots by default
  },
  toolbar: {
    zoom: { hidden: true }, // Hide zoom controls to reduce UI elements
    eject: { hidden: true }, // Hide eject button
    copy: { hidden: true }, // Hide copy button
    fullscreen: { hidden: true }, // Hide fullscreen button
  },
  // Enable quick navigation
  shortcuts: { 
    next: 'alt+right',
    previous: 'alt+left',
  },
});
