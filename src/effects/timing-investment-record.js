import { useState, useEffect } from 'react';
import axios from '../util/api';
/**
 * 获取某支基金的定投记录
 */

function useTimingInvestmentRecord(fundId) {
    const [data, setData] = useState([]);

    /**
     * 抓取数据
     * @param {number} id 
     */
    async function fetchData(id) {
        const res = await axios.get('invest-record/', {
            params: {
                fund: id
            }
        });

        setData(res);
    }

    /**
     * 删除该基金定投的单个记录
     * @param {number} recordId 
     */
    async function deleteRecord(recordId) {
        await axios.delete(`invest-record/${recordId}`);

        /**
         * 重新获取数据
         */
        fetchData(fundId);
    }

    useEffect(() => {
        fetchData(fundId);
    }, [fundId]);

    return [data, fetchData, deleteRecord];
}

export default useTimingInvestmentRecord;
