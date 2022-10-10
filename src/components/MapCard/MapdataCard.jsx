import { Card, CardBody } from 'reactstrap';
// import SingleMapdataCard from './SingleMapdataCard';
import institutions from "../../assets/media/img/university.png";
import idea from "../../assets/media/img/idea.png";
import people from "../../assets/media/img/people.png";

const MapdataCard = ({ values }) => {
    return (
        <>
            {values?.district_name ? (
                <div className="d-flex flex-column">
                    <Card className="card text-dark bg-light mb-3">
                        <CardBody>
                            <h2 className="">{values?.district_name}</h2>
                        </CardBody>
                    </Card>
                    <div className="mb-5 d-flex align-items-center ">
                        <img src={people} alt="teams" className='mx-4' />
                        <div>
                            <h4>{values?.teams ? values?.teams : '-'}</h4>
                            <small className="blue">STUDENT TEAMS</small>
                        </div>
                    </div>
                    <div className="mb-5 d-flex align-items-center">
                        <img src={institutions} alt="institutions" className=' mx-4'/>
                        <div>
                            <h4>
                                {!values?.overall_schools
                                    ? '-'
                                    : `${values?.teams} of ${values?.overall_schools}`}
                            </h4>
                            <small className="blue">INSTITUTIONS</small>
                        </div>
                    </div>
                    <div className="mb-5 d-flex align-items-center">
                        <img src={idea} alt="idea" className=' mx-4' />
                        <div>
                            <h4>{!values.ideas ? 0 : values.ideas}</h4>
                            <small className="blue">IDEAS</small>
                        </div>
                    </div>
                </div>
            ) : (
                'No Data'
            )}
        </>
    );
};

export default MapdataCard;
