import { Checkbox, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import CONNECTION_API from "../api/ConnectionApi";
import UTILS from '../utils'

const ConnectionModal = ({ showModal, setShowModal, connectionId }) => {

    const [conn, setConn] = useState(UTILS.getConnectionOrEmpty())

    useEffect(() => {
        if(connectionId) {
            CONNECTION_API.getConnection(connectionId).then(data => setConn(data))
        } else {
            setConn(UTILS.getConnectionOrEmpty())
        }
    }, [connectionId, showModal])

    const save = () => {
        return CONNECTION_API.saveConnection(conn)
            .then(data => setConn(data))
            .catch(err => console.log("handle error ", err)) 
    }

    return (
        <Modal 
            title="New Connection" 
            open={showModal} 
            onOk={() => save().then(r => setShowModal(false))}
            onCancel={() => setShowModal(false)}
        >
            <Form>
                <Form.Item label="URL">
                    <Input value={conn.url} onChange={e => setConn(prev => ({...prev, url: e.target.value}))} />
                </Form.Item>
                <Form.Item label="Dataset Name">
                    <Input value={conn.name} onChange={e => setConn(prev => ({...prev, name: e.target.value}))} />
                </Form.Item>
                <Form.Item label="Driver">
                    <Input value={conn.driver} onChange={e => setConn(prev => ({...prev, driver: e.target.value}))} />
                </Form.Item>
                <Form.Item label="Database / Collection">
                    <Input value={conn.database} onChange={e => setConn(prev => ({...prev, database: e.target.value}))} />
                </Form.Item>
                <Form.Item label="Database Type">
                    <Select onSelect={e => setConn(prev => ({...prev, type: e}))} value={conn.type}>
                        <Select.Option value="Postgres">Postgres</Select.Option>
                        <Select.Option value="MariaDB">MariaDB</Select.Option>
                        <Select.Option value="Oracle">Oracle</Select.Option>
                        <Select.Option value="MySQL">MySQL</Select.Option>
                        <Select.Option value="Mongo">Mongo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Username">
                    <Input value={conn.username} onChange={e => setConn(prev => ({...prev, username: e.target.value}))} />
                </Form.Item>
                <Form.Item label="Password">
                    <Input  value={conn.password} onChange={e => setConn(prev => ({...prev, password: e.target.value}))} />
                </Form.Item>
                <Form.Item label="Is Active">
                    <Checkbox checked={conn.isActive} onChange={e => setConn(prev => ({...prev, isActive: e.target.checked}))} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ConnectionModal
