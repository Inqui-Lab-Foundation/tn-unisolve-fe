import { Col } from 'reactstrap';
import counter from '../../../assets/media/img/counter.png';

const DashboardOverviewCard = ({ title, count, image }) => {
    return (
        <Col lg={3} md={4} sm={6} className="mb-3">
            <div className={`${title?.toLowerCase()==='completed videos'?'border-yellow':(title?.toLowerCase()==='completed quiz'|| title?.toLowerCase()==='completed worksheets')?'border-green':'border-blue'} d-flex overview-card bg-white p-3 shadow`}>
                <div
                    className="d-flex  flex-column justify-content-center align-items-center"
                    style={{ flex: 2 }}
                >
                    <p className="title">{title}</p>
                    <p className={`${title?.toLowerCase()==='completed videos'?'text-yellow':(title?.toLowerCase()==='completed quiz'|| title?.toLowerCase()==='completed worksheets')?'text-green':'text-blue'} count mt-3`}>
                        {count}
                    </p>
                </div>
                <div style={{ width: '8rem',position:"relative" }}>
                    <img src={counter} alt="card" style={{position:"absolute",bottom:"-11%",left:"7px", borderRadius:"2rem"}} className="bg-white"/>
                    <img src={image} alt="card" style={{position:"absolute",bottom:"-8%",left:"20px",width:"80%"}}/>
                </div>
            </div>
        </Col>
    );
};

export default DashboardOverviewCard;