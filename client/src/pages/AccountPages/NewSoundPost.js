import React, {useState, useEffect} from "react";
import { Container, Form, Label, Button, Header, Menu } from "semantic-ui-react";
import Auth from '../../utils/auth';
import MenuTabular from '../../components/Menus/MenuTabularNewSound';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useMutation, useQuery } from '@apollo/client';
import {GET_TAGS} from '../../utils/queries';
import {ADD_SOUND} from '../../utils/mutation';
import TagSearch from "../../components/Account-page-components/tags-search";

const NewSoundPost = () => {
    const loggedIn = Auth.loggedIn();

    const sections=["post-content","tags"]

    const [section, updateSection] = useState(sections[0]);
    const [contentData, setContentFormData] = useState({name:"",artist:"",image:"",description:"",link:""});
    const [submissionData, setSubmissionData] = useState({})
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const {loading, data} = useQuery(GET_TAGS);
    const tags = data?.tags || {};

    const [chosenTags, setChosenTags]=useState([]);

    const [createSound, {error}] = useMutation(ADD_SOUND)

    //Handle which form sections are disabled
    const handleFirstFormSubmit = (event) => {
        event.preventDefault();
        updateSection(sections[1]);
    };

    const handleSecondFormSubmit = async (event) => {
        event.preventDefault();
        
        const tagsToAdd = [];
        const aditionalTagsToAdd = [];
        for(let x=0;x<chosenTags.length;x=x+1){
            
            if (x<3){
                const tagToAdd=chosenTags[x].id;
                tagsToAdd.push(tagToAdd);
            } else{
                const chosenTagToAdd = chosenTags[x].id;
                aditionalTagsToAdd.push(chosenTagToAdd);
            }
        };

        setSubmissionData({
            ...contentData,
            tags:tagsToAdd,
            aditionalTags:aditionalTagsToAdd
        });

        //Set up submission
        setReadyToSubmit(true);
    };

    const handleContentChange = (event) => {
        const { name, value } = event.target;
        setContentFormData({ ...contentData, [name]: value });
    };

    const tagsBackButton = (event) => {
        event.preventDefault();
        updateSection("back-to-basics");
    }

    const sendToBackEnd = async () => {
        setReadyToSubmit(false);
        
        try {
            console.log(submissionData);
            const { data } = await createSound({
                variables: {postData: {...submissionData}}
            });
        } catch (err) {
            console.log(err);
            setShowAlert(true);
        }
    }

    //Fade in elements
    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    useEffect(() => {
        if (readyToSubmit){
            sendToBackEnd();
        }
    });

    if (!loggedIn) {
        return (
            <div>Please log in to continue</div>
        )
    };

    return(
        <Container className='big-container'>
            {loggedIn && (
                <Container className='shadow-container'>
                <Header as ="h1" className="new-post-header">New Post</Header>

                <MenuTabular choice='skill'></MenuTabular>
                    <Form onSubmit={handleFirstFormSubmit}>
                    {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                        <Form.Group widths='equal' data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                            <Header as ="h2" className="new-post-header">Basic Info</Header>
                            {section==="post-content" || section==="back-to-basics" ? (<>
                                <Form.Input fluid label="Name" name="name" placeholder="Name" required onChange={handleContentChange}/>
                                <Form.Input fluid label="Image" name="image" placeholder="Image URL" required onChange={handleContentChange}/>
                                <Form.Input fluid label = "Description" name="description" placeholder="Description" required onChange={handleContentChange}/>
                                <Form.Input fluid label = "Artist" name="artist" placeholder="Artist" required onChange={handleContentChange}/>
                                <Form.Input fluid label = "Link" name="link" placeholder="Link" required onChange={handleContentChange}/>
                                <Button
                                    type='submit'
                                    variant='success'>
                                    Next
                                </Button>
                            </>):(<>
                                <Form.Input fluid label="Name" disabled/>
                                <Form.Input fluid label="Image" disabled/>
                                <Form.Input fluid label = "Description" disabled/>
                                <Button
                                    type='submit'
                                    disabled
                                    variant='success'>
                                    Next
                                </Button>
                            </>)}
                        </Form.Group>
                    </Form>
                    {section==="tags" || section==="back-to-basics" ? (
                         <Form onSubmit={handleSecondFormSubmit} data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                         <Header as ="h2" className="new-post-header">Tags</Header>
                         {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                             {section==="tags" ? ( <>
                             <TagSearch tags={tags} chosenTags={chosenTags} setChosenTags={setChosenTags}/>
                             <Container className='chosen-tags-container'>
                                {chosenTags.map(item=> (
                                    <div className="chosen-tag" key={item.id} >
                                    {item.title}</div>
                                ))} 
                             </Container >

                             <Button
                                 onClick={tagsBackButton}>
                                 Back
                             </Button>
                             
                             <Button
                                 type='submit'
                                 variant='success'>
                                Submit
                             </Button> </> ):(<>
                                <TagSearch contentData={contentData} setContentFormData={setContentFormData}tags={tags} chosenTags={chosenTags} setChosenTags={setChosenTags}/>
                             <Container className='chosen-tags-container'>
                                {chosenTags.map(item=> (
                                    <div className="chosen-tag" key={item.id} >
                                    {item.title}</div>
                                ))} 
                             </Container >

                             <Button
                             disabled
                                 onClick={tagsBackButton}>
                                 Back
                             </Button>
                             
                             <Button
                             disabled
                                 type='submit'
                                 variant='success'>
                                Submit
                             </Button>
                             
                             </>)}
                         </Form>
                    ) : (<></>)}
                </Container> ) }
    </Container>
    )
};

export default NewSoundPost;