import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Container, Header, Icon, Card, Image, Menu} from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Slides = (props) => {

    const {data, length} = props;

    const photos=data;
    const [cardsToShow]=useState([length-1,length-2,length-3]);

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
                    <Link key={number} className="three-suggestions-link" to={`/skills/single-skill/${photos[number]._id}`}>
                        <Card>
                            
                            <Image src={photos[number].image} wrapped ui={false} />
                            <Card.Content>
                            <Card.Header>{photos[number].name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{photos[number].date.split('at')[0]}</span>
                            </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='user' />
                                followers: {photos[number].followerCount}
                            </Card.Content>  
                        </Card>   
                    </Link>
                )}
                
            </Container>
        </div>
    )
}

export default Slides;