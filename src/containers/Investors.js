import React from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import Investors from '../module/Investors';

@inject('investors')
@observer
class InvestorsContainer extends React.Component {
    render() {
        const { investors } = this.props;

        // 处理数据添加key
        const datas = getSnapshot(investors).map((item) => {
            return Object.assign({}, item, {
                key: item.id
            });
        });

        return (
            <Investors investors={datas} />
        );
    }
}

export default InvestorsContainer;
