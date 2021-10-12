import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Button, Menu, Header, Icon} from "semantic-ui-react"; 
import SmallCurrentSlide from './small-current-slides';

const Slides = (data) => {

    const [photos]=useState(data);
    const [currentPhotos, updateCurrentPhotos] = useState(photos.data.slice(0, 3));
    const [currentIndex, updateCurrentIndex] = useState(3);

    const forwardPhotos = () => {
        let upperbound = currentIndex+4;
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
        updateCurrentIndex(lowerbound+4);
        updateCurrentPhotos(photos.data.slice(lowerbound,lowerbound+3));
    }

    return (
        <div className="slide-show">
            <Header as='h2'>Discover new Sounds</Header>
            <Menu secondary>
                <Menu.Item><Header as='h4' className="discover-menu-subheader">Recently posted sound packs</Header></Menu.Item>
                <Menu.Item as={Link} to='/sounds' >See all</Menu.Item>
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
            <SmallCurrentSlide currentPhotos={currentPhotos}></SmallCurrentSlide>
            
        </div>
    )
}

export default Slides;