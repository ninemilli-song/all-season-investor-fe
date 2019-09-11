/**
 * 定投详情列表页
 */
import React from 'react';
import { useRouter } from 'next/router';

function TimingInvestmentDetail() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            {
                `query id is ${id}`
            }
        </div>
    );
}

export default TimingInvestmentDetail;
