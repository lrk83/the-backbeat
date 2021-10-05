import React, {useEffect} from "react";
import { Container, Card, Image } from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

function CurrentSlides ({currentPhotos}){

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    return (
        <Container className="suggested-container">
            {currentPhotos[3] ? ( <>
            
            <Card data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" id="suggested-card-1">
            <a href={currentPhotos[0].link}>
                <Image src={currentPhotos[0].image}/>
                <Card.Content>
                    <Card.Header>{currentPhotos[0].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[0].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[0].artist}</Card.Description>
                </Card.Content>
            </a>
            </Card>
            
            
            <Card data-aos="fade-in" data-aos-delay="300" data-aos-duration="1500" id="suggested-card-2">
            <a href={currentPhotos[1].link}>
                <Image src={currentPhotos[1].image}/>
                <Card.Content>
                    <Card.Header>{currentPhotos[1].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[1].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[1].artist}</Card.Description>
                </Card.Content>
            </a>
            </Card>
            
            
            <Card data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500" id="suggested-card-3">
            <a href={currentPhotos[2].link}>
                <Image src={currentPhotos[2].image}/>
                <Card.Content>
                    <Card.Header>{currentPhotos[2].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[2].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[2].artist}</Card.Description>
                </Card.Content>
            </a>
            </Card>
            
            
            <Card data-aos="fade-in" data-aos-delay="700" data-aos-duration="1500" id="suggested-card-2">
            <a href={currentPhotos[3].link}>
                <Image src={currentPhotos[3].image}/>
                <Card.Content>
                    <Card.Header>{currentPhotos[3].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[3].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[3].artist}</Card.Description>
                </Card.Content>
            </a>
            </Card>
            
            </>):(<></>)}
        </Container>
    )
}

export default CurrentSlides;