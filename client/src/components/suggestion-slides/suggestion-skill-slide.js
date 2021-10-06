import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Container, Header, Icon, Card, Image, Menu} from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Slides = (data) => {
    const [photos]=useState(data.data);
    const [cardsToShow]=useState([0,1,2]);

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    return (
        <div className="three-suggestions">
            <Header as='h2'>Discover new Skills</Header>
            <Menu secondary className="see-all-skills"> 
                <Menu.Item name="see all" as={Link} to="/skills"></Menu.Item>
            </Menu>
            <Container className="three-suggestions-container">
                {cardsToShow.map((number)=> 
                    <Link className="three-suggestions-link" to={`/skills/single-skill/${photos[number].id}`}>
                        <Card>
                            
                            <Image src={photos[number].image} wrapped ui={false} />
                            <Card.Content>
                            <Card.Header>{photos[number].name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{photos[number].date}</span>
                            </Card.Meta>
                            <Card.Description>
                                {photos[number].description}
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                {photos[number].author}
                            </a>
                            </Card.Content>  
                        </Card>   
                    </Link>
                )}
                
            </Container>
        </div>
    )
}

export default Slides;