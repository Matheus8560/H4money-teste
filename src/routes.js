import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login'

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" top="true" component={Login}/>
		</Switch>
	</BrowserRouter>
);

export default Routes;
