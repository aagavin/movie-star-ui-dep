import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { register as swregister } from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


swregister({
  onUpdate: async (registration: ServiceWorkerRegistration) => {
    await registration.update();
  }
});