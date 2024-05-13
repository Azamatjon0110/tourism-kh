import MainRoutes from './router/routes';
import './App.css';

// import LocomotiveScroll from 'locomotive-scroll';
// import { useRef } from 'react';
// import { useEffect } from 'react';
localStorage.setItem('lang', 'uz');
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

function App() {
	// const scrollRef = useRef(null);
	// useEffect(() => {
	// 	const scroll = new LocomotiveScroll({
	// 		el: scrollRef.current,
	// 		smooth: true,
	// 	});
	// 	return () => scroll.destroy();
	// }, []);
	return (
		<>
			<MainRoutes />
		</>
	);
}

export default App;
