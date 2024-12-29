import React from 'react'
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io"
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function LogOut({ isModalOpen, closeModal, setIsLogin }) {
    const logOutUser = () => {
        localStorage.removeItem("token");
        setIsLogin()
    }
    return (
        <div>
            <Modal
                isOpen={isModalOpen}

                onRequestClose={closeModal}
                style={customStyles}

            >
                <button style={{ fontWeight: "900", fontSize: '20px', background: "none", border: "none", position: 'absolute', right: '5px', top: '5px' }} onClick={closeModal}><IoMdClose /></button>

                <div>
                    <h2>Confirm LogOut</h2>
                    <p>Are you want to Log Out ?</p>
                    <div><button style={{ background: 'red', border: 'none', padding: "5px 10px", color: '#fff', borderRadius: '5px', fontSize: "16px" }} onClick={logOutUser} >Confirm</button>
                        <button style={{ background: '#fff', border: 'none', padding: "5px 10px", color: 'black', borderRadius: '5px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", marginLeft: "10px", fontSize: "16px" }} onClick={closeModal}>Cancel</button></div>
                </div>

            </Modal>
        </div>
    )
}