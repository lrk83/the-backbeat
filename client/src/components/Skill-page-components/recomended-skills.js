import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Button, Header, Icon, Menu} from "semantic-ui-react";
import CurrentSlide from "../suggestion-slides/current-skills-slides";

const RecomendedSkills = (props) => {
    const {data}=props

    const photos=data;

    console.log(photos);

    const [currentPhotos, updateCurrentPhotos] = useState(photos.slice(0, 4));
    const [currentIndex, updateCurrentIndex] = useState(4);

    const forwardPhotos = () => {
        let upperbound = currentIndex+4;
        if (upperbound>20){
            upperbound=20;
        };
        updateCurrentIndex(upperbound);
        updateCurrentPhotos(photos.slice(upperbound-4,upperbound));
    }

    const backPhotos = () => {
        let lowerbound=currentIndex-8;
        if (lowerbound<0){
            lowerbound=0;
        };
        updateCurrentIndex(lowerbound+4);
        updateCurrentPhotos(photos.slice(lowerbound,lowerbound+4));
    }

    return (
        <div className="slide-show">
            <Header as='h2'>Recomended for you</Header>
            <Menu secondary>
                <Menu.Item><Header as='h4' className="discover-menu-subheader">Recomendations based on your interests</Header></Menu.Item>
                <Menu.Item as={Link} to='/account/preferences' >Update Preferences</Menu.Item>
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
            <CurrentSlide currentPhotos={currentPhotos}></CurrentSlide>
            
        </div>
    )
}

export default RecomendedSkills;