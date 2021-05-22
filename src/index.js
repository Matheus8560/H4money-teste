import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {NotificationContainer} from 'react-notifications';

import './global.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-notifications/lib/notifications.css';

ReactDOM.render(
	<React.StrictMode>
		<Routes />
		<NotificationContainer />
	</React.StrictMode>,
	document.getElementById('root')
);
