/**
 * 获取定投的基金列表数据
 */
import { useState, useEffect } from 'react';
import axios from '../util/api';

function useTimingInvestmentList() {
    const [data, setData] = useState([]);

    async function fetchData() {
        const res = await axios.get('fund-list/');

        setData(res);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return [data, fetchData];
}

export default useTimingInvestmentList;
