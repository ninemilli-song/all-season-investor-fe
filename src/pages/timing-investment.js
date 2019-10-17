/**
 * 定投页面
 * 1. 展示定投汇总数据
 * 2. 录入定投记录
 */
import React from 'react';
import {
    Button 
} from 'antd';
import Link from 'next/link';
import TimingInvestmentList from '../containers/timing-investment/timing-investment-list';
import useTimingInvestmentList from '../effects/timing-investment-list';
import PageHeader from '../components/PageHeader';
import './css/timing-investment.scss';


/**
 * 页面主组件 
 */
function TimingInvestment() {
    const [data] = useTimingInvestmentList();
    const prefixCls = 'asi-page-timing-investment';

    return (
        <div className={`${prefixCls}-wrapper`}>
            <PageHeader
                name="定投"
            />
            <div className={`${prefixCls}-content common-body`}>
                <div
                    type="flex"
                    align="top"
                    gutter={16}
                    style={{ height: '40px' }}
                >
                    <div span={14}>
                        <Button 
                            // type="primary"
                            icon="plus-circle"
                            size="small"
                            style={{ float: 'right' }}
                        >
                            添加定投期初
                        </Button>
                    </div>
                    <div span={10}>
                        <Link 
                            href="/period-edit"
                        >
                            <a>
                                查看定投期初
                            </a>
                        </Link>
                    </div>
                </div>
                <TimingInvestmentList
                    data={data}
                />
            </div>
        </div>
    );
}

export default TimingInvestment;
