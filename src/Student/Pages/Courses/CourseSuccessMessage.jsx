import Confetti from 'react-confetti';
import { useHistory } from 'react-router-dom';
import ResultStar from '../../../assets/media/quiz-result-star.png';
import { Button } from '../../../stories/Button';
import succesImg from "../../../assets/media/success1.jpeg";

const CourseSuccessMessage = () => {
    const history = useHistory();
    return (
        <div className="container new-result">
            <Confetti className="w-100" />
            <div className="row justify-content-md-center ">
                <div className="col col-lg-9">
                    <div className="results-heading">
                        <img src={ResultStar} alt="star" />
                    </div>
                    <div className="congratulations text-center">
                        <div className="success_img text-center w-100">
                            <img src={succesImg} alt=".." /><br />
                        </div>
                        Course Completed Successfully!
                    </div>
                    <div className='d-sm-flex justify-content-center mb-3 text-center'>
                        <Button
                            label="Go to Idea Submission"
                            btnClass="primary mt-4 mx-2"
                            size="small"
                            onClick={() =>
                                history.push("/challenges")
                            }
                        />

                        <Button
                            label="Go to My Certificate"
                            btnClass="primary mt-4 mx-2"
                            size="small"
                            onClick={() =>
                                history.push("/student/my-certificate")
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSuccessMessage;
