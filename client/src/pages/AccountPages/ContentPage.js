import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import {Container} from "semantic-ui-react";
import {GET_ME} from '../../utils/queries';
import Auth from '../../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SavedSounds from "../../components/Account-page-components/saved-sounds";
import SavedSkills from "../../components/Account-page-components/saved-skills";

const AccountPage = () => {
    const {loading, data} = useQuery(GET_ME);
    const userData = data?.me || {};
    const loggedIn = Auth.loggedIn();

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return <div>Please login</div>
    };

    return (
        <Container className="big-container">
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                <SavedSounds data={userData.savedSoundPosts}></SavedSounds>
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                <SavedSkills data={userData.savedSkillPosts}></SavedSkills>
            </Container>
        </Container>
    )
}

export default AccountPage;