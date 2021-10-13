import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Button, Menu, Header, Icon} from "semantic-ui-react"; 
import CurrentSkillSlide from '../suggestion-slides/current-skills-slides';

const MySkillSlides = (data) => {
    const [photos]=useState(data);
    const [currentPhotos, updateCurrentPhotos] = useState(photos.data.slice(0, 3));
    const [currentIndex, updateCurrentIndex] = useState(3);

    const forwardPhotos = () => {
        let upperbound = currentIndex+3;
        if (upperbound>20){
            upperbound=20;
        };
        updateCurrentIndex(upperbound);
        updateCurrentPhotos(photos.data.slice(upperbound-3,upperbound));
    }

    const backPhotos = () => {
        let lowerbound=currentIndex-7;
        if (lowerbound<0){
            lowerbound=0;
        };
        updateCurrentIndex(lowerbound+3);
        updateCurrentPhotos(photos.data.slice(lowerbound,lowerbound+3));
    }

    return (
        <div className="my-sounds-slide-show">
            
            <Menu secondary>
                <Menu.Item><Header as='h2'>My Skills</Header></Menu.Item>
                <Menu.Menu className="discover-menu-buttons" position='right'>
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
            <CurrentSkillSlide currentPhotos={currentPhotos}></CurrentSkillSlide>
            <div className="new-sound-button-div">
                <Button as={Link} to="/account/skills/new-skill" color="blue" className="get-pack-button">New</Button>
            </div>
        </div>
    )
};

export default MySkillSlides;