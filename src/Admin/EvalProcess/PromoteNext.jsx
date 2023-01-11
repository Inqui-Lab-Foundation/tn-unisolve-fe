/* eslint-disable indent */
import React from 'react';
import Layout from '../../Admin/Layout';
import { Row, Col, Label, Container, Card } from 'reactstrap';
import { Button } from '../../stories/Button';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';

const EditEvalProcess = (props) => {
    const evalID = JSON.parse(localStorage.getItem('eavlId'));

    async function handledistricts(value) {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .put(
                `${URL.updateEvalProcess + evalID.evaluation_process_id}`,
                JSON.stringify(value, null, 2),
                axiosConfig
            )
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    openNotificationWithIcon(
                        'success',
                        'Districts Update Successfully'
                    );
                    props.history.push('/admin/evaluationProcess');
                }
            })
            .catch((err) => {
                return err.response;
            });
    }

    const handleclick = () => {
        handledistricts();
    };
    const evalList = [
        {
            no: 1,
            District: 'ram',
            processed: '30',
            ratings: {
                1: 100,
                2: 100,
                3: 100,
                4: 100,
                5: 100,
                6: 100,
                7: 100,
                8: 100,
                9: 100,
                10: 100
            }
        }
    ];

    const tabledata = {
        data: evalList,
        columns: [
            {
                name: 'No',
                selector: 'no',
                width: '6%'
            },

            {
                name: 'District Name',
                selector: 'District',
                width: '15%'
            },
            {
                name: 'Processed',
                selector: 'processed',
                width: '15%'
            },
            {
                name: 'Actions',
                selector: 'ratings',
                width: '40%',
                cell: () => {
                    return(
                        <select
                            name="languages"
                            multiple
                            size="5"
                            onClick={(e) => {
                                console.log(e);
                            }}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="php">PHP</option>
                            <option value="java">Java</option>
                            <option value="golang">Golang</option>
                            <option value="python">Python</option>
                            <option value="c#">C#</option>
                            <option value="C++">C++</option>
                            <option value="erlang">Erlang</option>
                        </select>
                    );
                }
            }
        ]
    };

    return (
        <Layout>
            <Container>
                <Card className="p-5 m-5">
                    <Row>
                        <Col md={4}>
                            <Label className="mb-2 text-info">
                                Level Name :{' '}
                                <span className="text-muted">
                                    {evalID && evalID.level_name}
                                </span>{' '}
                            </Label>
                        </Col>
                        <Col md={4}>
                            <Label className="mb-2 text-info">
                                No Of Evaluation :{' '}
                                <span className="text-muted">
                                    {evalID && evalID.no_of_evaluation}
                                </span>
                            </Label>
                        </Col>
                        <Col md={4}>
                            <Label className="mb-2 text-info">
                                Evaluation Schema :{' '}
                                <span className="text-muted">
                                    {evalID && evalID.eval_schema}
                                </span>
                            </Label>
                        </Col>
                    </Row>
                    <Row>
                        <DataTableExtensions
                            print={false}
                            export={false}
                            {...tabledata}
                        >
                            <DataTable
                                data={evalList}
                                defaultSortField="id"
                                defaultSortAsc={false}
                                pagination
                                highlightOnHover
                                fixedHeader
                                subHeaderAlign={Alignment.Center}
                                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                paginationPerPage={10}
                            />
                        </DataTableExtensions>
                        <Label className="mb-2">Districts:</Label>
                        <select
                            name="languages"
                            multiple
                            size="5"
                            onClick={(e) => {
                                console.log(e);
                            }}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="php">PHP</option>
                            <option value="java">Java</option>
                            <option value="golang">Golang</option>
                            <option value="python">Python</option>
                            <option value="c#">C#</option>
                            <option value="C++">C++</option>
                            <option value="erlang">Erlang</option>
                        </select>
                    </Row>
                </Card>
                <Row>
                    <Col className="col-xs-12 col-sm-6">
                        <Button
                            label="Discard"
                            btnClass="secondary"
                            size="small"
                            onClick={() =>
                                props.history.push('/admin/evaluationProcess')
                            }
                        />
                    </Col>
                    <Col className="submit-btn col-xs-12 col-sm-6 text-right">
                        <Button
                            label="Save"
                            onClick={() => handleclick()}
                            btnClass={'primary'}
                            size="small"
                        />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
export default EditEvalProcess;
