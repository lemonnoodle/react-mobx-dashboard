import React from 'react';
import { Button, Icon, Modal, Input, Tree, Select, Form, Col } from 'antd';
import { createIphone } from '../../fetch/index';
import { openNotificationWithIcon, modalFormItemLayout } from '../../utils/layout';
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;

let modalKey = 0;
const isEmpty = (obj) => {
    for (let key in obj) {
        return false;
    }
    return true;
}
class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalKey: 0,
            trees: [],     //拓扑树结构(trees data structure)
            roots: ["-1"], //初始化时模拟一个虚拟的根节点，key为-1，提交给后端时再删除(init virtual roots)
            allNodes: [],  //所有节点，每个节点是唯一的(all nodes,each node is unique)
            topology: { "-1": [] },  //初始化拓扑结构，请求后端时删除-1的key(init virtual topology)
            rightClickNodeTreeItem: {},
        };
    }
    handleClick = () => {
        const visible = true;
        this.setState({ visible })
        this.props.idNameMaps["-1"] = "请构造iphone树(Start build topology)";
        this.renderTrees();
    }
    handleCancel = () => {
        const trees = [];
        const topology = { "-1": [] };
        const allNodes = [];
        const roots = ["-1"];
        modalKey++;
        this.setState({ topology, allNodes, roots, modalKey, trees, visible: false, rightClickNodeTreeItem: {} });
    }
    onRightClick = (e) => {
        this.setState({
            rightClickNodeTreeItem: {
                pageX: e.event.pageX,
                pageY: e.event.pageY,
                id: e.node.props['data-id'],
                categoryName: e.node.props['data-categoray']
            }
        });
    }
    onSelect = (node) => {
        this.setState({ rightClickNodeTreeItem: {} }, () => {
            console.log('rightNodeItem hideed');
        })
    }
    handleChange = (value) => {
        const { rightClickNodeTreeItem, topology, allNodes } = this.state;
        const parentId = rightClickNodeTreeItem.id;
        if (allNodes.indexOf(value) !== -1) {
            openNotificationWithIcon('error', 'error', 'node exists!', 2);
            return;
        }
        if (topology[parentId]) {
            topology[parentId].push(value);
        } else {
            topology[parentId] = [value];
        }
        allNodes.push(value);
        this.setState({ topology, allNodes, rightClickNodeTreeItem: {} });
        this.renderTrees();
    }
    renderTrees = () => {
        //递归渲染树结构(recurse structure)
        const appendChildren = (data, key) => {
            const node = { key }
            if (Array.isArray(data[key])) {
                node.children = data[key].map(child => appendChildren(data, child));
            } else {
                node.isLeaf = true;
            }
            return node;
        }
        const { topology, roots } = this.state;
        const trees = [];
        roots.forEach((r) => {
            trees.push(appendChildren(topology, r));
        })
        const visible = true;
        this.setState({ trees, visible });
    }
    //渲染右键的select列表(render rightclick select)
    getNodeTreeRightClickMenu = () => {
        if (isEmpty(this.state.rightClickNodeTreeItem)) {
            return null;
        } else {
            const { pageX, pageY } = { ...this.state.rightClickNodeTreeItem };
            const left = pageX - (document.body.clientWidth - 800) / 2;
            const top = pageY - 100;
            const tmpStyle = {
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
                width: '200px'
            };
            const options = this.props.options.map(d => <Option key={d.key}>{d.text}</Option>);
            const select = (
                <Select
                    style={tmpStyle}
                    showSearch
                    placeholder="please select iphone type"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {options}
                </Select>
            )
            return select;
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                const requestData = this.props.form.getFieldsValue();
                const topology = this.state.topology;
                if (topology["-1"]) {
                    topology["-1"].forEach((r) => {
                        if (!topology[r]) {
                            topology[r] = [];
                        }
                    })
                }
                requestData.topology = {};
                for (let i in topology) {
                    if (topology.hasOwnProperty(i)) requestData.topology[i] = topology[i];
                }
                //删除key为-1的虚拟节点(delete virtual node)
                delete requestData.topology["-1"];
                requestData.q = 'iphone';
                requestData.code = 'utf-8';
                createIphone(requestData).then(res => {
                    openNotificationWithIcon('success', 'success', 'done!', 1);
                    this.props.callbackIphone('succeed');
                    setTimeout(function () { this.handleCancel(); }.bind(this), 500);
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={this.props.idNameMaps[item.key]} key={item.key} data-id={item.key} data-categoray={this.props.idNameMaps[item.key]} >{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={this.props.idNameMaps[item.key]} key={item.key} data-id={item.key} data-categoray={this.props.idNameMaps[item.key]} isLeaf={item.isLeaf} />;
        });
        const trees = loop(this.state.trees);
        const defaultExpandAll = true;
        return (
            <div>
                <Button type="primary" className="mb-s" onClick={this.handleClick}>
                    <Icon type="plus" />Create
                </Button>
                <Modal
                    visible={this.state.visible}
                    title="Create iPhone"
                    onCancel={this.handleCancel}
                    footer={null}
                    width="800px"
                    key={this.state.modalKey}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...modalFormItemLayout}
                            label="Tree Name"
                            hasFeedback
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'please input name',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <Tree
                            showLine
                            onRightClick={this.onRightClick}
                            defaultExpandAll={defaultExpandAll}
                            autoExpandParent
                            onSelect={this.onSelect}
                        >
                            {trees}
                        </Tree>

                        <FormItem>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" size="large">Create</Button>
                            </Col>
                        </FormItem>
                    </Form>
                    {this.getNodeTreeRightClickMenu()}
                </Modal>
            </div>
        )
    }
}

const Create = Form.create()(CreateForm);
export default Create;
