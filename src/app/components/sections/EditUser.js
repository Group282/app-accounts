import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from "react";
import {getOneUser, updateUser} from "../../common/usersAPI";

const EditUser = ({fun, id}) => {
    const [name, setName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');


    useEffect(async () => {
        let user = await getOneUser(id)
        let start_date_user = new Date(Number.parseInt(user.start_date) * 1000)
        let expiration_date_user = new Date(Number.parseInt(user.start_date) * 1000)

        setStartDate(start_date_user.toISOString().split('T')[0])
        setExpirationDate(expiration_date_user.toISOString().split('T')[0])
        setName(user.name)
        setAccountName(user.account_name)
        setEmail(user.email)
        setStatus(user.status)
    }, [])


    const saveEvent = async () => {
        if (name.length >= 5 &&
            accountName.length >= 5 &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
            expirationDate >= startDate) {
            let _startDate = new Date(startDate)
            let _expirationDate = new Date(expirationDate)
            await updateUser(
                {
                    id: id,
                    name: name,
                    accountName: accountName,
                    email: email,
                    status: status,
                    startDate: (_startDate.getTime() / 1000),
                    expirationDate: (_expirationDate.getTime() / 1000)
                })
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
            <Form.Select className="mb-3"
                         value={status}
                         onChange={(e) => setStatus(e.target.value)}>
                <option value="Active">Active</option>
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

export default EditUser