import React, {useState, useEffect} from "react";
import { Container,Card, Image, Header, Icon, Button, Menu, Dropdown } from "semantic-ui-react";
import data from '../assets/sounddata.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SingleSound = ({ match }) => {
    
    const [ID]=useState(match.params.soundId);

    const [tagsToShow]=useState(data[ID-1].tags);
    const [additionalToShow]=useState(data[ID-1].additional)
    console.log(additionalToShow);

    console.log(data);

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
                            <span className='date'>Posted Date</span>
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
                    <div className="buttons-div">
                        <Button color="blue" className="get-pack-button" href={data[ID-1].link} target="_blank">Get Pack</Button>
                        <Button circular color='facebook' icon='heart' />
                        <Button circular color='twitter' icon='mail' />
                    </div>
                    <Menu secondary className="tags-menu"> 
                        <Menu.Item name={tagsToShow[0]}></Menu.Item>
                        <Menu.Item name={tagsToShow[1]}></Menu.Item>
                        <Menu.Item name={tagsToShow[2]}></Menu.Item>
                    
                        <Menu.Menu position="right">
                            <Dropdown item text='more'>
                                <Dropdown.Menu>
                                    {additionalToShow.map(item=> (
                                        <Dropdown.Item key={item}>{item}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Menu>
                    <Container className="single-post-para">
                        <p>{data[ID-1].description}</p>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default SingleSound;