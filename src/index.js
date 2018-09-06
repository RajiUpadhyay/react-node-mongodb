import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import App from './components/App';
import AppStore from './store/IndexStore';

ReactDOM.render(<Provider store={AppStore}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
