/**
 * 初期页面hooks
 * How to fetch data with React Hooks (https://www.robinwieruch.de/react-hooks-fetch-data/)
 */
import { func } from 'prop-types';
import { useState, useEffect } from 'react';
import axios from '../util/api';

function useBeginningData() {
    const [beginningData, setBeginningData] = useState([]);

    async function fetchData() {
        const data = await axios.get('initial');

        setBeginningData(data);
    }

    async function deleteBeginingData(id) {
        await axios.delete(`initial/${id}`);
        await fetchData();
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return [beginningData, fetchData, deleteBeginingData];
}

export default useBeginningData;
