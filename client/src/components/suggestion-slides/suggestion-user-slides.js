import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Container, Header, Icon, Card, Image, Menu} from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Slides = (data) => {

    const photos=data.data;
    const [cardsToShow]=useState([0,1,2]);

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    return (
        <div className="three-suggestions">
            <Header as='h2'>Discover new Creatives</Header>
            <Menu secondary className="see-all-skills"> 
                <Menu.Item name="see all" as={Link} to="/creators"></Menu.Item>
            </Menu>
            <Container className="three-suggestions-container">
                {cardsToShow.map((number)=> 
                    <Link key={number} className="three-suggestions-link" to={`/users/single-user/${photos[number]._id}`}>
                        <Card>
                            <Image src="https://upload.wikimedia.org/wikipedia/en/6/69/Vince_Staples_FM.jpg" wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{photos[number].username}</Card.Header>
                            </Card.Content>
                        </Card>   
                    </Link>
                )}
                
            </Container>
        </div>
    )
}

export default Slides;