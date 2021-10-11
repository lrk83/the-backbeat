import React, {useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MostPopularSkills from '../../components/Skill-page-components/most-popular-skills';
import SkillSearch from '../../components/Skill-page-components/skill-search';
import { useQuery } from '@apollo/client';
import { GET_SKILLS_FOR_SUGGESTED } from '../../utils/queries';
import Sort from '../../utils/sort';
import Auth from '../../utils/auth'
import RecomendedSkills from '../../components/Skill-page-components/recomended-skills';

const SkillPage = () => {

    const {loading:skillloading, data} = useQuery(GET_SKILLS_FOR_SUGGESTED);
    const unformatedSkillData = data?.allSkillPosts || {};

    const [sortedSkillData, setSortedSkillData] = useState([]);
    const [haveFormatted, setHaveFormatted] = useState(false);

    const loggedIn = Auth.loggedIn();

    useEffect(()=>{
        if (!skillloading){
            if (haveFormatted===false){
                let formattingResult = Sort.formatSkillsForSearch(unformatedSkillData);
                setSortedSkillData(formattingResult);
                setHaveFormatted(true);
            }
        }
    });

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    return (
        <>
        <MostPopularSkills></MostPopularSkills>
        {/*{sortedSkillData.length && <SkillSearch data={sortedSkillData}></SkillSearch>}*/}
        {loggedIn && <RecomendedSkills></RecomendedSkills>}
        </>
    )
}

export default SkillPage;