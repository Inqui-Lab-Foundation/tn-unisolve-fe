import { Col } from 'reactstrap';
import "./TopSectionCrad.scss";

const TopSectionCard = ({
    heading,
    deadline,
    footerText,
    subHeading,
    teamImages,
    rightImage,
    footerLabels,
    name,
    email,
    position,
    type,
    mentorData,
    organiZation,
}) => {
    return (
        <Col lg={4} md={6} sm={12} className="top_section_card dashboard--top--card">
            <h2 className={`${ position===1?'text-green':(position===2 && type !== 'teacher')?'text-yellow':position===3|| (position===2 && type === 'teacher')?'text-blue':'text-red'} ps-2`}>
                {heading}
            </h2>
            <div className="card_container bg-white d-flex rounded p-3">
                <img
                    src={rightImage}
                    alt="card"
                    className={`${ position===1?'bg-green':(position===2 && type !== 'teacher')?'bg-yellow':position===3|| (position===2 && type === 'teacher')?'bg-blue':'bg-red'} img-fluid w-30 h-30 card-right my-auto rounded_card shadow`}
                />
                {position === 1 ? (
                    <div className="card-left d-flex align-items-center ps-4">
                        {/* <p className="dead-line">
                            <span className="text-muted">DEADLINE</span> :{' '}
                            <span>{deadline},</span>
                        </p>
                        <p className="sub-heading">{subHeading}</p>
                        <div className="dashboard-card-footer">
                            <p className="text-muted small">{footerText}</p>
                            <div className="d-flex">
                                {teamImages &&
                                    teamImages.map((item, i) => (
                                        <img
                                            key={i}
                                            src={item}
                                            alt={item + i}
                                            className="img-fluid"
                                        />
                                    ))}
                            </div>
                        </div> */}
                        <h5 style={{fontSize:"2rem", fontWeight: '600'}}>All the best for your journey</h5>
                    </div>
                ) : position === 2 ? (
                    <div className="card-left d-flex align-items-center ps-4">
                        <div>
                            <div className="d-flex align-items-center">
                                {/* <img
                                    src={rightImage}
                                    alt="card"
                                    className="img-fluid w-30"
                                /> */}
                                {type !== 'teacher' ? (
                                    <div className="d-flex flex-column">
                                        <p className="sub-heading text-capitalize">Welcome {name} !</p>
                                        {/* <p>UDISE:{mentorData?.organization_code}</p> */}
                                        <p className="small">{email}</p>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column">
                                        <p className="sub-heading">{mentorData?.full_name}</p>
                                        <p className="sub-heading">{organiZation?.organization_name}</p>
                                        <p>{organiZation?.state}</p>
                                        <p className="small">{organiZation?.city},{organiZation?.district} </p>
                                    </div>
                                )}
                            </div>
                            <div className="dashboard-card-footer">
                                {type !== 'teacher' && (
                                    <p className="badges">
                                        <span>{footerLabels.heading}</span> :{' '}
                                        <span>{footerLabels.value}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card-left d-flex align-items-center ps-4">
                        <p className="dead-line">
                            <span className="text-muted">DEADLINE</span> :{' '}
                            <span>{deadline},</span>
                        </p>
                        <p className="sub-heading">{subHeading}</p>
                        <div className="dashboard-card-footer">
                            <p className="text-muted small">{footerText}</p>
                            <div className="d-flex">sfffs
                                {teamImages.map((item, i) => (
                                    <img
                                        key={i}
                                        src={item}
                                        alt={item + i}
                                        className="img-fluid"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
               
            </div>
        </Col>
    );
};

export default TopSectionCard;
