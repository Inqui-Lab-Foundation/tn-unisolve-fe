/* eslint-disable indent */
import React, { useEffect } from 'react';
import './ViewFinalSelectedideas.scss';
import Layout from '../Pages/Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
//import moment from 'moment';
import ViewDetail from './ViewFinalDetail';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { KEY, URL } from '../../../constants/defaultValues';
import { Button } from '../../../stories/Button';
import Select from '../../Helper/Select';
import { Col, Container, Row} from 'reactstrap';
import { cardData } from '../../../Student/Pages/Ideas/SDGData.js';
import { useSelector } from 'react-redux';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch } from 'react-redux';
import { getNormalHeaders } from '../../../helpers/Utils';
import { Spinner } from 'react-bootstrap';

const ViewSelectedIdea = () => {
    const { search } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const title = new URLSearchParams(search).get('title');
    const level = new URLSearchParams(search).get('level');
    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState({});
    const [tableData, settableData] = React.useState({});
    const [district, setdistrict] = React.useState('');
    const [sdg, setsdg] = React.useState('');
    const [currentRow, setCurrentRow]= React.useState(1);
    const [tablePage, setTablePage]=React.useState(1);
    const [showspin,setshowspin]=React.useState(false);

    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });
    SDGDate.unshift('ALL SDGs');
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );
    
    const filterParamsfinal = (district && district !== 'All Districts' ? '&district=' + district : '') +
        (sdg && sdg !== 'ALL SDGs' ? '&sdg=' + sdg : '');

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);


    const handleclickcall = () => {
        setshowspin(true);
        handleideaList();
    };

    async function handleideaList() {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(`${URL.getidealistfinal}?level=${level}${filterParamsfinal}`, axiosConfig)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response.data.data,"----response.data");
                    const updatedWithKey = response.data && response.data.data.map((item, i) => {
                        const upd = { ...item }; upd["key"] = i + 1;
                         return upd;
                     });
                     settableData(updatedWithKey && updatedWithKey);
                     setshowspin(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setshowspin(false);
            });
    }
    const average = arr => arr.reduce((p,c) => p+c,0)/arr.length;
    console.log(tableData,"----------tableData");
    const evaluatedIdeafinal = {
        data: tableData && tableData.length > 0 ? tableData : [],
        columns: [
            {
                name: 'No',
                selector: (row) => row.key,
                sortable: true,
                width: '6%'
            },
            {
                name: 'Team Name',
                selector: (row) => row.evaluator_ratings[0]?.challenge_response?.team_name || '',
                sortable: true,
                width: '11.5%'
            },
            {
                name: 'SDG',
                selector: (row) => row.evaluator_ratings[0]?.challenge_response?.sdg,
                width: '10%'
            },
            {
                name: 'Submitted By',
                selector: (row) => row.evaluator_ratings[0]?.challenge_response?.initiated_name,
                width: '11.5%'
            },
            {
                name: 'Overall',
                cell :(row) => {
                    return[row.evaluator_ratings ? row.evaluator_ratings.length > 0 ? average(row.evaluator_ratings[0].overall).toFixed(2) :' ' :' '];},
                 width : '7%'
            },
            {
                name: 'Novelty',
                cell :(row) => {
                    return[row.evaluator_ratings ? row.evaluator_ratings.length > 0 ? average(row.evaluator_ratings[0].param_1).toFixed(2) :' ' :' '];},
                 width : '8%'
            },
            {
                name: 'Usefulness',
                cell :(row) => {
                    return[row.evaluator_ratings ? row.evaluator_ratings.length > 0 ? average(row.evaluator_ratings[0].param_2).toFixed(2) :' ' :' '];},
                 width : '9%'
            },
            {
                name: 'Feasability',
                cell :(row) => {
                    return[row.evaluator_ratings ? row.evaluator_ratings.length > 0 ? average(row.evaluator_ratings[0].param_3).toFixed(2) :' ' :' '];},
                 width : '9%'
            },
            {
                name: 'Scalability',
                cell :(row) => {
                    return[row.evaluator_ratings ? row.evaluator_ratings.length > 0 ? average(row.evaluator_ratings[0].param_4).toFixed(2) :' ' :' '];},
                 width : '9%'
            },
            {
                name: 'Sustainability',
                cell :(row) => {
                    return[row.evaluator_ratings ? row.evaluator_ratings.length > 0 ? average(row.evaluator_ratings[0].param_5).toFixed(2) :' ' :' '];},
                 width : '11%'
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
                                    let index=0;
                                    tableData?.forEach((item, i)=>{
                                        if(item?.challenge_response_id==params?.challenge_response_id){
                                            index=i;
                                        }
                                    });
                                    setCurrentRow(index+1);
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

    const showbutton = district && sdg;

    const handleNext=()=>{
        if(tableData && currentRow < tableData?.length){
            setIdeaDetails(tableData[currentRow]);
            setIsDetail(true);
            setCurrentRow(currentRow+1);
        }
    };
    const handlePrev=()=>{
        if(tableData && currentRow >= 1){
            setIdeaDetails(tableData[currentRow-2]);
            setIsDetail(true);
            setCurrentRow(currentRow-1);
        }
    };
    return (
        <Layout>
            <div className="container evaluated_idea_wrapper pt-5 mb-50">
                <div className="row">
                    <div className="col-12 p-0">
                        {!isDetail && (
                            <div>
                                <h2 className="ps-2 pb-3">{title} Challenges</h2>

                                <Container fluid className="px-0">
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <div className="my-3 d-md-block d-flex justify-content-center">
                                                <Select
                                                    list={fullDistrictsNames}
                                                    setValue={setdistrict}
                                                    placeHolder={
                                                        'Select District'
                                                    }
                                                    value={district}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="my-3 d-md-block d-flex justify-content-center">
                                                <Select
                                                    list={SDGDate}
                                                    setValue={setsdg}
                                                    placeHolder={'Select SDG'}
                                                    value={sdg}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                                <div className="text-center">
                                                    <Button
                                                        btnClass={showbutton ? 'primary': 'default'}
                                                        size="small"
                                                        label="Search"
                                                        disabled={!showbutton}
                                                        onClick={() =>
                                                            handleclickcall()
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        <Col md={6}>
                                            <div className="text-right">
                                                <Button
                                                    btnClass="primary"
                                                    size="small"
                                                    label="Back"
                                                    onClick={() =>
                                                        history.goBack()
                                                    }
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )}
                        {
                        showspin && <div className='text-center mt-5'>
                        <Spinner animation="border" variant="secondary"/>
                        </div>
                        }
                        {!showspin && 
                        (!isDetail ? (
                            <div className="bg-white border card pt-3 mt-5">
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...evaluatedIdeafinal}
                                >
                                    <DataTable
                                        data={tableData || []}
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        fixedHeader
                                        subHeaderAlign={Alignment.Center}
                                        paginationRowsPerPageOptions={[
                                            10, 25, 50, 100
                                        ]}
                                        paginationPerPage={10}
                                        onChangePage={(page)=>setTablePage(page)}
                                        paginationDefaultPage={tablePage}
                                    />
                                </DataTableExtensions>
                            </div>
                        ) : (
                            <ViewDetail
                                ideaDetails={ideaDetails}
                                setIsDetail={setIsDetail}
                                handleNext={handleNext}
                                handlePrev={handlePrev}
                                currentRow={currentRow}
                                dataLength={tableData && tableData?.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ViewSelectedIdea;