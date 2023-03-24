import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import './Modal.css';

const ButtonWithModal = ({ setCart, setCount }) => {
    const [showModal, setShowModal] = useState(false);
    const [showThanksMessage, setShowThanksMessage] = useState(false);


    //arată sau ascunde fereastra modală
    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    //Trimitere plată falsă
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowThanksMessage(true);
    };

    //Resetează totul când modal este închis
    const handleReset = () => {
        setShowThanksMessage(false);
        setCart([]);
        setCount(0);
    }

    return (
        <>
            <button className="checkout" onClick={handleModalToggle}>Checkout</button>
            {showModal && (
                <Modal onClose={handleModalToggle}>
                    <div className="modal-content">
                        {!showThanksMessage ? (
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
                        ) : (
                                <div className="thanks-message">
                                    <p>Thanks for shopping with us!</p>
                                    <button onClick={handleReset} className="reset-button"><Link to="/">Return to home</Link></button>
                                </div>
                            )}
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ButtonWithModal;
