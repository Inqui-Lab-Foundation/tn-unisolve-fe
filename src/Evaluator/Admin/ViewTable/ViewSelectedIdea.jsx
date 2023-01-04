/* eslint-disable indent */
import React, { useEffect } from 'react';
import './ViewSelectedIdea.scss';
import Layout from '../Pages/Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import moment from 'moment';
import ViewDetail from './ViewDetail';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { URL, KEY } from '../../../constants/defaultValues';
import { getNormalHeaders } from '../../../helpers/Utils';
import { Button } from '../../../stories/Button';

const ViewSelectedIdea = () => {
    const history = useHistory();

    const Data = (history && history.location && history.location.item) || {};

    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState({});
    const [tableDate, settableDate] = React.useState({});

    useEffect(() => {
        handleideaList();
    }, []);
    async function handleideaList() {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(`${URL.getidealist}${Data.param}`, axiosConfig)
            .then(function (response) {
                if (response.status === 200) {
                    settableDate(
                        response.data &&
                            response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    console.log(tableDate, 'get----', Data);
    const evaluatedIdea = {
        data: tableDate && tableDate.length > 0 ? tableDate : [],
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
                width: '7%'
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
                width: '15%'
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
                width: '15%'
            },
            {
                name: 'Evaluated Name',
                cell: (row) => {
                    return [
                        row.evaluated_name ? row.evaluated_name : ''
                    ];
                },
                width: '15%'
            },
            {
                name: 'Status',
                // selector: (row) => row.evaluation_status && row.evaluation_status=='SELECTEDROUND1'?'Accepted':row.evaluation_status=='REJECTEDROUND1'?'Rejected':'',
                cell: (row) => {
                    return [
                        <div className="d-flex" key={row}>
                            {row.evaluation_status &&
                                row.evaluation_status == 'SELECTEDROUND1' && (
                                    <span className="text-success">
                                        Accepted
                                    </span>
                                )}
                            {row.evaluation_status == 'REJECTEDROUND1' && (
                                <span className="text-danger">Rejected</span>
                            )}
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
                                View
                            </div>
                        </div>
                    ];
                },
                width: '8%',
                left: true
            }
        ]
    };

    const evaluatedIdeaforsub = {
        data: tableDate && tableDate.length > 0 ? tableDate : [],
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
                width: '10%'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name || '',
                sortable: true,
                width: '21%'
            },
            {
                name: 'Idea Name',
                selector: (row) => row.sdg,
                width: '21%'
            },
            {
                name: 'Submitted By',
                selector: (row) => row.initiated_name,
                width: '21%'
            },
            {
                name: 'Status',
                cell: (row) => row.status,
                width: '11%'
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
                                View
                            </div>
                        </div>
                    ];
                },
                width: '12%',
                left: true
            }
        ]
    };
const sel = Data.title==='Submitted'? evaluatedIdeaforsub : evaluatedIdea;
    return (
        <Layout>
            <div className="container evaluated_idea_wrapper pt-5 mb-50">
                <div className="row">
                    <div className="col-12 p-0">
                        {!isDetail && (
                            <div>
                                <h2 className="ps-2">{Data.title} Ideas</h2>
                                <div className="text-right pb-4">
                                    <Button
                                        btnClass="primary"
                                        size="small"
                                        label="Back"
                                        onClick={() => history.goBack()}
                                    />
                                </div>
                            </div>
                        )}

                        {!isDetail ? (
                            <div className="bg-white border card pt-3">
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...sel}
                                >
                                    <DataTable
                                        data={tableDate || []}
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
                            <ViewDetail
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

export default ViewSelectedIdea;
