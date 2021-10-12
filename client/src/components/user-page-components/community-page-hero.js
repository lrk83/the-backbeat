import React, {useEffect} from 'react';
import { Container, Header} from 'semantic-ui-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CommunityHero = () => {

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    return (
        <Container className="big-container" id="community-hero" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
            <Header as="h1" id="community-header">Community</Header>
        </Container>
    )
}

export default CommunityHero;