// import { useState } from "react"

const Modal = (isOpen) => {
	// import [openModal, setOpenModal] = useState
	if (isOpen.isOpen === true) {
		document.querySelector('.modal-box').classList.add('active-m');
	}
	console.log(isOpen.isOpen);
	return (
		<>
			<div className='modal-box'>
				<div className='modal-c'>
					<div className='modal-bodyy'></div>
				</div>
			</div>
		</>
	);
};

export default Modal;
