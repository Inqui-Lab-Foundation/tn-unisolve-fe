/* eslint-disable indent */
import React from 'react';
import { Button } from '../../stories/Button';
import RangeSlider from './RangeSlider';
import LinkComponent from './LinkComponent';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getSubmittedIdeaList } from '../store/evaluator/action';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const IdeaDetail = (props) => {
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const ratingParams=['novelity', 'usefulness', 'feasability', 'scalability', 'affordability'];
    const [teamResponse, setTeamResponse] = React.useState([]);
    const [novelityScore, setNovelityScore] = React.useState(0);
    const [usefulnessScore, setUsefulnessScore] = React.useState(0);
    const [feasabilityScore, setFeasabilityScore] = React.useState(0);
    const [scalabilityScore, setScalabilityScore] = React.useState(0);
    const [affordabilityScore, setAffordabilityScore] = React.useState(0);

    // eslint-disable-next-line no-unused-vars
    const [isL2, setIsL2] = React.useState(false);

    React.useEffect(() => {
        if (props?.ideaDetails?.response) {
            setTeamResponse(
                Object.entries(props?.ideaDetails?.response).map((e) => e[1])
            );
        }
    }, [props]);

    const handleAlert = (handledText) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
            allowOutsideClick: false
        });

        swalWithBootstrapButtons
            .fire({
                title:
                    handledText === 'accept'
                        ? 'You are attempting to accept this Idea'
                        : 'You are attempting to reject this Idea',
                text: 'Are you sure?',
                // imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if (result.isConfirmed) {
                        handleL1Round(handledText);
                    }
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire('Cancelled', '', 'error');
                }
            });
    };

    const handleL1Round = (handledText) => {
        const body = JSON.stringify({
            status:
                handledText == 'accept' ? 'SELECTEDROUND1' : 'REJECTEDROUND1'
        });
        var config = {
            method: 'put',
            url: `${
                process.env.REACT_APP_API_BASE_URL +
                '/challenge_response/' +
                props?.ideaDetails?.challenge_response_id
            }`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.data[0].token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                openNotificationWithIcon('success', response?.data?.message=='OK'?'Idea processed successfully!':response?.data?.message);
                setTimeout(() => {
                    dispatch(getSubmittedIdeaList());
                    props?.setIsNextDiv(true);
                }, 100);
            })
            .catch(function (error) {
                openNotificationWithIcon(
                    'error',
                    error?.response?.data?.message
                );
            });
    };

    return (
        <>
            {teamResponse && teamResponse?.length > 0 ? (
                <>
                    <div className="row idea_detail_card">
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2 className="mb-md-4 mb-3">
                                        Idea Name:{' '}
                                        <span className="text-capitalize fs-3">
                                            {props?.ideaDetails?.sdg?.toLowerCase() ||
                                                ''}
                                        </span>
                                    </h2>
                                </div>
                                <div className="col-sm-4 d-flex justify-content-end">
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass="primary"
                                            size="small"
                                            label="Skip"
                                            onClick={() =>
                                                props?.handleSkip()
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${
                                props?.ideaDetails?.status === 'SUBMITTED'
                                    ? 'col-12'
                                    : 'col-lg-8'
                            } order-lg-0 order-1 p-0 h-100`}
                        >
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
                                                {item?.question_type ===
                                                'MCQ' ? (
                                                    item?.selected_option?.map(
                                                        (data, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {data || ''}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : item?.question_type ===
                                                      'TEXT' ||
                                                  item?.question_type ===
                                                      'MRQ' ? (
                                                    item?.selected_option
                                                ) : item?.question_type ===
                                                  'DRAW' ? (
                                                    <LinkComponent
                                                        item={
                                                            item.selected_option
                                                        }
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
                                
                                {props?.ideaDetails?.status === 'SUBMITTED' && (
                                    <div className="d-flex ms-auto">
                                        <button
                                            className="btn btn-lg px-5 py-2 btn-success me-3 rounded-pill"
                                            onClick={() => {
                                                handleAlert('accept');
                                            }}
                                        >
                                            <span className="fs-4">Accept</span>
                                        </button>
                                        <button
                                            className="btn btn-lg px-5 py-2 btn-danger me-3 rounded-pill"
                                            onClick={() => {
                                                handleAlert('reject');
                                            }}
                                        >
                                            <span className="fs-4">Reject</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {props?.ideaDetails?.status !== 'SUBMITTED' && (
                            <div className="col-lg-4 order-lg-1 order-0 p-0 h-100 mt-3">
                                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3 text-center">
                                    <p className="fs-3">
                                        L1 Status & TimeStamp
                                    </p>
                                    <p>
                                        {props?.ideaDetails?.status ===
                                        'SELECTEDROUND1' ? (
                                            <span className="fs-3 text-success">
                                                Accepted
                                            </span>
                                        ) : props?.ideaDetails?.status ===
                                          'REJECTEDROUND1' ? (
                                            <span className="fs-3 text-danger">
                                                Rejected
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </p>
                                </div>
                                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3 text-center">
                                    L2 Status & TimeStamp
                                </div>
                                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3 text-center">
                                    Final Status & TimeStamp
                                </div>
                            </div>
                        )}
                    </div>

                    {/* //-----------Rating section---- */}
                    {isL2 && (
                        <div className="rating_card mt-md-5 mt-4 card p-md-5 p-3">
                            <h2 className="mb-3">Idea Scoring</h2>
                            <div className="row">
                                {ratingParams?.map((item, index) => {
                                    return (
                                        <div className="col-lg-4 col-md-6 mb-5" key={index}>
                                            <div className="for-novelity px-3">
                                                <label
                                                    htmlFor="novelity"
                                                    className="form-label text-capitalize"
                                                >
                                                    {item} score -{' '}
                                                    <span
                                                        className={
                                                            (item==='novelity'?novelityScore:item==='usefulness'?usefulnessScore:item==='feasability'?feasabilityScore:item==='scalability'?scalabilityScore:affordabilityScore )== 0
                                                                ? 'text-muted fs-2'
                                                                : 'fs-2'
                                                        }
                                                    >
                                                        {item==='novelity'?novelityScore:item==='usefulness'?usefulnessScore:item==='feasability'?feasabilityScore:item==='scalability'?scalabilityScore:affordabilityScore}
                                                    </span>
                                                </label>
                                                <RangeSlider
                                                    name={item}
                                                    setScore={item==='novelity'?setNovelityScore:item==='usefulness'?setUsefulnessScore:item==='feasability'?setFeasabilityScore:item==='scalability'?setScalabilityScore:setAffordabilityScore}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="row">
                                    <div className="col-md-6 mb-5 ps-4">
                                        <label htmlFor="floatingTextarea">
                                            Comments
                                        </label>
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control fs-4 lh-sm"
                                                maxLength={500}
                                                placeholder="Leave a comment here"
                                                id="ComentTextarea"
                                                style={{ height: '10rem' }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-end">
                                    <div className="me-3">
                                        <Button
                                            btnClass="secondary"
                                            size="small"
                                            label="Back to List"
                                            // onClick={() => {
                                            //     props?.setIsIdeaDetail(false);
                                            // }}
                                        />
                                    </div>
                                    <Button
                                        btnClass="primary"
                                        size="small"
                                        label="Update Score"
                                        // onClick={() => {
                                        //     props?.setIsIdeaDetail(false);
                                        // }}
                                    />
                                </div>
                            </div>
                           
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h2 className="my-auto text-center mt-5">
                        Details Not Available.
                    </h2>
                    <div className="text-center mt-5">
                        <Button
                            btnClass="primary"
                            size="small"
                            label="Next Idea"
                            onClick={() => {
                                props?.handleSkip();
                            }}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default IdeaDetail;
