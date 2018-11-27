/**
 * 资产配置组件
 */
import React from 'react';
import { observer, inject } from 'mobx-react';
import AssetDetailAllocation from '../module/AssetDetailAllocation';

@inject('assets', 'investorId')
@observer
class AssetDetailAllocationContainer extends React.Component {
    componentDidMount() {
        const { assets, investorId } = this.props;

        // load data
        assets.fetchAssets(investorId);
    }

    render() {
        const { assets } = this.props;
        
        return (
            <AssetDetailAllocation 
                data={assets.assetsData}
                onAmountEdited={assets.updateAsset}
            />
        );
    }
}

export default AssetDetailAllocationContainer;
