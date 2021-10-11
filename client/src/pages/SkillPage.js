import React from 'react';
import { Container } from 'semantic-ui-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_SKILLS_FOR_SUGGESTED} from '../utils/queries';

const SkillPage = () => {
    return (
        <Container className="big-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
        </Container>
    )
}

export default SkillPage;