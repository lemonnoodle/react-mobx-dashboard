import React from 'react';
import { Row, Col, Card, Icon, Timeline } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import NetFlow from './NetFlow';
import TopTenLanguages from './TopTenLanguages';
import MobileOrder from './MobileOrder';
import { cardResponsive, chartResponsive } from '../../utils/layout';


class Dashboard extends React.Component {
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />

                <Row gutter={10}>
                    <Col className="gutter-row" {...cardResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="pay-circle" style={{ fontSize: 30, color: '#ffd700' }} />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Account</div>
                                        <h2>38901192.75</h2>
                                        <Icon type="arrow-up" style={{ fontSize: 5, color: 'green' }} />from last month 15%
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" {...cardResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="shopping-cart" style={{ fontSize: 30, color: 'red' }} />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Order</div>
                                        <h2>689899</h2>
                                        <Icon type="arrow-up" style={{ fontSize: 5, color: 'green' }} />from last month 5%
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" {...cardResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="user" style={{ fontSize: 30, color: 'gray' }} />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">User</div>
                                        <h2>8236120</h2>
                                        <Icon type="arrow-down" style={{ fontSize: 5, color: 'red' }} />from last month 12%
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" {...cardResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="like" style={{ fontSize: 30, color: 'black' }} />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Like</div>
                                        <h2>1990</h2>
                                        <Icon type="arrow-down" style={{ fontSize: 5, color: 'red' }} />from last month 10%
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" {...cardResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="shop" style={{ fontSize: 30, color: '#f4a460' }} />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Store</div>
                                        <h2>2008</h2>
                                        <Icon type="arrow-up" style={{ fontSize: 5, color: 'green' }} />from last month 8%
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" {...cardResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="message" style={{ fontSize: 30, color: '#32cd32' }} />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Messages</div>
                                        <h2>992291</h2>
                                        <Icon type="arrow-down" style={{ fontSize: 5, color: 'red' }} />from last month 29%
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <NetFlow />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" {...chartResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <TopTenLanguages />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" {...chartResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <MobileOrder />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" {...chartResponsive}>
                        <div className="gutter-box">
                            <Card bordered={false} style={{ height: '450px'}}>
                                <Timeline>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>Solve initial network problems 1</p>
                                        <p>Solve initial network problems 2</p>
                                        <p>Solve initial network problems 3 2015-09-01</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="blue">
                                        <p>Technical testing 1</p>
                                        <p>Technical testing 2</p>
                                        <p>Technical testing 3 2015-09-01</p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>Technical testing 4</p>
                                        <p>Technical testing 5</p>
                                        <p>Technical testing 6 2015-09-01</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;
