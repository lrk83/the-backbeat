import React from "react";
import { Container, Icon } from "semantic-ui-react";

const Footer = () => {
    return(
        <Container id="footer">
            <div className="text">
                Made with Love
            </div>
            <div className="icons">
                <Icon inverted name="github" src="https://github.com/lrk83" />
                <Icon inverted name="youtube" src="https://www.youtube.com/channel/UC8U0XY-hO52WWZgOkIW8aWg"/>
            </div>
        </Container>
    )
}

export default Footer;