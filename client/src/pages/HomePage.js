import React, {useEffect, useState} from 'react';
import { Container } from 'semantic-ui-react';
import SoundSuggestionSlide from '../components/suggestion-slides/suggestion-sound-slide';
import SkillSuggestionSlide from '../components/suggestion-slides/suggestion-skill-slide';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_SOUNDS_FOR_SUGGESTED, GET_SKILLS_FOR_SUGGESTED } from '../utils/queries';

const HomePage = () => {

    const {loading, data} = useQuery(GET_SOUNDS_FOR_SUGGESTED);

    const soundData = data?.allSoundPosts || {};

    const { data: skilldata} = useQuery(GET_SKILLS_FOR_SUGGESTED);

    const skillData = skilldata?.allSkillPosts || {};

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    return (
        <Container className="big-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
            <Container className="shadow-container">
                {soundData.length ? (
                <SoundSuggestionSlide data={soundData}></SoundSuggestionSlide>) : <></>}
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                {skillData.length ? (
                <SkillSuggestionSlide data={skillData}></SkillSuggestionSlide>) :<></>}
            </Container>
        </Container>
    )
}

export default HomePage;