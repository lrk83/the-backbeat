import React, {useEffect, useState} from 'react';
import { Container } from 'semantic-ui-react';
import SoundSuggestionSlide from '../components/suggestion-slides/home-page-sound-slides';
import SkillSuggestionSlide from '../components/suggestion-slides/home-page-skill-suggestion-slide';
import UserSuggestionSlide from '../components/suggestion-slides/suggestion-user-slides';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_SOUNDS_FOR_SUGGESTED, GET_SKILLS_FOR_SUGGESTED, GET_USERS } from '../utils/queries';
import Sort from "../utils/sort";
import HomePageHero from '../components/home-page-hero';
import SmallSoundSuggestionSlide from '../components/small-screen/small-sound-suggestion-slide';
import SmallSkillSuggestionSlide from '../components/small-screen/small-skill-suggestion-slide'
import SmallUserSuggestionSlide from '../components/small-screen/small-user-suggestion-slide';

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
    }, [loading, haventSortedSounds, soundData]);

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
    },[skillloading, haventSortedSkills, skillData]);

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
    }, [userloading, haventSortedUsers, userData]);

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    if (loading || skillloading || userloading ){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <>
        <HomePageHero></HomePageHero>
        {window.screen.width<=411? (<>
            <Container className="big-container">
            <Container className="shadow-container">
                {sortedSoundData.length ? (
                <SmallSoundSuggestionSlide data={sortedSoundData}></SmallSoundSuggestionSlide>) : <></>}
            </Container>
            <Container className="shadow-container">
                {sortedSkillData.length ? (
                <SmallSkillSuggestionSlide data={sortedSkillData} length={sortedSkillData.length}></SmallSkillSuggestionSlide>) :<></>}
            </Container>
            <Container className="shadow-container">
                {sortedUserData.length ? (
                <SmallUserSuggestionSlide data={sortedUserData}></SmallUserSuggestionSlide>) :<></>}
            </Container>
        </Container>
        
        </>):(<>
        <Container className="big-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
            <Container className="shadow-container">
                {sortedSoundData.length ? (
                <SoundSuggestionSlide data={sortedSoundData}></SoundSuggestionSlide>) : <></>}
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                {sortedSkillData.length ? (
                <SkillSuggestionSlide data={sortedSkillData} length={sortedSkillData.length}></SkillSuggestionSlide>) :<></>}
            </Container>
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" >
                {sortedUserData.length ? (
                <UserSuggestionSlide data={sortedUserData}></UserSuggestionSlide>) :<></>}
            </Container>
        </Container>
        </>)}
        </>
    )
}

export default HomePage;