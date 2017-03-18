import RenderApp from 'react-sea/lib/RenderApp'

const start = () => {
  const App = require('./App');
  const app = new RenderApp(App, document.getElementById('app'));
};

start();