/**
 * 定投详情列表页
 */
import React from 'react';
import { useRouter } from 'next/router';
import PageHeader from '../../../components/PageHeader';
import TimingInvestmentFormWrapped from '../../../containers/timing-investment/timing-investment-form';
import useTimingInvestmentRecord from '../../../effects/timing-investment-record';
import TimingInvestmentDetailList from '../../../containers/timing-investment/timing-investment-detail-list';

function TimingInvestmentDetail() {
    // const prefixCls = 'timeing-investment-detail';
    const router = useRouter();
    /**
     * name - 基金名称
     * id - 基金id
     */
    const { name, id } = router.query;
    // 获取定投记录列表数据
    const [records, fetchData, deleteRecord] = useTimingInvestmentRecord(id);

    return (
        <div>
            <PageHeader
                name={name}
            />
            <div className="common-body">
                <TimingInvestmentFormWrapped 
                    fundId={id}
                    onSubmited={() => fetchData(id)}
                />
                <TimingInvestmentDetailList 
                    data={records}
                    onDeleteRecord={(recordId) => {
                        deleteRecord(recordId);
                    }}
                />
            </div>
        </div>
    );
}

// TimingInvestmentDetail.getInitialProps = async ({ query }) => {
//     const { id, name } = query;
//     const res = await axios.get('invest-record/', {
//         params: {
//             fund: id
//         }
//     });

//     return {
//         'records': res,
//         name
//     };
// };

export default TimingInvestmentDetail;
