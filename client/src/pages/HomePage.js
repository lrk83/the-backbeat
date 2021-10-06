import React, {useEffect, useState} from 'react';
import { Container } from 'semantic-ui-react';
import SoundSuggestionSlide from '../components/suggestion-slides/suggestion-sound-slide';
import SkillSuggestionSlide from '../components/suggestion-slides/suggestion-skill-slide';
//import soundData from "../assets/sounddata.json";
import skillData from "../assets/skilldata.json";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_SOUNDS_FOR_SUGGESTED } from '../utils/queries';

const HomePage = () => {

    const {data} = useQuery(GET_SOUNDS_FOR_SUGGESTED);

    const soundData = data?.soundPosts || {};

    console.log(soundData);

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
                <SkillSuggestionSlide data={skillData}></SkillSuggestionSlide>
            </Container>
        </Container>
    )
}

export default HomePage;