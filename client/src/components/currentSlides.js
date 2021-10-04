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
            {currentPhotos[4] ? ( <>
            <Card data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" id="suggested-card-1">
                <Image/>
                <Card.Content>
                    <Card.Header>{currentPhotos[0].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[0].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[0].name}</Card.Description>
                </Card.Content>
            </Card>
            <Card data-aos="fade-in" data-aos-delay="300" data-aos-duration="1500" id="suggested-card-2">
                <Image/>
                <Card.Content>
                    <Card.Header>{currentPhotos[1].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[1].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[1].name}</Card.Description>
                </Card.Content>
            </Card>
            <Card data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500" id="suggested-card-3">
                <Image/>
                <Card.Content>
                    <Card.Header>{currentPhotos[2].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[2].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[2].name}</Card.Description>
                </Card.Content>
            </Card>
            <Card data-aos="fade-in" data-aos-delay="700" data-aos-duration="1500" id="suggested-card-2">
                <Image/>
                <Card.Content>
                    <Card.Header>{currentPhotos[3].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[3].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[3].name}</Card.Description>
                </Card.Content>
            </Card>
            <Card data-aos="fade-in" data-aos-delay="900" data-aos-duration="1500" id="suggested-card-3">
                <Image/>
                <Card.Content>
                    <Card.Header>{currentPhotos[4].name}</Card.Header>
                    <Card.Meta><span className='author'>{currentPhotos[4].name}</span></Card.Meta>
                    <Card.Description>{currentPhotos[4].name}</Card.Description>
                </Card.Content>
            </Card> </>):(<></>)}
        </Container>
    )
}

export default CurrentSlides;