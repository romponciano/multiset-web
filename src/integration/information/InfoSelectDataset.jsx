import React, { useEffect, useState } from "react";
import CONNECTION_API from "../../api/ConnectionApi";
import { Form, Select } from "antd";

const InfoSelectDataset = ({
    selectedConnection,
    setSelectedConnection,
    setSelectedTable
}) => {

    const [connections, setConnections] = useState([])
    const [tables, setTables] = useState([])

    useEffect(() => {
        CONNECTION_API
            .getAllConnections()
            .then(data => setConnections(data ?? []))
    }, [])
    
    useEffect(() => {
        if(selectedConnection) {
            CONNECTION_API
                .getAllTablesFrom(selectedConnection.id)
                .then(data => setTables(data ?? []))
        }
    }, [selectedConnection])

    const onSelectTable = (name) => {
        setSelectedTable(tables.find(tab => tab.name == name))
    }

    return (
        <Form layout="inline" size="small">
            <Form.Item label="Select Dataset">
                <Select style={{ width: "200px" }} onSelect={id => setSelectedConnection(connections?.find(conn => conn.id == id))}>
                    {connections.map(conn => <Select.Option key={conn.id} value={conn.id}>{conn.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item label="Select Table">
                <Select style={{ width: "200px" }} onSelect={e => onSelectTable(e)}>
                    {tables.map(tab => <Select.Option value={tab.name} key={tab.name}>{tab.name}</Select.Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
}

export default InfoSelectDataset
