import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {addUser} from "../../common/usersAPI";

const AddUser = ({fun}) => {
    const [name, setName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');


    useEffect(() => {
        let date = new Date()
        let date2 = new Date(date)
        date2.setDate(date.getDate() + 1)
        setStartDate(date.toISOString().split('T')[0])
        setExpirationDate(date2.toISOString().split('T')[0])
    }, [])


    const saveEvent = async () => {
        if (name.length >= 5 &&
            accountName.length >= 5 &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
            expirationDate >= startDate) {
            let _startDate = new Date(startDate)
            let _expirationDate = new Date(expirationDate)
            await addUser(
                name,
                accountName,
                email,
                status,
                (_startDate.getTime() / 1000),
                (_expirationDate.getTime() / 1000)
            )
            await fun()
        }
    }

    return (
        <>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="name_input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    isInvalid={name.length < 5}
                    isValid={name.length >= 5}
                    placeholder="Name"
                />
                <label htmlFor="name_input">Name*</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="account_name_input"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    type="text"
                    placeholder="account_name"
                    isInvalid={accountName.length < 5}
                    isValid={accountName.length >= 5}
                />
                <label htmlFor="account_name_input">Account Name*</label>
            </Form.Floating>
            <Form.Select className="mb-3" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Active" selected>Active</option>
                <option value="Pending">Pending</option>
                <option value="Disable">Disable</option>
            </Form.Select>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="email_input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    isInvalid={!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))}
                    isValid={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)}
                />
                <label htmlFor="email_input">Email address</label>
            </Form.Floating>
            <Row>
                <Col className="col-6">
                    Start date
                    <Form.Control type="date"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                    />
                </Col>
                <Col className="col-6">
                    Expiration date
                    <Form.Control type="date"
                                  value={expirationDate}
                                  onChange={(e) => setExpirationDate(e.target.value)}
                                  isInvalid={expirationDate < startDate}
                                  isValid={expirationDate >= startDate}
                    />
                </Col>
            </Row>
            <Row className="text-end mt-3">
                <Col className="col-12">
                    <button className="btn btn-primary" onClick={saveEvent}>
                        Save
                    </button>
                </Col>
            </Row>
        </>
    )
}

export default AddUser