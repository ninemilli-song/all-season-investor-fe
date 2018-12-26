/**
 * 资产分析汇总
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

@inject('assets')
@observer
class AssetDetailAnalysis extends React.Component {
    componentDidMount() {
        const { assets } = this.props;

        assets.fetchAssetAnalyses();
    }

    getOption = () => {
        const posList = [
            'left', 'right', 'top', 'bottom',
            'inside',
            'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
            'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ];

        const app = {};
        
        app.configParameters = {
            rotate: {
                min: -90,
                max: 90
            },
            align: {
                options: {
                    left: 'left',
                    center: 'center',
                    right: 'right'
                }
            },
            verticalAlign: {
                options: {
                    top: 'top',
                    middle: 'middle',
                    bottom: 'bottom'
                }
            },
            position: {
                options: echarts.util.reduce(posList, (map, pos) => {
                    map[pos] = pos;
                    return map;
                }, {})
            },
            distance: {
                min: 0,
                max: 100
            }
        };

        app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15
        };

        const labelOption = {
            normal: {
                show: true,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        };

        const option = {
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Forest', 'Steppe', 'Desert', 'Wetland']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    data: ['2012', '2013', '2014', '2015', '2016']
                }
            ],
            yAxis: [
                {
                    show: false,
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Forest',
                    type: 'bar',
                    barGap: '10%',
                    label: labelOption,
                    data: [320, 332, 301, 334, 390]
                },
                {
                    name: 'Steppe',
                    type: 'bar',
                    label: labelOption,
                    data: [220, 182, 191, 234, 290]
                },
                {
                    name: 'Desert',
                    type: 'bar',
                    label: labelOption,
                    data: [150, 232, 201, 154, 190]
                },
                {
                    name: 'Wetland',
                    type: 'bar',
                    label: labelOption,
                    data: [98, 77, 101, 99, 40]
                }
            ]
        };
        return option;
    }

    onChartReadyCallback = () => {
        console.log('echarts has ready!');
    }

    // echarts_for_react instance
    echartsReact

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
