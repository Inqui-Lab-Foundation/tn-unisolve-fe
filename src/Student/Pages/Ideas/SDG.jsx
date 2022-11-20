import React, { useState } from 'react';
import './style.scss';
import Layout from '../../Layout.jsx';
import { Card, Col, Container, Row } from 'reactstrap';
import { getCurrentUser } from '../../../helpers/Utils';
import { useTranslation } from 'react-i18next';
import CommonPage from '../../../components/CommonPage';

const SDG = () => {
    const currentUser = getCurrentUser('current_user');
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(null);
    console.log(currentUser);
    console.log(data);
    console.log(index);
    const comingSoonText = t('dummytext.student_idea_sub');
    const [showPage, setshowPage] = useState(true);
    console.log(setshowPage);
    const handleDesc = (data,i)=>{
        setData(data);
        setIndex(i);
    };
    return (
        <Layout>
            {showPage ? (
                <CommonPage text={comingSoonText} />
            ) : (
                <Container className="mb-50 mt-5 ">
                    <h2>Sustainable Development Goals</h2>
                    <hr />
                    <Row>
                        <Col>
                            <Card style={{height:"250px"}} onMouseEnter={()=>handleDesc("hi",1)} onMouseLeave={()=>handleDesc(null,null)} >hi</Card>
                        </Col>
                        <Col>
                            <Card>hi</Card>
                        </Col>
                        <Col>
                            <Card>hi</Card>
                        </Col>
                        <Col>
                            <Card>hi</Card>
                        </Col>
                        <Col>
                            <Card>hi</Card>
                        </Col>
                        <Col>
                            <Card>hi</Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </Layout>
    );
};

export default SDG;
