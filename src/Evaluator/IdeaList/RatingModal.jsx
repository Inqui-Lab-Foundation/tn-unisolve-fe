/* eslint-disable indent */
import React from 'react';
import { Modal } from 'react-bootstrap';

const RatingModal = (props) => {
    const [novelityScore, setNovelityScore] = React.useState(0);
    const [usefulnessScore, setUsefulnessScore] = React.useState(0);
    const [feasabilityScore, setFeasabilityScore] = React.useState(0);
    const [scalabilityScore, setScalabilityScore] = React.useState(0);
    const [affordabilityScore, setAffordabilityScore] = React.useState(0);
    const handleClose = () => {
        props.setShow(false);
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="assign-evaluator ChangePSWModal teacher-register-modal"
            backdrop="static"
            scrollable={true}
        >
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="w-100 d-block text-center"
                >
                    Idea Scoring
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 my-3">
                        <label htmlFor="novelity" className="form-label mb-3">
                            1. Novelity score -{' '}
                            <span
                                className={
                                    novelityScore < 1
                                        ? 'fs-2 text-danger'
                                        : novelityScore < 3
                                        ? 'fs-2 text-primary'
                                        : novelityScore >2 
                                        ? 'fs-2 text-success'
                                        : 'fs-2'
                                }
                            >
                                {novelityScore}
                            </span>
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={5}
                            defaultValue={0}
                            id="novelity"
                            onChange={(e) => setNovelityScore(e.target.value)}
                        ></input>
                        <p className="text-muted fs-4">
                            Scoring: 1 - Not Novel || 3 - Inspired || 5-Novel
                        </p>
                    </div>
                    <div className="col-12 my-3">
                        <label htmlFor="usefulness" className="form-label mb-3">
                            2. Usefulness score -{' '}
                            <span
                                className={
                                    usefulnessScore < 1
                                        ? 'fs-2 text-danger'
                                        : usefulnessScore < 3
                                        ? 'fs-2 text-primary'
                                        : usefulnessScore >2 
                                        ? 'fs-2 text-success'
                                        : 'fs-2'
                                }
                            >
                                {usefulnessScore}
                            </span>
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={5}
                            defaultValue={0}
                            id="usefulness"
                            onChange={(e) => setUsefulnessScore(e.target.value)}
                        ></input>
                        <p className="text-muted fs-4">
                            Scoring: 1 - Does not solve || 3 - Somewhat Solved
                            || 5 - Solved Well
                        </p>
                    </div>
                    <div className="col-12 my-3">
                        <label
                            htmlFor="feasabilityscore"
                            className="form-label mb-3"
                        >
                            3. Feasability Score -{' '}
                            <span
                                className={
                                    feasabilityScore < 1
                                        ? 'fs-2 text-danger'
                                        : feasabilityScore < 3
                                        ? 'fs-2 text-primary'
                                        : feasabilityScore >2 
                                        ? 'fs-2 text-success'
                                        : 'fs-2'
                                }
                            >
                                {feasabilityScore}
                            </span>
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={5}
                            defaultValue={0}
                            id="feasabilityscore"
                            onChange={(e) =>
                                setFeasabilityScore(e.target.value)
                            }
                        ></input>
                        <p className="text-muted fs-4">
                            Scoring: 1 - Not Feasible || 3 - Somewhat || 5 -
                            Very Feasible
                        </p>
                    </div>
                    <div className="col-12 my-3">
                        <label
                            htmlFor="scalabilityscore"
                            className="form-label mb-3"
                        >
                            4. Scalability Score -{' '}
                            <span
                                className={
                                    scalabilityScore < 1
                                        ? 'fs-2 text-danger'
                                        : scalabilityScore < 3
                                        ? 'fs-2 text-primary'
                                        : scalabilityScore >2 
                                        ? 'fs-2 text-success'
                                        : 'fs-2'
                                }
                            >
                                {scalabilityScore}
                            </span>
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={5}
                            defaultValue={0}
                            id="scalabilityscore"
                            onChange={(e) =>
                                setScalabilityScore(e.target.value)
                            }
                        ></input>
                        <p className="text-muted fs-4">
                            Scoring: 1 - Not Scalable || 3 - Somewhat || 5 -
                            Very Scalable
                        </p>
                    </div>
                    <div className="col-12 my-3">
                        <label
                            htmlFor="affordabilityscore"
                            className="form-label mb-3"
                        >
                            5. Affordability Score -{' '}
                            <span
                                className={
                                    affordabilityScore < 1
                                        ? 'fs-2 text-danger'
                                        : affordabilityScore < 3
                                        ? 'fs-2 text-primary'
                                        : affordabilityScore >2 
                                        ? 'fs-2 text-success'
                                        : 'fs-2'
                                }
                            >
                                {affordabilityScore}
                            </span>
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={5}
                            defaultValue={0}
                            id="affordabilityscore"
                            onChange={(e) =>
                                setAffordabilityScore(e.target.value)
                            }
                        ></input>
                        <p className="text-muted fs-4">
                            Scoring: 1 - Can not Make || 3 - Somewhat Affordable
                            || 5 - Very Affordable
                        </p>
                    </div>
                    <div className="col-12 my-3">
                        <label htmlFor="floatingTextarea">Comments</label>
                        <div className="form-floating">
                            <textarea className="form-control fs-4 lh-sm" maxLength={500} placeholder="Leave a comment here" id="ComentTextarea" style={{height: '10rem'}}></textarea>
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <button className='btn btn-lg py-3 px-4 btn-success rounded'>
                            <span className='fs-4'>Update Score</span>
                        </button>
                    </div>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    );
};

export default RatingModal;
