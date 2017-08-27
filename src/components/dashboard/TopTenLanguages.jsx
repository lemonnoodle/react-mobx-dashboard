import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'

const option = {
    title: {
        text: '2017 Top 10',
        subtext: 'ieee.org',
        x:'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    toolbox: {
		feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
			saveAsImage: {show: true}
		}
	},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['Python','C','Java','C++','C#','R','JavaScript','PHP','Go','Swift']
    },
    series: [
        {
            name: 'program',
            type: 'bar',
            data: [100, 99.7, 99.5, 97.1, 87.7, 87.7, 85.6, 81.2, 75.1, 73.7]
        }
    ]
};

const TopTenLanguages = () => (
    <ReactEchartsCore
        echarts={echarts}
        option={option}
        style={{height: '400px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default TopTenLanguages;
