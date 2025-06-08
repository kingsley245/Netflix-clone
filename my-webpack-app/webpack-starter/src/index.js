import { greet } from './utils.js';

import './css/style.css';

// greet('World');
const greetings = (name = 'world') => {
  console.log(`Hello ${name}!`);
};
greetings();
greet('word');
