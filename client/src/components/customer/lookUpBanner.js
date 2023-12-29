import { Container, Row, Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image';

/**
 * React component for a banner used in lookup pages.
 *
 * This component displays a banner with a title and an image.
 *
 * @param {Object} props - The properties passed to the LookUpBanner component.
 * @param {string} props.title - The title to be displayed on the banner.
 * 
 * @returns {JSX.Element} - The rendered React element for the LookUpBanner component.
 */
export default function LookUpBanner({ title }) {
    return (
        <Container className="lookUpBanner">
            <Row>
                <Col md={5} xl={6} xxl={5} className="itemBanner">
                    <h1>{title}</h1>
                </Col>
                <Col md={7} xl={6} xxl={7} className="itemBanner">
                    <Image src="/look-up-banner.png" className="w-75"></Image>
                </Col>
            </Row>
        </Container>
    );
}