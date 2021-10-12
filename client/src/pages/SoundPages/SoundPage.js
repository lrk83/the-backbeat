import React, {useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MostPopularSounds from '../../components/Sound-page-components/most-popular-sounds';
import SoundSearch from '../../components/Sound-page-components/sound-search';
import SoundPageHero from '../../components/Sound-page-components/sound-page-hero';
import { useQuery } from '@apollo/client';
import { GET_SOUNDS_FOR_SUGGESTED, GET_ME } from '../../utils/queries';
import Sort from '../../utils/sort';
import Auth from '../../utils/auth'
import RecomendedSounds from '../../components/Sound-page-components/recomended-sounds';
import { Container } from 'semantic-ui-react';


const SoundPage = () => {

    const {loading:soundloading, data} = useQuery(GET_SOUNDS_FOR_SUGGESTED);
    const unformatedSoundData = data?.allSoundPosts || {};

    const {loading:userLoading, data:userData} = useQuery(GET_ME);

    const [sortedSoundData, setSortedSoundData] = useState([]);
    const [haveFormatted, setHaveFormatted] = useState(false);

    const loggedIn = Auth.loggedIn();

    //get top 10
    useEffect(()=>{
        if (!soundloading){
            if (haveFormatted===false){
                let formattingResult = Sort.formatSkillsForSearch(unformatedSoundData);
                setSortedSoundData(formattingResult);
                setHaveFormatted(true);
            }
        }
    });

    //get suggested
    const [suggestedSoundData, setSuggestedSoundData] = useState([]);
    const [haveFormattedSuggested, setHaveFormattedSuggested] = useState(false);

    useEffect(()=>{
        if (loggedIn) {
            if (!soundloading && !userLoading){
                if (haveFormattedSuggested===false){
                    let formattingResult = Sort.recomendedByTags(unformatedSoundData, userData.me);
                    setSuggestedSoundData(formattingResult);
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

    if (soundloading){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <>
        <SoundPageHero></SoundPageHero>
        <MostPopularSounds></MostPopularSounds>
        {/*{sortedSkillData.length && <SkillSearch data={sortedSkillData}></SkillSearch>}*/}
        <Container className="big-container">
            {loggedIn && suggestedSoundData.length && 
                <Container className="shadow-container">
                    <RecomendedSounds data={suggestedSoundData}></RecomendedSounds>
                </Container>
            }
        </Container>
        
        </>
    )
}

export default SoundPage;