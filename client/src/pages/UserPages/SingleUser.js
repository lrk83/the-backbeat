import React, {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import {Container} from "semantic-ui-react";
import {GET_SINGLE_USER} from '../../utils/queries';
import Auth from '../../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AccountInfo from '../../components/Account-page-components/account-info';
import Sounds from '../../components/suggestion-slides/suggestion-sound-slide';
import Skills from '../../components/suggestion-slides/suggestion-skill-slide';

const AccountPage = ({ match }) => {

    const [ID]=useState(match.params.userId);

    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { userId: ID }
    });

    const userData = data?.user || {};
    const loggedIn = Auth.loggedIn();

    console.log(userData);

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return <div>Please login to continue</div>
    };

    return (
        <Container className="big-container">
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                <AccountInfo data={userData}></AccountInfo>
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                <Sounds data={userData.soundPosts}></Sounds>
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                <Skills data={userData.skillPosts}></Skills>
            </Container>
        </Container>
    )
}

export default AccountPage;