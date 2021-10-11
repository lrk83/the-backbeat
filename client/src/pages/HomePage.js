import React, {useEffect, useState} from 'react';
import { Container } from 'semantic-ui-react';
import SoundSuggestionSlide from '../components/suggestion-slides/suggestion-sound-slide';
import SkillSuggestionSlide from '../components/suggestion-slides/suggestion-skill-slide';
import UserSuggestionSlide from '../components/suggestion-slides/suggestion-user-slides';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_SOUNDS_FOR_SUGGESTED, GET_SKILLS_FOR_SUGGESTED, GET_USERS } from '../utils/queries';
import Sort from "../utils/sort"

const HomePage = () => {

    const {loading, data} = useQuery(GET_SOUNDS_FOR_SUGGESTED);
    const soundData = data?.allSoundPosts || {};

    const [haventSortedSounds, setSortedSounds] = useState(true);
    const [sortedSoundData, setSortedSoundData]=useState([]);

    useEffect(()=>{
        if (!loading){
            if (haventSortedSounds===true){
                setSortedSoundData(Sort.mostRecentPost(soundData));
                setSortedSounds(true);
            }
        }
    });

    const { loading: skillloading, data: skilldata} = useQuery(GET_SKILLS_FOR_SUGGESTED);
    const skillData = skilldata?.allSkillPosts || {};

    const [haventSortedSkills, setSortedSkills] = useState(true);
    const [sortedSkillData, setSortedSkillData]=useState([]);

    useEffect(()=>{
        if (!skillloading){
            if (haventSortedSkills===true){
                setSortedSkillData(Sort.mostRecentPost(skillData));
                setSortedSkills(true);
            }
        }
    });

    const { loading: userloading, data: userdata } = useQuery(GET_USERS);
    const userData = userdata?.users || {};

    const [haventSortedUsers, setSortedUsers] = useState(true);
    const [sortedUserData, setSortedUserData]=useState([]);

    useEffect(()=>{
        if (!userloading){
            if (haventSortedUsers===true){
                setSortedUserData(Sort.mostRecentPost(userData));
                setSortedUsers(true);
            }
        }
    });

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    if (loading){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <Container className="big-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
            <Container className="shadow-container">
                {sortedSoundData.length ? (
                <SoundSuggestionSlide data={sortedSoundData}></SoundSuggestionSlide>) : <></>}
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                {sortedSkillData.length ? (
                <SkillSuggestionSlide data={sortedSkillData}></SkillSuggestionSlide>) :<></>}
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                {skillData.length ? (
                <UserSuggestionSlide data={sortedUserData}></UserSuggestionSlide>) :<></>}
            </Container>
        </Container>
    )
}

export default HomePage;