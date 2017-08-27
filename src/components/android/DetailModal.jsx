import { Modal, Button } from 'antd';
import React from 'react';

class DetailModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Detail
                </Button>
                <Modal
                    visible={this.state.visible}
                    title="CandleDetail"
                    onCancel={this.handleCancel}
                    width="750px"
                    footer={[
                    <Button key="back" type="primary" size="large" onClick={this.handleCancel}>Cancel</Button>,
                    ]}
                >
                    <span>{this.props.text}</span>
                </Modal>
            </div>
        )
    }
}

export default DetailModal;
