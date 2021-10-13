import React, { useState } from "react";
import {Button, Menu, Header, Icon} from "semantic-ui-react"; 
import CurrentSlide from '../suggestion-slides/current-sounds-slides';

const MySoundSlides = (data) => {
    const [photos]=useState(data);

    var num=4
    if(window.screen.width<=540){
        num=3
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
        <div className="my-sounds-slide-show">
            
            <Menu secondary>
                <Menu.Item><Header as='h2'>Saved Sounds</Header></Menu.Item>
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
};

export default MySoundSlides;