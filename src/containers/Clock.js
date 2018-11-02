import React from 'react';
import { inject, observer } from 'mobx-react';
import Clock from '../components/Clock';

@inject('clock') @observer
class ClockContainer extends React.Component {
    componentDidMount() {
        const { clock } = this.props;
        clock.start();
    }

    componentWillUnmount() {
        const { clock } = this.props;
        clock.stop();
    }

    render() {
        const { clock } = this.props;

        return (
            <Clock lastUpdate={clock.lastUpdate} light={clock.light} />
        );
    }
}

export default ClockContainer;
