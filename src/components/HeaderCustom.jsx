import React, { Component } from 'react';
import { Menu, Icon, Layout, Badge } from 'antd';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import screenfull from 'screenfull';
import avater from '../style/imgs/paratrooper.jpg';


class HeaderCustom extends Component {
    state = {
        user: 'kim'
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    };
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                <Icon
                    className="trigger custom-trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="mail" />
                        </Badge>
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img src={avater} alt="avater" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="UserCenter">
                            <Menu.Item key="setting:1">Hi - {this.state.user}</Menu.Item>
                            <Menu.Item key="setting:2">Profile</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="Settings">
                            <Menu.Item key="setting:3">Setting</Menu.Item>
                            <Menu.Item key="setting:4">Exit</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

export default HeaderCustom;
