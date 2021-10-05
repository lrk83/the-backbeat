import React from 'react';
import { Container } from 'semantic-ui-react';
import SuggestionSlide from '../components/suggestion-slides/suggestion-sound-slide';
import data from "../assets/sounddata.json";

const HomePage = () => {
    return (
        <Container className="big-container">
            <Container className="shadow-container">
                <SuggestionSlide data={data}></SuggestionSlide>
            </Container>
        </Container>
    )
}

export default HomePage;