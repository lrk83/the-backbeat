import React, {useState, useEffect} from "react";
import { Container, Form, Label, Button, Header, Menu } from "semantic-ui-react";
import Auth from '../../utils/auth';
import MenuTabular from '../../components/Menus/MenuTabularNewSkill';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery, useMutation } from '@apollo/client';
import {GET_TAGS} from '../../utils/queries';
import {ADD_SKILL} from '../../utils/mutation';
import TagSearch from "../../components/Account-page-components/tags-search";

const NewSkillPost = () => {
    const loggedIn = Auth.loggedIn();

    const sections=["post-content","text","tags"]

    const [section, updateSection] = useState(sections[0]);
    const [contentData, setContentFormData] = useState({name:"",image:"",description:"",text:"",links:[]});
    const [submissionData, setSubmissionData] = useState({})
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const {loading, data} = useQuery(GET_TAGS);
    const tags = data?.tags || {};

    const [chosenTags, setChosenTags]=useState([]);

    const [createSkill, {error}] = useMutation(ADD_SKILL)

    //Handle which form sections are disabled
    const handleFirstFormSubmit = (event) => {
        event.preventDefault();
        updateSection(sections[1]);
    };

    const handleSecondFormSubmit = (event) => {
        event.preventDefault();
        updateSection(sections[2]);
    };

    const handleThirdFormSubmit = (event) => {
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

    const textBackButton = (event) => {
        event.preventDefault();
        if (section==="back-to-text"){
            updateSection("back-to-back")
        } else{
        updateSection("back-to-basics")
        };
    }

    const tagsBackButton = (event) => {
        event.preventDefault();
        updateSection("back-to-text");
    }

    const sendToBackEnd = async () => {
        setReadyToSubmit(false);
        
        try {
            console.log(submissionData);
            const { data } = await createSkill({
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
                            {section==="post-content" || section==="back-to-basics"  || section==="back-to-back" ? (<>
                                <Form.Input fluid label="Name" name="name" placeholder="Name" required onChange={handleContentChange}/>
                                <Form.Input fluid label="Image" name="image" placeholder="Image URL" required onChange={handleContentChange}/>
                                <Form.Input fluid label = "Description" name="description" placeholder="Description" required onChange={handleContentChange}/>
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
                    {section==="text" || section==="tags" || section==="back-to-basics" || section==="back-to-text" || section==="back-to-back" ? (
                         <Form onSubmit={handleSecondFormSubmit} data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                         <Header as ="h2" className="new-post-header">Text</Header>
                         {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                             <Form.Group widths='equal'>
                                 {section==="text" || section==="back-to-text" ? (<>
                                     <Form.TextArea name="text" placeholder="post text" required onChange={handleContentChange}/>
                                     <Button
                                        onClick={textBackButton}>
                                        Back
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant='success'>
                                        Next
                                    </Button>
                                 </>):(<>
                                    <Form.TextArea name="text" text={contentData.text} disabled/>
                                    <Button
                                        disabled>
                                        Back
                                    </Button>
                                    <Button
                                        disabled
                                        type='submit'
                                        variant='success'>
                                        Next
                                    </Button>
                                 
                                 </>)}
                                 <Form.Field></Form.Field>
                             </Form.Group>
                             
                         </Form>
                    ) : (<></>)}
                    {section==="tags" || section==="back-to-text" || section==="back-to-back" ? (
                         <Form onSubmit={handleThirdFormSubmit} data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                         <Header as ="h2" className="new-post-header">Tags</Header>
                         {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                             {section==="tags" ? ( <>
                             <TagSearch tags={tags} chosenTags={chosenTags} setChosenTags={setChosenTags} contentData={contentData} setContentFormData={setContentFormData}/>
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
                                <TagSearch tags={tags} chosenTags={chosenTags} setChosenTags={setChosenTags}/>
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

export default NewSkillPost;