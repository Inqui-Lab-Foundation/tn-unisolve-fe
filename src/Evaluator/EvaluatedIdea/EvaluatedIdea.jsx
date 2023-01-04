/* eslint-disable indent */
import React from 'react';
import './EvaluatedIdea.scss';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// import { Button } from '../../stories/Button';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getL1EvaluatedIdea } from '../store/evaluator/action';
import EvaluatedIdeaDetail from './EvaluatedIdeaDetail';

const EvaluatedIdea = () => {
    const dispatch = useDispatch();
    const evaluatedIdeaList = useSelector(
        (state) => state?.evaluator.evaluatedIdeaL1
    );

    React.useEffect(() => {
        dispatch(getL1EvaluatedIdea());
    }, []);

    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState({});
    // const evaluatedIdeaList = [
    //     {
    //         team_name: 'Test Team 1',
    //         sdg: 'Idea Name 1',
    //         initiated_name: 'Test Name'
    //     }
    // ];
    const evaluatedIdea = {
        data: evaluatedIdeaList || [],
        columns: [
            {
                name: 'No',
                cell: (params, index) => {
                    return [
                        <div className="ms-3" key={params}>
                            {index + 1}
                        </div>
                    ];
                },
                sortable: true,
                width: '6%'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name || '',
                sortable: true,
                width: '15%'
            },
            {
                name: 'Idea Name',
                selector: (row) => row.sdg,
                width: '20%'
            },
            {
                name: 'Submitted By',
                selector: (row) => row.initiated_name,
                width: '15%'
            },
            {
                name: 'Evaluated At',
                selector: (row) =>
                    row.evaluated_at
                        ? moment(row.evaluated_at).format('DD-MM-YY h:mm:ss a')
                        : row.evaluated_at,
                width: '17%'
            },
            {
                name: 'Status',
                // selector: (row) => row.evaluation_status && row.evaluation_status=='SELECTEDROUND1'?'Accepted':row.evaluation_status=='REJECTEDROUND1'?'Rejected':'',
                cell: (row) => {
                    return [
                        <div className="d-flex" key={row}>
                            {
                                row.evaluation_status && row.evaluation_status=='SELECTEDROUND1'&&
                                <span className='text-success'>Accepted</span>
                            }
                            {
                                row.evaluation_status=='REJECTEDROUND1'&&
                                <span className='text-danger'>Rejected</span>
                            }
                        </div>
                    ];
                },
                width: '10%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div className="d-flex" key={params}>
                            <div
                                className="btn btn-primary btn-lg mr-5 mx-2"
                                onClick={() => {
                                    setIdeaDetails(params);
                                    setIsDetail(true);
                                }}
                            >
                                View Idea Details
                            </div>
                        </div>
                    ];
                },
                width: '17%',
                left: true
            }
        ]
    };
    return (
        <Layout>
            <div className="container evaluated_idea_wrapper pt-5 mb-50">
                <div className="row">
                    <div className="col-12 p-0">
                        {!isDetail && <h2 className="ps-2">Evaluated Ideas</h2>}
                        
                        {!isDetail ? (
                            <div className="bg-white border card pt-3">
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...evaluatedIdea}
                                >
                                    <DataTable
                                        data={evaluatedIdeaList || []}
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
                        ) : (
                            <EvaluatedIdeaDetail
                                ideaDetails={ideaDetails}
                                setIsDetail={setIsDetail}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EvaluatedIdea;
