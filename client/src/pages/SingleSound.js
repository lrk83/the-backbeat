import React, {useState, useEffect} from "react";
import { Container,Card, Image, Header, Icon, Button } from "semantic-ui-react";
import data from '../assets/sounddata.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SingleSound = ({ match }) => {
    
    const [ID]=useState(match.params.soundId);

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    return(
        <Container className="big-container">
            <Container className="shadow-container single-post-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                <Card className="single-post-card">
                    <Image src={data[ID-1].image} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{data[ID-1].artist}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Here is the date this was posted?</span>
                        </Card.Meta>
                        <Card.Description>
                            Here is a description of {data[ID-1].artist}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        Posted by Name
                    </a>
                    </Card.Content>
                </Card>
                <Container className="single-post-content">
                    <Header as='h1' className="single-header">{data[ID-1].name}</Header>
                    <Button color="blue" className="get-pack-button">Get Pack</Button>
                    <Container className="single-post-para">
                        <div className="buttons-div">
                            <Button circular color='facebook' icon='heart' />
                            <Button circular color='twitter' icon='mail' />
                        </div>
                        <p>Yetetetetet</p>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default SingleSound;