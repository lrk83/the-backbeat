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
import BackbeatFavorites from '../../components/Sound-page-components/backbeat-favorites';
import SmallRecomendedSounds from '../../components/small-screen/small-recomended-sounds';
import SmallFavorites from '../../components/small-screen/small-favorites';
import SearchByName from '../../components/Sound-page-components/search-by-name';

const SoundPage = () => {

    const {loading:soundloading, data} = useQuery(GET_SOUNDS_FOR_SUGGESTED);
    const unformatedSoundData = data?.allSoundPosts || {};

    const {loading:userLoading, data:userData} = useQuery(GET_ME);

    const loggedIn = Auth.loggedIn();

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
    }, [loggedIn, soundloading, userLoading, haveFormattedSuggested, unformatedSoundData, userData]);

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
            {unformatedSoundData.length && <SoundSearch soundData={unformatedSoundData}></SoundSearch>}
            <Container className="big-container">
                {loggedIn && suggestedSoundData.length && <>
                    {window.screen.width<=411 ? (<>
                    <Container className="shadow-container">
                        <SmallRecomendedSounds data={suggestedSoundData}></SmallRecomendedSounds>
                    </Container>
                    </>):(
                    <Container className="shadow-container">
                        <RecomendedSounds data={suggestedSoundData}></RecomendedSounds>
                    </Container>)}
                </>}
            </Container>
            {window.screen.width>411 ? (<><BackbeatFavorites></BackbeatFavorites></>):(<>
            <SmallFavorites></SmallFavorites>
            </>)}
            {unformatedSoundData.length && <SearchByName soundData={unformatedSoundData}></SearchByName>}
        </>
    )
}

export default SoundPage;