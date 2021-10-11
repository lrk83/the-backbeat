import React, {useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MostPopularSkills from '../../components/Skill-page-components/most-popular-skills';
import SkillSearch from '../../components/Skill-page-components/skill-search';
import { useQuery } from '@apollo/client';
import { GET_SKILLS_FOR_SUGGESTED, GET_ME } from '../../utils/queries';
import Sort from '../../utils/sort';
import Auth from '../../utils/auth'
import RecomendedSkills from '../../components/Skill-page-components/recomended-skills';
import { Container } from 'semantic-ui-react';


const SkillPage = () => {

    const {loading:skillloading, data} = useQuery(GET_SKILLS_FOR_SUGGESTED);
    const unformatedSkillData = data?.allSkillPosts || {};

    const {loading:userLoading, data:userData} = useQuery(GET_ME);

    const [sortedSkillData, setSortedSkillData] = useState([]);
    const [haveFormatted, setHaveFormatted] = useState(false);

    const loggedIn = Auth.loggedIn();

    //get top 10
    useEffect(()=>{
        if (!skillloading){
            if (haveFormatted===false){
                let formattingResult = Sort.formatSkillsForSearch(unformatedSkillData);
                setSortedSkillData(formattingResult);
                setHaveFormatted(true);
            }
        }
    });

    //get suggested
    const [suggestedSkillData, setSuggestedSkillData] = useState([]);
    const [haveFormattedSuggested, setHaveFormattedSuggested] = useState(false);

    useEffect(()=>{
        if (!skillloading && !userLoading){
            if (haveFormattedSuggested===false){
                let formattingResult = Sort.recomendedByTags(unformatedSkillData, userData.me);
                setSuggestedSkillData(formattingResult);
                setHaveFormattedSuggested(true);
            }
        }
    });

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    if (skillloading){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <>
        <MostPopularSkills></MostPopularSkills>
        {/*{sortedSkillData.length && <SkillSearch data={sortedSkillData}></SkillSearch>}*/}
        <Container className="big-container">
            <Container className="shadow-container">
                {loggedIn && suggestedSkillData.length && <RecomendedSkills data={suggestedSkillData}></RecomendedSkills>}
            </Container>
        </Container>
        
        </>
    )
}

export default SkillPage;