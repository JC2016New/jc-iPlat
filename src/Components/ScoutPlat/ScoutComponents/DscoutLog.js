import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Table, Icon, Button, Modal, Tooltip, Popover } from 'antd';

import { httpAjax, addressUrl } from '../../../Util/httpAjax';
class ScoutLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            viewLog: false,
            logContent: ''
        }
    }
    componentWillMount() {
        const ajbh = sessionStorage.getItem("ajbh");
        const reqUrl = addressUrl + `/timeNode/list?ajbh=${ajbh}`
        httpAjax("get", reqUrl, ).then(res => {
            console.log("res", res)
            if (res.code === '200') {
                this.setState({ dataSource: res.data })
            }
        })
    }

    //遍历日志类型
    mapLogType = (type) => {
        switch (type) {
            case "RETURN_CLUE":
                return '线索';
                break;
            case "INFO":
                return '线索';
                break;
        }
    }
    render() {
        const { dataSource } = this.state;
        console.log("render", this.props)
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '操作时间',
            dataIndex: 'lrsj',
            key: 'lrsj',
        }, {
            title: '所属单位',
            dataIndex: 'sendOrgName',
            key: 'sendOrgName',
        }, {
            title: '所属人员',
            dataIndex: 'lrrymc',
            key: 'lrrymc',
        }, {
            title: '日志类型',
            dataIndex: 'referenceType',
            key: 'referenceType',
            render: (text, record, index) => {
                return this.mapLogType(text)
            }
        }, {
            title: '日志描述',
            dataIndex: 'content',
            key: 'content',
            align: "center",
            render: (text, record, index) => {
                return <Icon type="eye" title="点击查看" style={{ cursor: "pointer" }} onClick={() => {
                    this.setState({ viewLog: true, logContent: text })
                }} />
            }
        }, {
            title: '附件',
            dataIndex: 'address',
            render: (text, record, index) => {
                return <div>
                    附件
                </div>
            }
        }];
        return (
            <div>
                <Table columns={columns} dataSource={dataSource} pagination={false} rowKey='id' bordered />
                <Modal visible={this.state.viewLog} title='日志描述' onCancel={() => { this.setState({ viewLog: false }) }} footer={null}>
                    {this.state.logContent}
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        timeNode: state.timeNode
    }
}
export default connect(mapStateToProps)(ScoutLog);