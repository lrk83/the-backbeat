import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import {Container} from "semantic-ui-react";
import {GET_ME} from '../../utils/queries';
import Auth from '../../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MySounds from "../../components/Account-page-components/my-sounds";
import MySkills from "../../components/Account-page-components/my-skills";
import AccountInfo from "../../components/Account-page-components/account-info";
import MySoundsSmall from '../../components/small-screen/small-my-sounds';
import MySkillsSmall from '../../components/small-screen/small-my-skills';

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
            {window.screen.width>=400 ?(<>
                <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                    <AccountInfo data={userData}></AccountInfo>
                </Container>
                <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                    <MySounds data={userData.soundPosts}></MySounds>
                </Container>
                <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                    <MySkills data={userData.skillPosts}></MySkills>
                </Container>
                </>):(<>
                <Container className="shadow-container">
                    <AccountInfo data={userData}></AccountInfo>
                </Container>
                    <MySoundsSmall data={userData.soundPosts}></MySoundsSmall>
                    <MySkillsSmall data={userData.skillPosts}></MySkillsSmall>
            </>)}
        </Container>
    )
}

export default AccountPage;