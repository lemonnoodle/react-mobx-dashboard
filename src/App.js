import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
const { Content, Footer } = Layout;
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';

class App extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout className="ant-layout-has-sider">
              <SiderCustom path={this.props.location.pathname} collapsed={this.state.collapsed} />
              <Layout>
                <HeaderCustom toggle={this.toggle} />
                <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                  {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  Dashboard ©2017 <a href="https://github.com/lemonnoodle/react-mobx-dashboard" target="_blank"><Icon type="github" />github</a>
                </Footer>
              </Layout>
            </Layout>
        );
    }
}

export default App;
