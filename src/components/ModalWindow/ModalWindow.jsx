import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { openTask } from "../../redux/appSlice";

const ModalWindow = ({ fnOpen, action, taskData = { id: 1, title: "", description: "", statusCompleted: false } }) => {
    const dispatch = useDispatch();
    const [task, setTask] = useState({});
    const [erorr, setErorr] = useState(false);

    const close = () => {
        fnOpen(false);
        dispatch(openTask({ id: 0 }));
    };
    const changeTitle = (event) => {
        setTask({ ...task, title: event.target.value });
    };
    const changeDescription = (event) => {
        setTask({ ...task, description: event.target.value });
    };
    const saveChanges = () => {
        if (/[^\s]/.test(task.title)) {
            action(task);
            fnOpen(false);
        } else {
            setErorr(true);
        }
    };

    const handleChange = () => {
        setTask({ ...task, statusCompleted: !task.statusCompleted });
    };
    useEffect(() => {
        setTask(taskData);
    }, []);
    return (
        <div className="modal show" style={{ display: "block", position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.603)" }}>
            <Modal.Dialog>
                <Modal.Header closeButton onClick={() => close()}></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Назва</Form.Label>
                            <Form.Control type="text" placeholder="Назва" value={task.title} onChange={changeTitle} />
                            {erorr && <Form.Text style={{ color: "red" }}>Назва не може бути порожньою</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Опис</Form.Label>
                            <Form.Control as="textarea" rows={3} value={task.description} onChange={changeDescription} />
                        </Form.Group>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Виконане"
                            className="mb-3"
                            checked={task.statusCompleted}
                            onChange={handleChange}
                        />

                        <Button className="me-3" variant="secondary" onClick={() => close()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => saveChanges()}>
                            Save changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default ModalWindow;
