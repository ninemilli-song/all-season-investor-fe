import React from 'react';
import useBeginningData from '../effects/beginning-edit.js';
import PageHeader from '../components/PageHeader';
import BeginningForm from '../containers/invest-beginning/BeginningForm';
import BeginningList from '../containers/invest-beginning/BeginningList';
import withAuth from '../util/withAuth';
import './css/period-detail.scss';

/**
 * 期初编辑页面
 */
function InvestBeginning() {
    // 期初数据
    const [beginningData, fetchBeginningData] = useBeginningData();

    return (
        <div className="period-detail">
            <PageHeader
                name="定投期初"
            />
            <div className="common-body">
                <BeginningForm
                    onSubmited={() => {
                        fetchBeginningData();
                    }}
                />
                <BeginningList
                    data={beginningData}
                />
            </div>
        </div>
    );
}

export default withAuth(InvestBeginning);
