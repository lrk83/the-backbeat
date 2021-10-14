import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Button, Header, Icon, Menu} from "semantic-ui-react";
import SmallCurrentSlide from "../small-screen/small-current-slides";
import Sort from "../../utils/sort";

const SoundSearchSlides = (props) => {
    const {tag, skillData}=props;

    const [sortedSoundData, setSortedSoundData] = useState([]);
    const [haveFormatted, setHaveFormatted] = useState(false);

    //get top 10
    useEffect(()=>{
            if (haveFormatted===false){
                let formattingResult = Sort.formatSoundsAndTags(skillData,tag);
                setSortedSoundData(formattingResult);
                setHaveFormatted(true);
            }
    }, [haveFormatted, skillData, tag]);


    return (
        <>
        {sortedSoundData.length && <Slides data={sortedSoundData} tag={tag}></Slides>}
        </>
    )
}

const Slides = (props) => {

    const {data, tag}=props

    const photos=data;

    const [currentPhotos, updateCurrentPhotos] = useState(photos.slice(0, 1));
    const [currentIndex, updateCurrentIndex] = useState(1);

    const forwardPhotos = () => {
        let upperbound = currentIndex+1;
        if (upperbound>20){
            upperbound=20;
        };
        updateCurrentIndex(upperbound);
        updateCurrentPhotos(photos.slice(upperbound-1,upperbound));
    }

    const backPhotos = () => {
        let lowerbound=currentIndex-2;
        if (lowerbound<0){
            lowerbound=0;
        };
        updateCurrentIndex(lowerbound+1);
        updateCurrentPhotos(photos.slice(lowerbound,lowerbound+1));
    }

    return (
        <div className="slide-show">
            <Header as='h2'>{tag.title}</Header>
            <Menu secondary>
                <Menu.Item as={Link} to='/account/preferences' >Preferences</Menu.Item>
                <Menu.Menu className="search-menu-buttons">
                    <Button animated="vertical" onClick={()=>backPhotos()}>
                        <Button.Content hidden>Back</Button.Content>
                        <Button.Content visible>
                            <Icon name="arrow left"/>
                        </Button.Content>
                    </Button>
                    <Button animated="vertical" onClick={()=>forwardPhotos()}>
                        <Button.Content hidden>Forward</Button.Content>
                        <Button.Content visible>
                            <Icon name="arrow right"/>
                        </Button.Content>
                    </Button>
                </Menu.Menu>
            </Menu>
            <SmallCurrentSlide currentPhotos={currentPhotos}></SmallCurrentSlide>
            
        </div>
    )
}


export default SoundSearchSlides;