import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Button, Menu, Header, Icon, Container} from "semantic-ui-react";
import CurrentSlideSmall from '../small-screen/small-current-slides';

const MySoundSlides = (data) => {
    const [photos]=useState(data);

    var num=4;
    if(window.screen.width<=540){
        num=3;
    }
    if(window.screen.width<=411){
        num=1
    }
    const [currentPhotos, updateCurrentPhotos] = useState(photos.data.slice(0, num));
    const [currentIndex, updateCurrentIndex] = useState(3);

    const forwardPhotos = () => {
        let upperbound = currentIndex+num;
        if (upperbound>20){
            upperbound=20;
        };
        updateCurrentIndex(upperbound);
        updateCurrentPhotos(photos.data.slice(upperbound-num,upperbound));
    }

    const backPhotos = () => {
        let lowerbound=currentIndex-num-num;
        if (lowerbound<0){
            lowerbound=0;
        };
        updateCurrentIndex(lowerbound+num);
        updateCurrentPhotos(photos.data.slice(lowerbound,lowerbound+num));
    }

    return (
        <>
        <Container className="shadow-container">
        <div className="my-sounds-slide-show">
            
            <Menu secondary>
                <Menu.Item><Header as='h2'>My Sounds</Header></Menu.Item>
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
            <CurrentSlideSmall currentPhotos={currentPhotos}></CurrentSlideSmall>
        </div>
        </Container>
        <div className="new-sound-button-div">
            <Button as={Link} to="/account/sounds/new-sound" color="blue" id="new-sound-button">New Sound</Button>
        </div>
        </>
    )
};

export default MySoundSlides;