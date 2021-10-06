import React, {useState, useEffect} from "react";
import { Container,Card, Image, Header, Icon, Button, Menu, Dropdown } from "semantic-ui-react";
//import data from '../assets/sounddata.json';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_SINGLE_SOUND} from '../utils/queries';

const SingleSound = ({ match }) => {
    
    const [ID]=useState(match.params.soundId);

    const { loading, data } = useQuery(GET_SINGLE_SOUND, {
        variables: { id: ID }
    });

    const soundData = data?.soundPost || {};
    const tagsToShow=soundData.tags;
    const aditionalToShow=soundData.aditionalTags

    console.log(tagsToShow);

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <Container className="big-container">
            <Container className="shadow-container single-post-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                <Card className="single-post-card">
                    <Image src={soundData.image} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{soundData.artist}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Posted Date</span>
                        </Card.Meta>
                        <Card.Description>
                            Here is a description of {soundData.artist}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />
                        Posted by Name
                    </Card.Content>
                </Card>
                <Container className="single-post-content">
                    <Header as='h1' className="single-header">{soundData.name}</Header>
                    <div className="buttons-div">
                        <Button color="blue" className="get-pack-button" href={soundData.link} target="_blank">Get Pack</Button>
                        <Button circular color='facebook' icon='heart' />
                        <Button circular color='twitter' icon='mail' />
                    </div>
                    <Menu secondary className="tags-menu"> 
                        <Menu.Item name={tagsToShow[0].name}></Menu.Item>
                        {/*<Menu.Item name={tagsToShow[1]}></Menu.Item>
                        <Menu.Item name={tagsToShow[2]}></Menu.Item>*/}
                    
                        <Menu.Menu position="right">
                            <Dropdown item text='more'>
                                <Dropdown.Menu>
                                    {aditionalToShow.map(item=> (
                                        <Dropdown.Item key={item}>{item}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Menu>
                    <Container className="single-post-para">
                        <p>{soundData.description}</p>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default SingleSound;