import React, {useState, useEffect} from "react";
import { Container,Card, Image, Header, Icon, Button, Menu, Dropdown } from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';

const SingleSound = (data) => {

    console.log(data);
    const userData = data?.data || {};

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })


    return(
        <>
                <Card className="single-post-card">
                    <Image icon="user" wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{userData.username}</Card.Header>
                    </Card.Content>
                </Card>
                <Container className="single-post-content">
                    <Header as='h1' className="single-header">My Info</Header>
                </Container>
        </>
    )
}

export default SingleSound;