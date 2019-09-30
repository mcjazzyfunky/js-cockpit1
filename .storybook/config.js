import { configure } from '@storybook/react';
import './styles.css';

configure(require.context('../src/stories', true, /\.stories\.tsx?$/), module)
