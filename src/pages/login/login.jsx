import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/token/tokenAction';
const Login = () => {
	const dispatch = useDispatch();
	const [name, SetUsername] = useState();
	const [password, SetPassword] = useState();
	const [load, setLoad] = useState(false);

	const body = {
		username: name,
		password: password,
	};

	const navigate = useNavigate();
	const handleSubmit = (evt) => {
		evt.preventDefault();
		setLoad(true);
		api
			.token(body)
			.then((res) => {
				if (res.status == 200) {
					localStorage.setItem('token', res.data.access_token);
					dispatch(getToken(res.data.access_token));
					setLoad(false);
					navigate('/admin/users');
				}
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
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
			<div className={load === true ? 'd-block' : 'd-none'}>
				<Loading />
			</div>
		</>
	);
};

export default Login;
