import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getIphones } from '../../fetch/index';
import Create from './Create';
import Topology from './Topology';
import Mock from 'mockjs';
import $ from "jquery";
const Random = Mock.Random;
Random.date();
Random.word();

Mock.mock(/mockIphones/,{
    'ids|50':[{
        'key|+1': 1,
        'id|+1': 1,
        'type|1-7': 7,
        'version|1-11': 10,
        'creator': '@name()',
        'create_time': '@date',
    }]
})
class Iphone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            visible: false,
            loading: false,
            pagination: {},
            jobs: [],
            params: {}
        };
        this.options = [
            {key:1,text:'iphone1'},
            {key:2,text:'iphone2'},
            {key:3,text:'iphone3'},
            {key:4,text:'iphone4'},
            {key:5,text:'iphone5'},
            {key:6,text:'iphone6'},
            {key:7,text:'iphone7'},
        ]
        //id和name的对应关系，请求后端用id，渲染时为name(id:name maps structure;id for backend,name for render)
        this.idNameMaps = {
            1:'iphone1',2:'iphone2',3:'iphone3',4:'iphone4',5:'iphone5',6:'iphone6',7:'iphone7'
        }
        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        }, {
            title: 'iphone',
            dataIndex: 'type',
            sorter: (a, b) => a.type >= b.type ? 1 : -1,
        }, {
            title: 'ios version',
            dataIndex: 'version',
            sorter: (a, b) => a.version >= b.version ? 1 : -1,
        }, {
            title: 'creator',
            dataIndex: 'creator',
            sorter: (a, b) => a.creator >= b.creator ? 1 : -1,
        }, {
            title: 'create_time',
            dataIndex: 'create_time',
            sorter: (a, b) => a.create_time >= b.create_time ? 1 : -1,
        }, {
            title: 'Topology',
            dataIndex: 'visjs',
            render: (topoId, record, index) => {
                return (
                    <Topology topoId={topoId} idNameMaps={this.idNameMaps} options={this.options} />
                );
            },
        }]
    }
    componentDidMount() {
        $.ajax({
            url:'mockIphones'
        })
        .done(function(res) {
            let mockData = JSON.parse(res);
            let dataSource = mockData.ids;
            this.setState({dataSource});
        }.bind(this));
        const pagination = {
            showSizeChanger: true
        };
        this.setState({ pagination });
        const params = { 'page': 1, 'page_size': 10 };
        this.getIphoneList(params);
    }
    onChildChanged = (createState) => {
        if (createState === "succeed") {
            const params = { 'page': 1, 'page_size': 10 };
            this.getIphoneList(params);
        }
    }
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({ pagination: pager });
        const paginateParams = {};
        paginateParams.page = pagination.current;
        paginateParams.page_size = pagination.pageSize;
        this.getIphoneList(paginateParams);
    }
    getIphoneList = (params) => {
        this.setState({ loading: true });
        params.q = 'iphone';
        params.code = 'utf-8';
        getIphones(params).then(res => {
            let pagination = { ...this.state.pagination };
            pagination.total = 50;
            this.setState({ pagination, 'loading': false });
        });
    }
    render() {
        const title = () => 'Total: ' + this.state.pagination.total;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="ios" second="iPhone" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Create options={this.options} idNameMaps={this.idNameMaps} callbackIphone={this.onChildChanged} />
                                <Table
                                    title={title}
                                    dataSource={this.state.dataSource}
                                    columns={this.columns}
                                    pagination={this.state.pagination}
                                    loading={this.state.loading}
                                    onChange={this.handleTableChange}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Iphone;
