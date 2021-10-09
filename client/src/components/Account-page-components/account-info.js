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
        <Container className="user-profile-data">
            <Card className="single-post-card">
                <Image src="https://splice-res.cloudinary.com/image/upload/f_auto,q_auto,w_auto/c_limit,w_450/v1578500471/1578500465.jpg" wrapped ui={false} />
            </Card>
            <Container className="single-post-content">
                <Header as='h1' className="single-header">My Info</Header>
                <Card>
                    <Header></Header>
                </Card>
            </Container>
        </Container>
    )
}

export default SingleSound;