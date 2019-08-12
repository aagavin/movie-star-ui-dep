import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserContext, { init } from './context';


ReactDOM.render(<UserContext.Provider value={init}><App /></UserContext.Provider>, document.getElementById('root'));
