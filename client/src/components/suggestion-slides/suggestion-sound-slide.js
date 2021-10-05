import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Button, Menu, Header, Icon} from "semantic-ui-react"; 
import CurrentSlide from './current-sounds-slides';

const Slides = (data) => {
    const [photos]=useState(data);
    const [currentPhotos, updateCurrentPhotos] = useState(photos.data.slice(0, 4));

    const forwardPhotos = () => {
        let upperbound = (currentPhotos[3].id+4);
        if (upperbound>10){
            upperbound=10;
        }
        updateCurrentPhotos(photos.data.slice(upperbound-4,upperbound));
    }

    const backPhotos = () => {
        let lowerbound=(currentPhotos[0].id-4);
        if (lowerbound<0){
            lowerbound=0
        }
        updateCurrentPhotos(photos.data.slice(lowerbound,lowerbound+4));
    }

    return (
        <div className="slide-show">
            <Header as='h2'>Discover new Sounds</Header>
            <Menu secondary>
                <Menu.Item><Header as='h4' className="discover-menu-subheader">Discover popular sounds</Header></Menu.Item>
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
            <CurrentSlide currentPhotos={currentPhotos}></CurrentSlide>
            
        </div>
    )
}

export default Slides;