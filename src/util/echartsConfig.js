// import echarts from 'echarts/lib/echarts';


const app = {};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15
};

/**
 * label 样式配置模板
 */
const labelOption = {
    normal: {
        show: true,
        // position: app.config.position,
        // distance: app.config.distance,
        // align: app.config.align,
        // verticalAlign: app.config.verticalAlign,
        // rotate: app.config.rotate,
        formatter: (params) => {
            const { value } = params;
            return `${value * 100}%`;
        },
        fontSize: 16,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    }
};

/**
 * 分析图表
 * 系列数据配置模板
 */
app.anaylysisSeriesConfig = {
    name: 'default',
    type: 'bar',
    barGap: '10%',
    barWidth: 50,
    label: labelOption
};

/**
 * 分析图表配置模板
 */
const anylysisOption = {
    color: ['#e5323e', '#4cabce', '#003366', '#006699'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        icon: 'circle',
        borderRadius: 10,
        // data: ['当前配置金额', '建议配置金额']
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            axisLine: { show: false },
            axisTick: { show: false }
        }
    ],
    yAxis: [
        {
            show: false,
            type: 'value'
        }
    ],
    series: []
};

/**
 * Generate anylysis chart options
 * @param {*} categorys ex: ['风险/成长', '安全/安心']
 * @param {*} seriesData 
 * ex: [{
            name: '当前',
            data: [320, 332]
        },
        {
            name: '建议',
            data: [220, 182]
        }]
 */
function genAnylysisOption(categorys = [], seriesData = []) {
    // 图例配置
    const legendOpts = [];
    // 设置类目数据
    anylysisOption.xAxis[0].data = categorys;

    const series = [];
    seriesData.forEach((item) => {
        // 设置系列数据
        series.push(Object.assign({}, app.anaylysisSeriesConfig, item));
        // 设置图例数据
        legendOpts.push(item.name);
    });
    anylysisOption.series = series;
    anylysisOption.legend.data = legendOpts;

    return anylysisOption;
}

export default {
    genAnylysisOption
};
