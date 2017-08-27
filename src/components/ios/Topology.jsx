import React from 'react';
import Graph from 'react-graph-vis'
import { Button, Modal } from 'antd';
import { getTopoByParam } from '../../fetch/index';
import { visOptions } from '../../utils/layout';

let modalKey = 0;
const events = {
    select: function(event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
    }
}
class Topology extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalKey: 0,
            topology: {},
            graph: {},
        };
        this.idNameMaps = this.props.idNameMaps;
    }
    handleClick = () => {
        const topoId = this.props.topoId;
        let params = {};
        params.q = 'iphone';
        params.code = 'utf-8';
        params.topoid = topoId;
        getTopoByParam(params).then(res => {
            //后端返回的数据结构如下(data structure from backend)
            let topology = {
                7:["6"],
                6:["5","4"],
                4:["3"],
                2:["1"],
            };
            let graph = {
                nodes: [],
                edges: [],
            }
            const color = () => {
                return '#' + Math.floor(0x1000000 + Math.random() * 0x1000000).toString(16).slice(1);
            }
            const tmpIds = [];
            for (let i in topology) {
                if (tmpIds.indexOf(i) === -1) {
                    tmpIds.push(i);
                    graph.nodes.push(
                        {id:i , label: this.idNameMaps[i], color:color(),heightConstraint: { minimum: 20 }, widthConstraint: { minimum:10,maxminum: 12 }}
                    )
                }
                if (topology[i].length > 0 ) {
                    topology[i].forEach((r) => {
                        if (tmpIds.indexOf(r) === -1) {
                            tmpIds.push(r);
                            graph.nodes.push(
                                {id:r , label: this.idNameMaps[r], color:color(),heightConstraint: { minimum: 20 }, widthConstraint: { minimum:10,maxminum: 12 }}
                            )
                        }
                        graph.edges.push(
                            {from: i, to: r}
                        )
                    })
                }
            }
            const visible = true;
            this.setState({graph,topology,visible});
        })
    }
    handleCancel = () => {
        this.setState({ visible: false });
        modalKey++;
        this.setState({modalKey});
    }
    render() {
        return (
            <div>
                <Button type="primary" className="mb-s" onClick={this.handleClick}>
                    Detail
                </Button>
                <Modal
                    visible={this.state.visible}
                    title="Topology"
                    style={{ top: 20 }}
                    onCancel={this.handleCancel}
                    footer={null}
                    width="900px"
                    key={this.state.modalKey}
                >
                    <Graph graph={this.state.graph} style={{ width: '100%', height: '480px'}} options={visOptions} events={events} />
                </Modal>
             </div>
        )
    }
}

export default Topology;
