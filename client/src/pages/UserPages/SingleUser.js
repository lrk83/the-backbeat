import React, {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import {Container} from "semantic-ui-react";
import {GET_SINGLE_USER} from '../../utils/queries';
import Auth from '../../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AccountInfo from '../../components/user-page-components/user-info';
import AccountInfoViewOnly from "../../components/user-page-components/user-info-view-only"
import Sounds from '../../components/user-page-components/suggestion-sound-slide';
import Skills from '../../components/user-page-components/suggestion-skill-slide';
import SmallSounds from '../../components/small-screen/small-my-sounds';
import SmallSkills from '../../components/small-screen/small-my-skills';

const AccountPage = ({ match }) => {

    const [ID]=useState(match.params.userId);

    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { userId: ID }
    });

    const userData = data?.user || {};
    const loggedIn = Auth.loggedIn();

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="big-container">
            {loggedIn ? (
                <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                    <AccountInfo data={userData}></AccountInfo>
                </Container>
            ):(
                <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                    <AccountInfoViewOnly data={userData}></AccountInfoViewOnly>
                </Container>
            )}
            
            {window.screen.width<=540 ? (<>
                <Container className="shadow-container">
                    <SmallSounds data={userData.soundPosts}></SmallSounds>
                </Container>
                <Container className="shadow-container">
                    <SmallSkills data={userData.skillPosts} length={userData.skillPosts.length}></SmallSkills>
                </Container>
            </>):(<>
                <Container className="shadow-container">
                    <Sounds data={userData.soundPosts}></Sounds>
                </Container>
                <Container className="shadow-container">
                    <Skills data={userData.skillPosts} length={userData.skillPosts.length}></Skills>
                </Container>
            </>)}
        </Container>
    )
}

export default AccountPage;