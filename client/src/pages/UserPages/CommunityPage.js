import React, {useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CommunityHero from "../../components/user-page-components/community-page-hero";
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_ME } from '../../utils/queries';
import Sort from '../../utils/sort';
import Auth from '../../utils/auth';
import TopCreatives from '../../components/user-page-components/top-users';

const CommunityPage = () => {

    const {loading:skillloading, data} = useQuery(GET_USERS);
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
        <CommunityHero></CommunityHero>
        <TopCreatives data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500"></TopCreatives>
        </>
    )
}

export default CommunityPage;