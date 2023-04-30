import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../utils/mutations';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Auth from '../utils/auth';

const Update = () => {
    const [formState, setFormState] = useState({
        username: Auth.getProfile().data.username,
        email: Auth.getProfile().data.email, 
        password: Auth.getProfile().data.password
    });
    const [updateUser, { error, data }] = useMutation(UPDATE_USER);

    const [deleteUser, { error1, data1 }] = useMutation(DELETE_USER);

    const [handleShow, setHandleShow] = useState(true);

    const handleClose = () => {
        setHandleShow(false);
        window.location.assign('/');
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const { data } = await updateUser({
                variables: { updateUserId: Auth.getProfile().data._id, username: formState.username, email: formState.email, password: formState.password }
            });
            Auth.updateUser(data.updateUser.token);
            window.location.assign('/');
        } catch (e) {
            console.error(e);
        }
    };


    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const { data } = await deleteUser({
                variables: { userId: Auth.getProfile().data._id }
            });

            Auth.deleteUser();
        }
        catch (e) {
            console.error(e);
        }

    };

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
                                placeholder='username'
                                onChange={handleChange}
                                autoFocus
                                value={formState.username}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type='text'
                                name='email'
                                placeholder='email'
                                onChange={handleChange}
                                autoFocus
                                value={formState.email}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                placeholder='*******'
                                name='password'
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Submit
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Update;
