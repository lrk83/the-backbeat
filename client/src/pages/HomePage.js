import React, {useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import SoundSuggestionSlide from '../components/suggestion-slides/suggestion-sound-slide';
import SkillSuggestionSlide from '../components/suggestion-slides/suggestion-skill-slide';
import soundData from "../assets/sounddata.json";
import skillData from "../assets/skilldata.json";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    return (
        <Container className="big-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
            <Container className="shadow-container">
                <SoundSuggestionSlide data={soundData}></SoundSuggestionSlide>
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                <SkillSuggestionSlide data={skillData}></SkillSuggestionSlide>
            </Container>
        </Container>
    )
}

export default HomePage;