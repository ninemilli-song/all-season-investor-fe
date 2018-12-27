/**
 * 资产分析文本内容
 */
import React from 'react';
import PropTypes from 'prop-types';
import AssetDetailAnalysisDescriptionItem from './AssetDetailAnalysisDescriptionItem';
import './css/assetDetailAnalysisDescription.scss';

class AssetDetailAnalysisDescription extends React.Component {
    prefixCls = 'asset-detail-analysis-des'

    render() {
        const { data } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <div className={`${this.prefixCls}-left`}>
                    <AssetDetailAnalysisDescriptionItem 
                        data={data[0]}
                    />
                </div>
                <div className={`${this.prefixCls}-right`}>
                    <AssetDetailAnalysisDescriptionItem
                        data={data[1]}
                    />
                </div>
            </div>
        );
    }
}

AssetDetailAnalysisDescription.propType = {
    data: PropTypes.any
};

export default AssetDetailAnalysisDescription;
