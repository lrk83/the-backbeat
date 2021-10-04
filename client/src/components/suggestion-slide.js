import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Button, Menu, Header} from "semantic-ui-react"; 
import CurrentSlide from './currentSlides';
import data from "../assets/photolist.json";

const Slides = () => {
    const [photos]=useState(data);
    const [currentPhotos, updateCurrentPhotos] = useState(photos.slice(0, 5));

    
    const updatePhotos = () => {
        updateCurrentPhotos(photos.slice(currentPhotos.length+1,currentPhotos.length+5));
        console.log(currentPhotos);
    }

    return (
        <div className="slide-show">
            <Header as='h2'>Discover new Sounds</Header>
            <Menu secondary>
                <Menu.Item><Header as='h4' className="discover-menu-subheader">Discover popular sounds</Header></Menu.Item>
                <Menu.Item as={Link} to='/sounds' >See all</Menu.Item>
                <Menu.Menu className="discover-menu-buttons" position='right'><Button onClick={()=>updatePhotos()}>+</Button><Button onClick={()=>updatePhotos()}>-</Button></Menu.Menu>
            </Menu>
            <CurrentSlide currentPhotos={currentPhotos}></CurrentSlide>
            
        </div>
    )
}

export default Slides;