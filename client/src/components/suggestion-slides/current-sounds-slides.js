import React, {useEffect} from "react";
import { Container, Card, Image } from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';

function CurrentSlides ({currentPhotos}){
    
    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    const max = currentPhotos.length;

    return (
        <Container className="suggested-container">
            {currentPhotos[0] && ( <>
            
            <Card data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" id="suggested-card-1">
            <Link to={`/sounds/single-sound/${currentPhotos[0]._id}`}>
                <Image src={currentPhotos[0].image}/>
                <Card.Content>
                    <Card.Header>{currentPhotos[0].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[0].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[0].artist}</Card.Description>
                </Card.Content>
            </Link>
            </Card> </> )}
            
            {currentPhotos[1] && ( <>
            <Card data-aos="fade-in" data-aos-delay="300" data-aos-duration="1500" id="suggested-card-2">
            <Link to={`/sounds/single-sound/${currentPhotos[1]._id}`}>
                <Image src={currentPhotos[1].image}/>
                <Card.Content>
                    <Card.Header>{currentPhotos[1].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[1].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[1].artist}</Card.Description>
                </Card.Content>
            </Link>
            </Card> </> )}
            
            {currentPhotos[2] && ( <>
            <Card data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500" id="suggested-card-3">
            <Link to={`/sounds/single-sound/${currentPhotos[2]._id}`}>
                <Image src={currentPhotos[2].image}/>
                <Card.Content>
                    <Card.Header>{currentPhotos[2].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[2].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[2].artist}</Card.Description>
                </Card.Content>
            </Link>
            </Card> </> )}
            
            {currentPhotos[3] && ( <>
            <Card data-aos="fade-in" data-aos-delay="700" data-aos-duration="1500" id="suggested-card-2">
            <Link to={`/sounds/single-sound/${currentPhotos[3]._id}`}>
                <Image src={currentPhotos[3].image}/>
                <Card.Content>
                    <Card.Header>{currentPhotos[3].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[3].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[3].artist}</Card.Description>
                </Card.Content>
            </Link>
            </Card> </>)}
        </Container>
    )
}

export default CurrentSlides;