import React from "react";
import { Container, Card, Image } from "semantic-ui-react";
import {Link} from 'react-router-dom';

function CurrentSlides ({currentPhotos}){


    return (
        <Container className="suggested-container">
            {currentPhotos[0] && ( <>
            
            <Card className="little-slide">
                <Link to={`/community/single-user/${currentPhotos[0]._id}`}>
                    <Image src={currentPhotos[0].image}/>
                    <Card.Content>
                        <Card.Header>{currentPhotos[0].username}</Card.Header>
                    </Card.Content>
                </Link>
            </Card> </> )}
            
        </Container>
    )
}

export default CurrentSlides;