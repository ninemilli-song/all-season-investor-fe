/**
 * 资产分析文本内容
 */
import React from 'react';
import PropTypes from 'prop-types';
import './css/assetDetailAnalysisDescriptionItem.scss';

class AssetDetailAnalysisDescriptionItem extends React.Component {
    prefixCls = 'asset-detail-analysis-des-item'

    render() {
        const { data } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <div className={`${this.prefixCls}-title`}>
                    {
                        data ? data.title || '--' : '--'
                    }
                </div>
                <div className={`${this.prefixCls}-msg`}>
                    {
                        data ? data.analysis || '--' : '--'
                    }
                </div>
                <div className={`${this.prefixCls}-data`}>
                    <div className="rate">
                        <div className="current">
                            当前配比： 
                            <span>
                                { data ? `${data.rate * 100}%` : '--' }
                            </span>
                        </div>
                        <div className="suggest">
                            建议配比：
                            <span>
                                { data ? `${data.suggestRate * 100}%` : '--' }
                            </span>
                        </div>
                    </div>
                    <div className="amount">
                        <div className="current">
                            当前金额：
                            <span>
                                { data ? data.amount : '--' }
                            </span>
                        </div>
                        <div className="suggest">
                            建议金额：
                            <span>
                                { data ? data.suggestAmount : '--' }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AssetDetailAnalysisDescriptionItem.propType = {
    data: PropTypes.any
};

export default AssetDetailAnalysisDescriptionItem;
