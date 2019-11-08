/**
 * 定投页面
 * 1. 展示定投汇总数据
 * 2. 录入定投记录
 */
import React from 'react';
import TimingInvestmentList from '../containers/timing-investment/timing-investment-list';
import useTimingInvestmentList from '../effects/timing-investment-list';
import PageHeader from '../components/PageHeader';
import './css/timing-investment.scss';

function TimingInvestment() {
    const [data] = useTimingInvestmentList();
    const prefixCls = 'asi-page-timing-investment';

    return (
        <div className={`${prefixCls}-wrapper`}>
            <PageHeader
                name="定投"
            />
            <div className={`${prefixCls}-content common-body`}>
                <TimingInvestmentList
                    data={data}
                />
            </div>
        </div>
    );
}

export default TimingInvestment;
