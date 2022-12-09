/* eslint-disable indent */
import React from 'react';
import './IdeaList.scss';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// import Select from '../Helper/Select';
import IdeaDetail from './IdeaDetail';
import { getSubmittedIdeaList } from '../store/evaluator/action';
import { useDispatch, useSelector } from 'react-redux';

const IdeaList = () => {
    const topRef=React.useRef();
    const dispatch = useDispatch();
    const [ideaDetails, setIdeaDetails] = React.useState({});
    // const ideaTypeData = ['Total Idea', 'Processed Idea', 'Yet to Processd'];
    // eslint-disable-next-line no-unused-vars
    // const [ideaType, setIdeaType] = React.useState('');
    const [isIdeaDetail, setIsIdeaDetail] = React.useState(false);
    const [currentRow, setCurrentRow]=React.useState(1);
    const [skipButtonText, setSkipButtonText]=React.useState('Next Idea');

    const idea_list = useSelector(
        (state) => state?.evaluator.submittedIdeaList
    );

    React.useEffect(() => {
        if (!idea_list) {
            dispatch(getSubmittedIdeaList());
        }
        if (idea_list) {
            setIdeaDetails(idea_list[0]);
            setIsIdeaDetail(true);
        }
    }, [idea_list]);
    // React.useEffect(()=>{
    //     if (idea_list) {
    //         setIdeaDetails(idea_list[0]);
    //         setIsIdeaDetail(true);
    //     }
    // },[]);
    React.useEffect(()=>{
        topRef.current.scrollIntoView(
            {
                top:0,
                behavior: "smooth",
            }
        );
    },[isIdeaDetail]);

    const handleSkip=(currentColumnNo)=>{
        if(idea_list && currentColumnNo<idea_list?.length){
            setIdeaDetails(idea_list[currentColumnNo]);
            setIsIdeaDetail(true);
            setCurrentRow(currentColumnNo+1);
            if(idea_list?.length-currentColumnNo==1){
                setSkipButtonText('Back To List');
            }
        }else{
            setSkipButtonText('Next Idea');
            setIdeaDetails({});
            setIsIdeaDetail(false);
            setCurrentRow(1);
        }

    };

    const submittedList = {
        data: idea_list || [],
        columns: [
            {
                name: 'SL.NO',
                cell: (params, index) => {
                    return [
                        <div className="ms-3" key={params}>
                            {index+1}
                        </div>
                    ];
                },
                sortable: true,
                width: '10%'
            },
            {
                name: 'Team Name',
                selector: 'team_name',
                sortable: true,
                width: '20%'
            },
            {
                name: 'Idea Name',
                selector: 'sdg',
                width: '40%'
            },
            {
                name: 'Actions',
                cell: (params, index) => {
                    return [
                        <div className="d-flex" key={params}>
                            <div
                                className="btn btn-primary btn-lg mr-5 mx-2"
                                onClick={() => {
                                    setIsIdeaDetail(true);
                                    setIdeaDetails(params);
                                    setCurrentRow(index+1);
                                }}
                            >
                                View Idea Details
                            </div>
                        </div>
                    ];
                },
                width: '30%',
                left: true
            }
        ]
    };

    return (
        <Layout>
            <div className="container idea_list_wrapper pt-5 mb-50" ref={topRef}>
                {/* <h2 className="mb-4">Submitted Ideas</h2> */}
                {/* <div className="row mb-md-4 mb-3">
                        <div className="tiles_card p-2">
                            <div className="p-4 w-100 h-100 card text-center border justify-content-center">
                                <h3 className="m-0">
                                    <span className="fs-1 text-primary">
                                        100
                                    </span><br/>
                                    Total Idea
                                </h3>
                            </div>
                        </div>
                        <div className="tiles_card p-2">
                            <div className="p-4 w-100 h-100 card text-center border justify-content-center">
                                <h3 className="m-0">
                                    <span className="fs-1 text-success">
                                        40
                                    </span><br/>
                                    Processed
                                </h3>
                            </div>
                        </div>
                        <div className="tiles_card p-2">
                            <div className="p-4 w-100 h-100 card text-center border justify-content-center">
                                <h3 className="m-0">
                                    <span className="fs-1 text-danger">60</span><br/>
                                    Yet to Processed
                                </h3>
                            </div>
                        </div>
                    </div> */}
                {!isIdeaDetail && idea_list && idea_list?.length > 0 ? (
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="submitted_lists bg-white border card pt-3" >
                                {/* <div className="d-flex ms-auto me-md-5 me-3 p-2 align-items-center">
                                    <p className="text-muted fs-3 m-0 me-2">
                                        Select Idea Type
                                    </p>
                                    <Select
                                        placeHolder={'Select Idea Type'}
                                        list={ideaTypeData}
                                        setValue={setIdeaType}
                                    />
                                </div> */}
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...submittedList}
                                >
                                    <DataTable
                                        data={idea_list || []}
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        fixedHeader
                                        subHeaderAlign={Alignment.Center}
                                        paginationRowsPerPageOptions={[
                                            10, 20, 30
                                        ]}
                                        paginationPerPage={10}
                                    />
                                </DataTableExtensions>
                            </div>
                        </div>
                    </div>
                ) : isIdeaDetail && idea_list && idea_list?.length > 0 ? (
                    <IdeaDetail
                        ideaDetails={ideaDetails}
                        setIsIdeaDetail={setIsIdeaDetail}
                        handleSkip={handleSkip}
                        currentRow={currentRow}
                        skipButtonText={skipButtonText}
                    />
                ) : (
                    <h2 className="my-auto text-center">No Data Available.</h2>
                )}
            </div>
        </Layout>
    );
};

export default IdeaList;
