import React, {useEffect, useState} from 'react';
import { Grid, Container, List, Header, Image } from 'semantic-ui-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';

const CommunityHero = () => {

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    return (
        <Container className="big-container" id="community-hero" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
            <Header as="h1" id="community-header">Community</Header>
        </Container>
    )
}

export default CommunityHero;