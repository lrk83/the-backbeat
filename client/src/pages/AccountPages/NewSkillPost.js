import React, {useState} from "react";
import { Container } from "semantic-ui-react";

const NewSoundPost = () => {

    const sections=["post-type","post-content","tags"]

    const [section, updateSection] = useState(sections[0]);

    const [typeData, setTypeData] = useState("");

    return(
        <Container>

        </Container>
    )
};

export default NewSoundPost;