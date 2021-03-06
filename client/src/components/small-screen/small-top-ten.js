import React, {useState} from "react";
import {Button, Menu, Icon} from "semantic-ui-react"; 
import SmallCurrentSlide from './small-current-slides';

const SmallTopTen = (data) => {

    const [photos]=useState(data);
    const [currentPhotos, updateCurrentPhotos] = useState(photos.data.slice(0, 1));
    const [currentIndex, updateCurrentIndex] = useState(1);

    const forwardPhotos = () => {
        let upperbound = currentIndex+1;
        if (upperbound>20){
            upperbound=20;
        };
        updateCurrentIndex(upperbound);
        updateCurrentPhotos(photos.data.slice(upperbound-1,upperbound));
    }

    const backPhotos = () => {
        let lowerbound=currentIndex-2;
        if (lowerbound<0){
            lowerbound=0;
        };
        updateCurrentIndex(lowerbound+1);
        updateCurrentPhotos(photos.data.slice(lowerbound,lowerbound+1));
    }

    return (
        <div className="slide-show">
            <SmallCurrentSlide currentPhotos={currentPhotos}></SmallCurrentSlide>
            <Menu secondary>
                <Menu.Menu id="top-ten-buttons">
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
            
        </div>
    )
}

export default SmallTopTen;