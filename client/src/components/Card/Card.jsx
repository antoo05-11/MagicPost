import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import { CardData } from "./CardData";
import style from '@/css/components/card.module.css';

export default function Card() {
    return (
        <div className={style.cards}>
            {CardData.map((card, id) => (
                <Container fluid className={style.container} key={id}>
                    <Row className={style.row}>
                        <Col className={style.iconCol} xs={4} >
                            <div className={style.iconWrapper} style={{ backgroundColor: card.background }}>
                                {card.icon}
                            </div>
                        </Col>
                        <Col className={style.textContainer} xs={7}>
                            <p className={style.cardTitle}>{card.title}</p>
                            <h3 className={style.cardData}>{card.data}</h3>
                            <p className={style.cardSubTitle}>{card.subTitle}</p>
                        </Col>
                    </Row>
                </Container>
            ))}
        </div>
    );
}
