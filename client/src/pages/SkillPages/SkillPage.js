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
import SkillPageHero from '../../components/Skill-page-components/skill-page-hero';
import BackBeatFavorites from '../../components/Skill-page-components/backbeat-favorites';
import SmallFavorites from '../../components/small-screen/small-favorites';
import SmallRecomendedSkills from '../../components/small-screen/small-recomended-sounds';
import SearchByName from '../../components/Skill-page-components/search-by-name';

const SkillPage = () => {

    const {loading:skillloading, data} = useQuery(GET_SKILLS_FOR_SUGGESTED);
    const unformatedSkillData = data?.allSkillPosts || {};

    const {loading:userLoading, data:userData} = useQuery(GET_ME);

    const loggedIn = Auth.loggedIn();

    //get suggested
    const [suggestedSkillData, setSuggestedSkillData] = useState([]);
    const [haveFormattedSuggested, setHaveFormattedSuggested] = useState(false);

    useEffect(()=>{
        if (loggedIn){
            if (!skillloading && !userLoading){
                if (haveFormattedSuggested===false){
                    let formattingResult = Sort.recomendedByTags(unformatedSkillData, userData.me);
                    setSuggestedSkillData(formattingResult);
                    setHaveFormattedSuggested(true);
                }
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
            <SkillPageHero></SkillPageHero>
            <MostPopularSkills></MostPopularSkills>
            {unformatedSkillData.length && <SkillSearch skillData={unformatedSkillData}></SkillSearch>}
            <Container className="big-container">
                {loggedIn && suggestedSkillData.length && <>
                    {window.screen.width<=411 ? (<>
                    <Container className="shadow-container">
                        <SmallRecomendedSkills data={suggestedSkillData}></SmallRecomendedSkills>
                    </Container>
                    </>):(
                    <Container className="shadow-container">
                        <RecomendedSkills data={suggestedSkillData}></RecomendedSkills>
                    </Container>)}
                </>}
            </Container>
            {window.screen.width>411 ? (<><BackBeatFavorites></BackBeatFavorites></>):(<>
            <SmallFavorites></SmallFavorites>
            </>)}
            {unformatedSkillData.length && <SearchByName skillData={unformatedSkillData}></SearchByName>}
        </>
    )
}

export default SkillPage;