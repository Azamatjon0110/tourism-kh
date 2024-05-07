import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router';
import api from '../../server/api';

const Login = () => {
	const [name, SetUsername] = useState();
	const [password, SetPassword] = useState();
	const body = {
		username: name,
		password: password,
	};
	const navigate = useNavigate();
	const handleSubmit = (evt) => {
		evt.preventDefault();
		api.token(body).then((res) => {
			if (res.status == 200) {
				localStorage.setItem('token', JSON.stringify(res.data.access_token));
				navigate('/admin/about');
			}
		});
	};
	return (
		<>
			<div className='login-box'>
				<form className='login-form bg-white' onSubmit={handleSubmit}>
					<h2 className='text-center'>Login</h2>
					<input
						className='form-control mb-3'
						onChange={(e) => SetUsername(e.target.value)}
						type='text'
						placeholder='Login'
					/>
					<input
						className='form-control mb-3'
						type='password'
						onChange={(e) => SetPassword(e.target.value)}
						placeholder='Password'
					/>
					<div className='d-flex'>
						<button className='btn-submit' type='submit'>
							Kirish
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
