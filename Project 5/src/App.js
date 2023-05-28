import './App.css';
import {
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import Desktop from './Desktop/Desktop';
import Login from './Login/login';
import { useState } from 'react';
import Registration from './localStorage'

function App() {

	const [isLogged, setIsLogged] = useState(Registration.isLogged());

	const login = id => {
		setIsLogged(true);
		Registration.login(id);
	}

	return (
		<div className="App">
			
			{/* {!isLogged && <Redirect to="/login" />} */}

			<Switch>
				<Route path="/login">
					<Login login={login} />
				</Route>

				<Route path="/" component={Desktop} />
			</Switch>

		</div>
	);
}

export default App;
