import './loading.css';

const Loading = () => {
	return (
		<div className='backdrop'>
			<div className='spinner-1'>
				<div className='spinner-2'>
					<div className='spinner-3'>
						<div className='spinner-4'></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
