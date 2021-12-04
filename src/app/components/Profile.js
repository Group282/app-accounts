import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getOneUser} from "../common/usersAPI";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Profile = () => {
    const {id} = useParams()
    const[user, setUser] = useState({})


    useEffect(async () => {
        setUser(await getOneUser(id))
    }, [])

    return(
        <Container className="mt-4">
            <h1>Profile</h1>
            <Row>
               <Col className="col-6">
                   <Table bordered>
                       <tbody>
                       <tr>
                           <th className="bg-light text-center">Name</th>
                           <td>{user.name}</td>
                       </tr>
                       <tr>
                           <th className="bg-light text-center">Account name</th>
                           <td>{user.account_name}</td>
                       </tr>
                       <tr>
                           <th className="bg-light text-center">Email</th>
                           <td>{user.email}</td>
                       </tr>
                       <tr>
                           <th className="bg-light text-center">Status</th>
                           <td>{user.status}</td>
                       </tr>
                       <tr>
                           <th className="bg-light text-center">Start date</th>
                           <td>{user.start_date}</td>
                       </tr>
                       <tr>
                           <th className="bg-light text-center">Expiration date</th>
                           <td>{user.expiration_date}</td>
                       </tr>
                       </tbody>
                   </Table>
               </Col>
            </Row>
        </Container>
    )
}

export  default Profile