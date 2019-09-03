/**
 * 定投页面
 * 1. 展示定投汇总数据
 * 2. 录入定投记录
 */
import React from 'react';
import TimingInvestmentFormWrapped from '../containers/timing-investment/timing-investment-form';
import TimingInvestmentList from '../containers/timing-investment/timing-investment-list';
import useTimingInvestmentList from '../effects/timing-investment-list';
import './css/timing-investment.scss';


/**
 * 页面主组件 
 */
function TimingInvestment() {
    const [data, fetchData] = useTimingInvestmentList();

    return (
        <div>
            <div className="timing-investment-form">
                <TimingInvestmentFormWrapped 
                    onSubmited={fetchData}
                />
            </div>
            <div className="timing-investment-list">
                <TimingInvestmentList
                    data={data}
                />
            </div>
        </div>
    );
}

export default TimingInvestment;
