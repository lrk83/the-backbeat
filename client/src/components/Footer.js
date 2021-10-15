import React from "react";
import { Container, Icon } from "semantic-ui-react";

const Footer = () => {
    return(
        <Container id="footer">
            <div className="text">
                Made with Love
            </div>
            <div className="icons">
                <a href="https://github.com/lrk83"><Icon inverted name="github"/></a>
                <a href="https://www.youtube.com/channel/UC8U0XY-hO52WWZgOkIW8aWg"><Icon inverted name="youtube"/></a>
            </div>
        </Container>
    )
}

export default Footer;