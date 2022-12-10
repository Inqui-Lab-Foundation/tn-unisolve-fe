/* eslint-disable indent */
import React from 'react';
import { Button } from '../../stories/Button';
import RangeSlider from './RangeSlider';

const LinkComponent = ({ item }) => {
    return (
        <>
            {item &&
                item.length > 0 &&
                item.map((ans, i) => {
                    let a_link = ans.split('/');
                    let count = a_link.length - 1;
                    return (
                        <a
                            key={i}
                            className="badge mb-2 bg-info p-3 ms-3"
                            href={ans}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {a_link[count]}
                        </a>
                    );
                })}
        </>
    );
};

const IdeaDetail = (props) => {
    const [teamResponse, setTeamResponse] = React.useState([]);
    const [novelityScore, setNovelityScore] = React.useState(0);
    const [usefulnessScore, setUsefulnessScore] = React.useState(0);
    const [feasabilityScore, setFeasabilityScore] = React.useState(0);
    const [scalabilityScore, setScalabilityScore] = React.useState(0);
    const [affordabilityScore, setAffordabilityScore] = React.useState(0);

    React.useEffect(() => {
        if (props?.ideaDetails?.response) {
            setTeamResponse(
                Object.entries(props?.ideaDetails?.response).map((e) => e[1])
            );
        }
    }, [props]);

    return (
        <>
            <div className="row idea_detail_card">
            <div className="col-12 p-0">
                <div className="row">
                    <div className="col-sm-8 p-0">
                        <h2 className="mb-md-4 mb-3">
                            Idea Name:{' '}
                            <span className="text-capitalize fs-3">
                                {props?.ideaDetails?.sdg?.toLowerCase() || ''}
                            </span>
                        </h2>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
                    <div className="ms-auto me-sm-3 p-0">
                        <Button
                            btnClass="primary"
                            size="small"
                            label={props?.skipButtonText}
                            onClick={() =>
                                props?.handleSkip(Number(props?.currentRow))
                            }
                        />
                </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-8 order-lg-0 order-1 p-0 h-100">
                {teamResponse?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                        >
                            <div className="question quiz mb-0">
                                <b
                                    style={{
                                        fontSize: '1.6rem'
                                    }}
                                >
                                    {item?.question_no || ''}.{' '}
                                    {item?.question || ''}
                                </b>
                            </div>
                            <div className="bg-light rounded p-5">
                                <p
                                    style={{
                                        fontSize: '1.4rem'
                                    }}
                                >
                                   
                                    {item?.question_type === 'MCQ' ? (
                                        item?.selected_option?.map(
                                            (data, i) => {
                                                return (
                                                    <div key={i}>
                                                        {data || ''}
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : item?.question_type === 'TEXT' ||
                                      item?.question_type === 'MRQ' ? (
                                        item?.selected_option
                                    ) : item?.question_type === 'DRAW' ? (
                                        <LinkComponent
                                            item={item.selected_option}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div className="d-md-flex">
                    <Button
                        btnClass="primary m-md-0 mb-3"
                        size="small"
                        label="Back to List"
                        onClick={() => {
                            props?.setIsIdeaDetail(false);
                        }}
                    />
                    <div className="d-flex ms-auto">
                        <button
                            className="btn btn-lg px-5 py-2 btn-success me-3 rounded-pill"
                            data-bs-dismiss="modal"
                            // onClick={() => {}}
                        >
                            <span className="fs-4">Accept</span>
                        </button>
                        <button
                            className="btn btn-lg px-5 py-2 btn-danger me-3 rounded-pill"
                            data-bs-dismiss="modal"
                            // onClick={() => {}}
                        >
                            <span className="fs-4">Reject</span>
                        </button>
                    </div>
                </div>
                
            </div>
            <div className="col-lg-4 order-lg-1 order-0 p-0 h-100 mt-3">
                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                    L1 Status & TimeStamp
                </div>
                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                    L2 Status & TimeStamp
                </div>
                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                    Final Status & TimeStamp
                </div>
            </div>
        </div>

        {/* //-----------Rating section---- */}
        <div className='rating_card mt-md-5 mt-4 card p-md-5 p-3'>
            <h2 className='mb-3'>Idea Scoring</h2>
        <div className="row">
            <div className="col-lg-4 col-md-6 mb-5">
                <div className="for-novelity px-3">
                <label htmlFor="novelity" className="form-label">Novelity score -{' '} <span className={novelityScore==0?'text-muted fs-2':'fs-2'}>{novelityScore}</span></label>
                    <RangeSlider 
                        name='novelity'
                        setScore={setNovelityScore} 
                    />
                </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
                <div className="for-usefulness px-3">
                <label htmlFor="usefulness" className="form-label">Usefulness score -{' '}<span className={usefulnessScore==0?'text-muted fs-2':'fs-2'}>{usefulnessScore}</span></label>
                    <RangeSlider 
                        name='usefulness'
                        setScore={setUsefulnessScore} 
                    />
                </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
                <div className="for-feasability px-3">
                <label htmlFor="feasability" className="form-label">Feasability score -{' '}<span className={feasabilityScore==0?'text-muted fs-2':'fs-2'}>{feasabilityScore}</span></label>
                    <RangeSlider 
                        name='feasability'
                        setScore={setFeasabilityScore} 
                    />
                </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
                <div className="for-scalability px-3">
                <label htmlFor="scalability" className="form-label">Scalability score -{' '}<span className={scalabilityScore==0?'text-muted fs-2':'fs-2'}>{scalabilityScore}</span></label>
                    <RangeSlider 
                        name='scalability'
                        setScore={setScalabilityScore} 
                    />
                </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
                <div className="for-affordability px-3">
                <label htmlFor="affordability" className="form-label">Affordability score -{' '}<span className={affordabilityScore==0?'text-muted fs-2':'fs-2'}>{affordabilityScore}</span></label>
                    <RangeSlider 
                        name='affordability'
                        setScore={setAffordabilityScore} 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-5 ps-4">
                    <label htmlFor="floatingTextarea">Comments</label>
                    <div className="form-floating">
                        <textarea className="form-control fs-4 lh-sm" maxLength={500} placeholder="Leave a comment here" id="ComentTextarea" style={{height: '10rem'}}></textarea>
                        
                    </div>
                </div>
            </div>
            <div className="col-12 d-flex justify-content-end">
               <div className='me-3'>
                <Button
                            btnClass="secondary"
                            size="small"
                            label="Back to List"
                            onClick={() => {
                                props?.setIsIdeaDetail(false);
                            }}
                        />
               </div>
                <Button
                        btnClass="primary"
                        size="small"
                        label="Update Score"
                        onClick={() => {
                            props?.setIsIdeaDetail(false);
                        }}
                    />
            </div>
        </div>
        </div>
        </>
    );
};

export default IdeaDetail;
