import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'

let xAxisData = [];
let seriesInData = [];
let seriesOutData = [];
for (let i = 1; i <= 31; i++) {
    seriesOutData.push(Math.round(Math.random()*100));
    seriesInData.push(Math.round(Math.random()*10));
    xAxisData.push(i);
}

const option = {
    title: {
        text: 'Total Netflow'
    },
    legend: {
		data: [
		    'In(Tb)',
		    'Out(Tb)'
		],
		orient: 'horizontal',
		x: 'center',
		y: 'top'
    },
    tooltip: {
        trigger: 'axis',
    },
	calculable: true,
	toolbox: {
		feature: {
			mark: {show: true},
			dataView: {show: true, readOnly: false},
			restore: {show: true},
			dataZoom: {
				show: true,
				title: {
					dataZoom: 'datazoom',
					dataZoomReset: 'datazoomreset'
				}
			},
			saveAsImage: {show: true}
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		containLabel: true
    },
    series: [
        {
            data: seriesInData,
            name: 'In(Tb)',
            symbol: 'none',
            type: 'line',
            smooth: true
        },{
            data: seriesOutData,
            name: 'Out(Tb)',
            symbol: 'none',
            type: 'line',
            smooth: true
        }
    ],
    xAxis:[
        {
            boundaryGap: false,
            data: xAxisData,
            type: 'category'
        }
    ],
    yAxis: {}
};
const NetFlow = () => (
    <ReactEchartsCore
        echarts={echarts}
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default NetFlow;
