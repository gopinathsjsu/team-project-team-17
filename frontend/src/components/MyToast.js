import React from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

const MyToast = (props) => {
    return (
        <ToastContainer position='bottom-center' className='position-fixed text-center'>
            <Toast show={props.show} onClose={props.handleClose} 
            autohide delay={3000} className='my-toast'>
                <Toast.Body>
                    {props.text}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default MyToast