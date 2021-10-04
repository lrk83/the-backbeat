import React from 'react';
import { Container } from 'semantic-ui-react';
import SuggestionSlide from '../components/suggestion-slide';

const HomePage = () => {
    return (
        <Container className="big-container">
            <Container className="shadow-container">
                <SuggestionSlide></SuggestionSlide>
            </Container>
        </Container>
        
    )
}

export default HomePage;