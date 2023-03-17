import React, { useState } from 'react';
import Modal from './Modal';
import './Modal.css';

const ButtonWithModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
    };


    return (
        <>
            <button className="checkout" onClick={handleModalToggle}>Checkout</button>
            {showModal && (
                <Modal onClose={handleModalToggle}>
                    <div className="modal-content">
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <h2 className="modal-title">Checkout</h2>
                            <label htmlFor="name" className="modal-label">Name</label>
                            <input type="text" id="name" name="name" className="modal-input" required />

                            <label htmlFor="card-number" className="modal-label">Card Number</label>
                            <input type="text" id="card-number" name="cardNumber" className="modal-input" required />

                            <label htmlFor="card-expiration" className="modal-label">Card Expiration</label>
                            <input type="text" id="card-expiration" name="cardExpiration" className="modal-input" required />

                            <label htmlFor="card-ccv" className="modal-label">Card CCV</label>
                            <input type="text" id="card-ccv" name="cardCcv" className="modal-input" required />

                            <label htmlFor="shipping-info" className="modal-label">Shipping Info</label>
                            <textarea id="shipping-info" name="shippingInfo" className="modal-textarea" required></textarea>

                            <div className="modal-buttons">
                                <button type="submit" className="modal-button">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ButtonWithModal;
