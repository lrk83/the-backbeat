import React, {useEffect, useState} from "react";
import { Container,Card, Image, Header, Button} from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER } from "../../utils/mutation";

const SingleSound = (data) => {

    const loggedIn = Auth.loggedIn();

    const userData = data?.data || {};

    const [followUser] = useMutation(FOLLOW_USER);

    const [userIsSaved, setUserIsSaved] = useState(false);

    if (loggedIn){
        var loggedInUserData = Auth.getProfile();

        var IAmUser = (loggedInUserData.data._id===userData._id);
    }

    const saveUser = async () => {
        await followUser(
            {variables: {userId: userData._id}}
        )
    };
    
    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    useEffect(()=>{
        if(userData.followers){
            if (loggedIn){
                if (!IAmUser){
                    for(let x=0;x<userData.followers.length;x=x+1){
                        if (loggedInUserData.data._id===userData.followers[x]._id){
                            setUserIsSaved(true);
                        }
                    }
                }
            }
        }
    },[userData.followers,loggedInUserData.data._id])

    return(
        <Container className="user-profile-data">
            <Card className="single-post-card">
                <Image src={userData.image} wrapped ui={false} />
            </Card>
            <Container className="single-post-content">
                <Header as='h1' className="single-header">My Info</Header>
                {loggedIn && ( <>
                    {IAmUser? ( <> <Button color="blue" className="get-pack-button">Edit Profile</Button> </> ):( <> 
                        {userIsSaved? ( <>
                            <Button color="blue" disabled className="get-pack-button">Followed</Button>
                        </> ):( <>
                            <Button className="get-pack-button" onClick={saveUser}>Follow User</Button>
                        </>)}
                    </>)}
                </> ) }
                <Card>
                    <Header></Header>
                </Card>
            </Container>
        </Container>
    )
}

export default SingleSound;