import React from 'react';
import { inject, observer } from 'mobx-react';
import Investors from '../module/Investors';

@inject('investors')
@observer
class InvestorsContainer extends React.Component {
    render() {
        const { investors } = this.props;

        return (
            <Investors investors={investors} />
        );
    }
}

export default InvestorsContainer;
