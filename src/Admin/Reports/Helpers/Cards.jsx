/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import {
    openNotificationWithIcon,
    getCurrentUser
} from '../../../helpers/Utils';

const Cards = ({ heading, list }) => {
    const currentUser = getCurrentUser('current_user');
    const [reportsData, setReportsData] = useState([]);
    const [msg, setMsg] = useState('');

    const report = [
        {
            Name: 'Teacher-one',
            Address: 'Address-one',
            Contact: '9801775504'
        },
        {
            Name: 'Teacher-two',
            Address: 'Address-two',
            Contact: '9801775505'
        }
    ];
    const handleDownload = (item) => {
        setMsg(item);
        var url = '';
        if (item == 'Registered Teachers List') {
            url = '/reports/mentorRegList';
        } else if (item == 'Not Registered Teachers List') {
            url = '/reports/notRegistered';
        } else if (item == 'Teachers Course Completion') {
            url = '/reports/courseComplete';
        } else if (item == 'Teachers Pre Survey') {
            url = '/reports/preSurvey?role=MENTOR';
        }
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.data[0].token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    var msg = '';

                    if (item == 'Registered Teachers List') {
                        msg = 'Registered Teachers List Download Successfully';
                    } else if (item == 'Not Registered Teachers List') {
                        msg =
                            'Not  Registered Teachers List Download Successfully';
                    } else if (item == 'Teachers Course Completion') {
                        msg =
                            'Teachers Course Completion  Download Successfully';
                    } else if (item == 'Teachers Pre Survey') {
                        msg = 'Teachers Pre Survey Download successfully';
                    }
                    openNotificationWithIcon('success', msg);
                    setReportsData(
                        response && response.data && response.data.data
                    );
                }
                const element = document.getElementById('CSVBtn');
                element.click();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Card className="p-3 mb-5">
            <h3 className="text-muted">{heading}</h3>
            <ul>
                {list.map((item, i) => {
                    const slug = item.replaceAll(' ', '-');
                    return i < 2 ? (
                        <li key={i}>
                            <Link
                                to={`/admin/selected-report?report=${slug}`}
                                exact
                                className="d-flex"
                            >
                                {item}
                            </Link>
                        </li>
                    ) : (
                        <li key={i}>
                            <Link
                                to="#"
                                exact
                                className="d-flex"
                                onClick={() => {
                                    handleDownload(item);
                                }}
                            >
                                {item}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="m-3 common-flex">
                <CSVLink
                    style={{ display: 'none' }}
                    id={'CSVBtn'}
                    data={reportsData}
                    filename={
                        msg == 'Registered Teachers List'
                            ? 'Registered Teachers List.csv'
                            : msg == 'Not Registered Teachers List'
                            ? 'Not Registered Teachers List.csv'
                            : msg == 'Teachers Course Completion'
                            ? 'Teachers Course Completion.csv'
                            : msg == 'Teachers Pre Survey'
                            ? 'Teachers Pre Survey.csv'
                            : 'Report.csv'
                    }
                />
            </div>
        </Card>
    );
};

export default Cards;
