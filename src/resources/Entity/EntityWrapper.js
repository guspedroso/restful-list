import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Entity.css';

class EntityWrapper extends PureComponent {
    render() {
        const { children } = this.props;

        return (
            !children ? null :
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        { children }
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default EntityWrapper;
