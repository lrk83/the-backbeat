//Have user choose profile picture, choose tags they are interested in, write a short description about themselves
import React, {useState, useEffect} from "react";
import { Container, Form, Label, Button, Header} from "semantic-ui-react";
import Auth from '../../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery, useMutation } from '@apollo/client';
import {GET_ME} from '../../utils/queries';
import {UPDATE_USER} from '../../utils/mutation';
import TagSearch from "../../components/Account-page-components/tags-search";

const AccountPreferences = () => {

    const loggedIn = Auth.loggedIn();

    const {loading, data} = useQuery(GET_ME);

    const hardCodedTags = [];

    const userData = data?.me || {};

    const [submitUserData] = useMutation(UPDATE_USER);

    const [userFormData, setUserFormData] = useState({ image: data?.me.image || "", description: data?.me.description || ""});
    const [showAlert, setShowAlert] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = await submitUserData (
            {varibales: {image: userFormData.image, description:userFormData.description, followedTags:[]}}
        );
    }

    const handleContentChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    //Fade in elements
    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    if (!loggedIn){
        return (
            <div>Please login to continue</div>
        )
    }

    if (loading){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <Container className='big-container'>
            <Container className='shadow-container'>
                <Header as ="h1" className="new-post-header">Accound Preferences</Header>
                <Form onSubmit={handleFormSubmit}>
                {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                    <Form.Group widths='equal' data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                        <Header as ="h2" className="new-post-header">Account Info</Header>

                        <Form.Input fluid label="Profile Image" name="image" placeholder="Image URL (You can use right click - image adress)" required onChange={handleContentChange} value={userFormData.image}/>
                        <Form.Input fluid label = "User Description" name="description" placeholder="Description" required onChange={handleContentChange} value={userFormData.description}/>

                        <Header>What topics are you interested in?</Header>
                        {/*<TagSearch> </TagSearch>*/}
                                
                        <Button
                            type='submit'
                            variant='success'>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </Container>
    )
}

export default AccountPreferences;