import { Fragment } from 'react';
import { Card, Container } from 'reactstrap';
import Congo from '../assets/media/survey-success.jpg';
import IdeaSuccessImg from '../assets/media/idea-success.jpg';
import { Button } from '../stories/Button';

const CommonPage = ({text, showButton, showChallenges}) => {
    return (
        <Container className="presuervey mb-50 mt-5 ">
            <Fragment>
                <Card className="course-sec-basic p-5">
                    <div className="text-center">
                        <div>
                            <img className={`${showButton?'w-50':'w-25'} img-fluid `} src={showButton?IdeaSuccessImg:Congo}></img>
                        </div>
                        <div>
                            <h2 className="common-flex">
                                {text ? text : 'Coming Soon...'}
                            </h2>
                        </div>
                    </div>
                    {showButton &&
                        <Button
                            type="button"
                            btnClass="primary w-25 mx-auto mt-3"
                            onClick={()=>showChallenges()}
                            size="small"
                            label="View Idea"
                        />

                    }
                </Card>
            </Fragment>
        </Container>
    );
};

export default CommonPage;
