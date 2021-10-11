//Have user choose profile picture, choose tags they are interested in, write a short description about themselves
import React, {useState, useEffect} from "react";
import { Container, Form, Label, Button, Header, Image} from "semantic-ui-react";
import TagSearch from "../../components/Account-page-components/preference-page-tag-search";
import { useMutation } from "@apollo/client";
import {UPDATE_USER} from '../../utils/mutation';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AccountPreferences = (props) => {
    const {tags,userData} = props

    const [submitUserData] = useMutation(UPDATE_USER);

    const [userFormData, setUserFormData] = useState({ image: userData.image, description: userData.description, followedTags: userData.followedTags});
    const [showAlert, setShowAlert] = useState(false);
    const [showSucess, setShowSuccess] = useState(false);

    const handleContentChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let localStorageItem=JSON.parse(localStorage.getItem("preferenceTags"))

        var tagIds=[];
        for(let x=0;x<localStorageItem.length;x++){
            let tagId=localStorageItem[x].id;
            tagIds.push(tagId);
        }

        try { 
            
            const submitElemnt = await submitUserData ({
            variables: {image: userFormData.image, description: userFormData.description, followedTags: tagIds} 
            });

            console.log(submitElemnt);
            
            setShowSuccess(true);
        }catch (err) {
            console.error(err);
            setShowAlert(true);
          }
    }

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });


    return (
            <Container className='shadow-container'>
                <Header as ="h1" className="new-post-header">Account Preferences</Header>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group widths='equal' data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                        <Header as ="h2" className="new-post-header">Account Info</Header>

                        <Form.Input fluid label="Profile Image" name="image" required onChange={handleContentChange} value={userFormData.image}/>
                        <Header as="h3" className="new-post-header" id="image-preview-header">Preview</Header>
                        <Image size="small" id="image-preview" src={userFormData.image} data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500"/>
                        <Form.Input fluid label = "User Description" name="description" required onChange={handleContentChange} value={userFormData.description}/>

                        <Header>What topics are you interested in?</Header>
                        <TagSearch tags={tags} />

                        <Button
                            type='submit'
                            variant='success'>
                            Submit
                        </Button>
                    </Form.Group>
                    {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                {showSucess && (<Label basic color="green">Succesfully updated!</Label>)}
                </Form>
            </Container>
    )
}

export default AccountPreferences;