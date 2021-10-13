import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Button, Header, Icon, Menu} from "semantic-ui-react";
import CurrentSlide from "../suggestion-slides/current-sounds-slides";

const RecomendedSkills = (props) => {
    const {data}=props

    const photos=data;

    var num=3

    if (window.screen.width<=540){
        num=3;
    }

    const [currentPhotos, updateCurrentPhotos] = useState(photos.slice(0, num));
    const [currentIndex, updateCurrentIndex] = useState(num);

    const forwardPhotos = () => {
        let upperbound = currentIndex+num;
        if (upperbound>20){
            upperbound=20;
        };
        updateCurrentIndex(upperbound);
        updateCurrentPhotos(photos.slice(upperbound-num,upperbound));
    }

    const backPhotos = () => {
        let lowerbound=currentIndex-num-num;
        if (lowerbound<0){
            lowerbound=0;
        };
        updateCurrentIndex(lowerbound+num);
        updateCurrentPhotos(photos.slice(lowerbound,lowerbound+num));
    }

    return (
        <div className="slide-show">
            <Header as='h2'>Recomended for you</Header>
            <Header as='h4' className="discover-menu-subheader">based on your interests</Header>
            <Menu secondary>
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