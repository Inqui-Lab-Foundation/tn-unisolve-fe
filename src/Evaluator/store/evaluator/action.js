import axios from 'axios';

import {
    EVALUATOR_LOGIN_USER,
    EVALUATOR_LOGIN_USER_SUCCESS,
    EVALUATOR_LOGIN_USER_ERROR,
    GET_SUBMITTED_IDEA_LIST
} from '../../../redux/actions.js';
import { URL, KEY } from '../../../constants/defaultValues.js';
import {
    setCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../../helpers/Utils.js';

//------login---
export const evaluatorLoginUserSuccess = (user) => async (dispatch) => {
    dispatch({
        type: EVALUATOR_LOGIN_USER_SUCCESS,
        payload: user
    });
};


export const evaluatorLoginUserError = (message) => async (dispatch) => {
    dispatch({
        type: EVALUATOR_LOGIN_USER_ERROR,
        payload: { message }
    });
};

export const evaluatorLoginUser = (data, history,module) => async (dispatch) => {
    try {
        const loginData = {
            ...data,
            passwordConfirmation: data.password
        };
        dispatch({ type: EVALUATOR_LOGIN_USER });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .post(`${URL.evaluatorLogin}`, loginData, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const item = result.data;
            setCurrentUser(item);
            localStorage.setItem("module",module);
            dispatch(evaluatorLoginUserSuccess(result));

            history.push('/evaluator/submitted-ideas');
        } else {
            openNotificationWithIcon('error', 'Enter the correct credentials');
            dispatch(evaluatorLoginUserError(result.statusText));
        }
    } catch (error) {
        dispatch(evaluatorLoginUserError({}));
    } 
};

//---get submitted idea list--
export const getSubmittedIdeaListSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_SUBMITTED_IDEA_LIST,
        payload: data
    });
};
export const getSubmittedIdeaList = () => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${process.env.REACT_APP_API_BASE_URL + '/challenge_response?status=SUBMITTED'}`,
                axiosConfig
            )
            .then((data) => data)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data =result?.data?.data[0]?.dataValues;
            dispatch(getSubmittedIdeaListSuccess(data));
        } else {
            dispatch(getSubmittedIdeaListSuccess(null));
        }
    } catch (error) {
        dispatch(getSubmittedIdeaListSuccess(null));
    }
};