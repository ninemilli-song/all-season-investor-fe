/**
 * 资产分析汇总
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import Spin from 'antd/lib/spin';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
// import 'echarts/lib/component/tooltip';
import echartsConfig from '../../util/echartsConfig';
import AssetDetailAnalysisDescription from '../../components/AssetDetailAnalysisDescription';
import LoadingIcon from '../../components/LoadingIcon';
import './style.scss';

@inject(stores => ({
    assets: stores.store.asset,
    investorId: stores.investorId
}))
@observer
class AssetAnalysis extends React.Component {
    prefixCls = 'asset-detail-analysis'

    componentDidMount() {
        const { assets, investorId } = this.props;

        assets.fetchAssetAnalyses(investorId);
    }

    /**
     * 获取生析图表配置数据
     */
    getOption = () => {
        const { assets } = this.props;

        const currentData = {
            name: '当前配置金额',
            data: []
        };

        const suggestData = {
            name: '建议配置金额',
            data: []
        };

        const bucketLabel = [];
        assets.assetAnalyses.forEach((item) => {
            // 水桶数据 类目配置数据
            bucketLabel.push(item.bucket.name);

            // 当前系列数据
            currentData.data.push(item.rate);

            // 建议系列数据
            suggestData.data.push(item.suggestRate);
        });

        // 生成分析图表配置数据
        const option = echartsConfig.genAnylysisOption(bucketLabel, [currentData, suggestData]);

        return option;
    }

    onChartReadyCallback = () => {
        console.log('echarts has ready!');
    }

    // echarts_for_react instance
    echartsReact

    render() {
        const { assets } = this.props;

        // const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

        return (
            <div className={this.prefixCls}>
                <h3>
                    {'资产类型比例'}
                </h3>
                {
                    assets.assetAnalyses && assets.assetAnalyses.length > 0 ? (
                        <div className={`${this.prefixCls}-content`}>
                            <ReactEchartsCore
                                ref={(e) => { this.echartsReact = e; }}
                                echarts={echarts}
                                option={this.getOption()}
                                notMerge
                                lazyUpdate
                                theme="theme_name"
                                onChartReady={this.onChartReadyCallback}
                                // onEvents={EventsDict}
                                // opts={} 
                            />
                            <AssetDetailAnalysisDescription 
                                data={assets.assetAnalyses}
                            />
                        </div>
                    ) : (
                        <div className={`${this.prefixCls}-loading`}>
                            <Spin indicator={LoadingIcon()} />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default AssetAnalysis;
