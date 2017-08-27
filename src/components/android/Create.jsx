import React from 'react';
import { Form, Button, Modal, Icon, Mention } from 'antd';
import { openNotificationWithIcon, tailFormItemLayout, modalFormItemLayout } from '../../utils/layout';
const { toString, toContentState } = Mention;
const FormItem = Form.Item;

const suggestions = ['iOS','Android','Symbian','WindowsPhone','BlackBerry','Other'];
let modalKey = 0;
class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalKey: 0,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                //开始拼装请求参数(build params)
                let formParams = {};
                const requestData = this.props.form.getFieldsValue();
                delete requestData['keys'];
                for (let i in requestData) {
                    formParams[i] = toString(requestData[i])
                }
                const { addData, params, getDataSource } = this.props.store;
                addData(formParams).then(res => {
                    openNotificationWithIcon('success', 'success', 'Done!', 1);
                    getDataSource(params);
                    modalKey++;
                    setTimeout(function () { this.setState({ visible: false, modalKey }); }.bind(this), 500);
                })
            }
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
        modalKey++;
        this.setState({ modalKey });
    }
    showModal = () => {
        this.setState({ visible: true });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type="primary" className="mb-s" onClick={this.showModal}>
                    <Icon type="plus" />Create
                </Button>
                <Modal
                    key={this.state.modalKey}
                    visible={this.state.visible}
                    title="Create Candle (input $ to suggestions)"
                    onCancel={this.handleCancel}
                    footer={null}
                    width="800px"
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...modalFormItemLayout}
                            label="name"
                        >
                            {getFieldDecorator("name", {
                                    rules: [{
                                        required: true, message: 'please input name',
                                    }],
                                })(
                                    <Mention
                                        suggestions={suggestions}
                                        style={{ height: 32 }}
                                        prefix={['$']}
                                        placeholder="please input name"
                                    />
                            )}
                        </FormItem >
                        <FormItem
                            {...modalFormItemLayout}
                            label="candle"
                        >
                            {getFieldDecorator("candle", {
                                    rules: [{
                                        required: true, message: 'please input name',
                                    }],
                                })(
                                    <Mention
                                        suggestions={suggestions}
                                        style={{ height: 32 }}
                                        prefix={['$']}
                                        placeholder="please input candle name"
                                    />
                            )}
                        </FormItem >
                        <FormItem
                            {...modalFormItemLayout}
                            label="email"
                        >
                            {getFieldDecorator("email",)(
                                    <Mention
                                        suggestions={suggestions}
                                        style={{ height: 32 }}
                                        prefix={['$']}
                                        placeholder="please input email"
                                    />
                            )}
                        </FormItem >
                        <FormItem
                            {...modalFormItemLayout}
                            label="address"
                        >
                            {getFieldDecorator("address")(
                                    <Mention
                                        suggestions={suggestions}
                                        style={{ height: 32 }}
                                        prefix={['$']}
                                        placeholder="please input address"
                                    />
                            )}
                        </FormItem >
                        <FormItem
                            {...modalFormItemLayout}
                            label="phone"
                        >
                            {getFieldDecorator("phone", {
                                    initialValue: toContentState("+86)")
                                })(
                                    <Mention
                                        suggestions={suggestions}
                                        style={{ height: 32 }}
                                        prefix={['$']}
                                        placeholder="please input contact"
                                    />
                            )}
                        </FormItem >
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">Create</Button>
                            <Button key="back" size="large" onClick={this.handleCancel}>Cancel</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const Create = Form.create()(CreateForm);
export default Create;
