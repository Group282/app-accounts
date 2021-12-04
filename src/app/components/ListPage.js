import {deleteUser, getAllUsers} from "../common/usersAPI";
import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import AddUser from "./sections/AddUser";
import EditUser from "./sections/EditUser";


const ListPage = () => {
    const [allUser, setAllUser] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [idUpdate, setIdUpdate] = useState('')

    const upData = async () => {
        let users = await getAllUsers()
        for await (let item of users) {
            let start_date = new Date(Number.parseInt(item.start_date) * 1000)
            item['start_date'] = start_date.toLocaleDateString()
            let expiration_date = new Date(Number.parseInt(item.expiration_date) * 1000)
            item['expiration_date'] = expiration_date.toLocaleDateString()
        }
        setAllUser(users.reverse());
    }

    useEffect(async () => {
        await upData()
    }, []);


    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2>Account list</h2>
                </Col>
                <Col className="text-end">
                    <Button onClick={() => setShowModal(true)} variant="primary">Create account</Button>
                    <Modal show={showModal}
                           size="md"
                           onHide={() => setShowModal(false)}
                           animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddUser fun={
                                async () => {
                                    setShowModal(false)
                                    await upData()
                                }
                            }/>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
            <Row>
                <Alert variant="success">
                    Total: {allUser.length}
                </Alert>
            </Row>
            <Row>
                <Col className="col-12">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Account Name</th>
                            <th>E-mail</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>Expiration Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Array.from(allUser).map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <Link to={"/profile/" + item.id}
                                              style={{textDecoration: 'none', color: 'black'}}>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td>{item.account_name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Badge bg={
                                            item.status === "Active" ? "primary" :
                                                item.status === "Pending" ? "danger" : "warning"
                                        }>
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td> {item.start_date}</td>
                                    <td>{item.expiration_date}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm w-50" onClick={() => {
                                            setIdUpdate(item.id)
                                            setShowModalUpdate(true)
                                        }}>
                                            Edit
                                        </button>

                                        <button className="btn btn-danger btn-sm w-50"

                                                onClick={async () => {
                                                    await deleteUser(item.id)
                                                    await upData()
                                                }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={showModalUpdate}
                   size="md"
                   onHide={() => setShowModalUpdate(false)}
                   animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditUser fun={
                        async () => {
                            setShowModalUpdate(false)
                            await upData()
                        }
                    } id={idUpdate}/>
                </Modal.Body>
            </Modal>
        </Container>
    )
}
export default ListPage;
