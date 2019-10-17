import { useState, useEffect } from 'react';
import axios from '../util/api';
/**
 * 获取某支基金的定投记录
 */

function useTimingInvestmentRecord(fundId) {
    const [data, setData] = useState([]);

    async function fetchData(id) {
        const res = await axios.get('invest-record/', {
            params: {
                fund: id
            }
        });

        setData(res);
    }

    useEffect(() => {
        fetchData(fundId);
    }, [fundId]);

    return [data, fetchData];
}

export default useTimingInvestmentRecord;
