/**
 * 资产分析汇总
 */
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('assets')
@observer
class AssetDetailAnalysis extends React.Component {
    componentDidMount() {
        const { assets } = this.props;

        assets.fetchAssetAnalyses();
    }

    render() {
        const { assets } = this.props;

        return (
            <div>
                <h3>
                    {'资产类型比例'}
                </h3>
                {
                    assets.assetAnalyses && assets.assetAnalyses.length > 0 ? (
                        <div>
                            AssetDetailAnalysis have data
                        </div>
                    ) : (
                        <div>AssetDetailAnalysis Loading……</div>
                    )
                }
            </div>
        );
    }
}

export default AssetDetailAnalysis;
