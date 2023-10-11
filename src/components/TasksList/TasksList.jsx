import React from "react";
import { Button, Card, CloseButton, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTask, editTask, openTask } from "../../redux/appSlice";
import edit from './../../assets/edit.png'

const TasksList = ({ nameOpenList, list, setOpenModalEditTask }) => {
    const dispatch = useDispatch();
    const openModalEditTask = (id) => {
        setOpenModalEditTask(true);
        dispatch(openTask({ id }));
    };
    return (
        <>
            <h3 className="mt-1">{nameOpenList}:</h3>
            <Row>
                {list.map((item, index) => {
                    return (
                        <Card className="m-1" style={{ width: "18rem" }} key={index}>
                            <Container className="text-end">
                                <img className="m-1" style={{width:"21px", cursor:"pointer"}} src={edit} alt="edit"onClick={() => openModalEditTask(item.id)} />
                                <CloseButton className="m-1" onClick={() => dispatch(deleteTask({ id: item.id }))} />
                            </Container>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text>{item.statusCompleted ? "Виконане" : "Не виконане"}</Card.Text>
                                {item.statusCompleted ? (
                                    <Button
                                        variant="danger"
                                        onClick={() => dispatch(editTask({ ...item, statusCompleted: false }))}
                                    >
                                        Позничити як не виконане
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={() => dispatch(editTask({ ...item, statusCompleted: true }))}
                                    >
                                        Позничити як виконане
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </>
    );
};

export default TasksList;
