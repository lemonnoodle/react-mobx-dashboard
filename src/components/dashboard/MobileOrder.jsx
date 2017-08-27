import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'

const option = {
    title : {
        text: 'Mobile Order',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['iOS','Android','Symbian','Windows Phone','Blackberry','Other']
    },
    toolbox: {
		feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
			saveAsImage: {show: true}
		}
	},
    series : [
        {
            name: 'order',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:20, name:'Other'},
                {value:89, name:'Blackberry'},
                {value:131, name:'Windows Phone'},
                {value:151, name:'Symbian'},
                {value:399, name:'Android'},
                {value:399, name:'iOS'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


const MobileOrder = () => (
    <ReactEchartsCore
        echarts={echarts}
        option={option}
        style={{height: '400px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default MobileOrder;
