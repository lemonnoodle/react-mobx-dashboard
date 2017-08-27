import React from 'react';
import { observer } from 'mobx-react';
import { Card, Row, Col, Table, Form, Button, Icon, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import BreadcrumbCustom from '../BreadcrumbCustom';
import { formItemLayout, searchLayout } from '../../utils/layout';
import Create from './Create';
import SearchList from '../common/SearchList';
import DetailModal from './DetailModal';
import NougatStore from '../../mobx/android/Nougat';
import Mock from 'mockjs';
import $ from "jquery";
const store = new NougatStore();
let { getDataSource } = store;
const Random = Mock.Random;
Random.date();
Random.word();

Mock.mock(/getDatas/,{
    'ids|50':[{
        'key|+1': 1,
        'id|+1': 1,
        'name': '@name()',
        'mobile_os|+1': [
            "Android",
            "iOS",
            "Symbian",
            "Windows Phone",
            "BlackBerry",
            "Other",
        ],
        'search': '@word',
        'create_time': '@date',
        'detail': 'I am a modal',
    }]
})
@observer
class NougatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'tableData' : []
        }
        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        }, {
            title: 'name',
            dataIndex: 'name',
            sorter: (a, b) => a.name >= b.name ? 1 : -1,
        }, {
            title: 'operating system',
            dataIndex: 'mobile_os',
            sorter: (a, b) => a.type_name >= b.type_name ? 1 : -1,
        }, {
            title: 'search',
            dataIndex: 'search',
            sorter: (a, b) => a.input >= b.input ? 1 : -1,
        }, {
            title: 'create_time',
            dataIndex: 'create_time',
            sorter: (a, b) => Date.parse(a.create_time) - Date.parse(b.create_time),
        }, {
            title: 'detail',
            dataIndex: 'detail',
            render: (text, record, index) => {
                return (
                    <DetailModal text={text} />
                );
            },
        }];
    }
    componentDidMount() {
        let { params, data } = store;
        getDataSource(params);
        //mock data
        let dataSource = data.slice();
        $.ajax({
            url:'getDatas'
        })
        .done(function(res) {
            let mockData = JSON.parse(res);
            let tableData = [...mockData.ids, ...dataSource];
            this.setState({tableData});
        }.bind(this));
    }
    handleTableChange = (tablePagination) => {
        let { pagination, getDataSource, params } = store;
        params.page = pagination.page = tablePagination.current;
        params.page_size = pagination.page_size = tablePagination.pageSize;
        getDataSource(params);
    }
    handleReset = () => {
        this.props.form.resetFields();
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let queryParam = this.props.form.getFieldsValue();
                let { params, getDataSource } = store;
                for (let i in queryParam) {
                    params[i] = queryParam[i];
                }
                getDataSource(params);
            }
            return;
        });
    }
    render() {
        let { loading, pagination } = store;
        let { getFieldDecorator } = this.props.form;
        let title = () => 'Total: ' + pagination.total;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="Android" second="naugat" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form
                                    className="ant-advanced-search-form"
                                    onSubmit={this.handleSearch}
                                >
                                    <Row gutter={16}>
                                        <Col {...searchLayout}>
                                            <FormItem {...formItemLayout} label="Name">
                                                {getFieldDecorator('name')(
                                                    <Input placeholder="please input name" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col {...searchLayout}>
                                            <FormItem {...formItemLayout} label="OS">
                                                {getFieldDecorator('mobile_os')(
                                                    <Select
                                                        showSearch
                                                        placeholder="please select os"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        <Option key={1} value="iOS">iOS</Option>
                                                        <Option key={2} value="Android">Android</Option>
                                                        <Option key={3} value="Symbian">Symbian</Option>
                                                        <Option key={4} value="WindowsPhone">Windows Phone</Option>
                                                        <Option key={5} value="BlackBerry">BlackBerry</Option>
                                                        <Option key={6} value="Other">Other</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col {...searchLayout}>
                                            <SearchList getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} store={store} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <Button type="primary" htmlType="submit"><Icon type="search" />Search</Button>
                                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>Clear</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Create store={store} />
                                <Table
                                    title={title}
                                    dataSource={this.state.tableData}
                                    columns={this.columns}
                                    pagination={pagination}
                                    loading={loading}
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

const Nougat = Form.create()(NougatForm);
export default Nougat;
