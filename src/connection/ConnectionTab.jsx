import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import ConnectionModal from "./ConnectionModal";
import CONNECTION_API from "../api/ConnectionApi";
import UTILS from "../utils";

const ConnectionTab = () => {

    const [showConnModal, setShowConnModal] = useState(false)
    const [conns, setConns] = useState([])
    const [selectedConn, setSelectedConn] = useState(undefined)

    useEffect(() => {
        CONNECTION_API.getAllConnections().then(data => setConns(data))
    }, [showConnModal])

    useEffect(() => {
        if(selectedConn && !showConnModal) {
            setShowConnModal(true)
        }
    }, [selectedConn])

    const columns = [
        { title: 'URL', key: 'url', dataIndex: 'url' },
        { title: 'Name', key: 'name', dataIndex: 'name' },
        { title: 'Driver', key: 'driver', dataIndex: 'driver' },
        { title: 'Database', key: 'database', dataIndex: 'database' },
        { title: 'Type', key: 'type', dataIndex: 'type' },
        { title: 'User', key: 'username', dataIndex: 'username' },
        { title: 'Active', key: 'isActive', dataIndex: 'isActive' },
        { title: 'Edit', key: 'edit', align: 'ccenter', 
            render: (_, record) => <Button size="small" type="primary" onClick={() => setSelectedConn({...record})}>Edit</Button>
        }
    ]

    return (
        <>
            <Button onClick={() => setSelectedConn(UTILS.getConnectionOrEmpty())}>New Connection</Button>
            <Button onClick={() => setSelectedConn(UTILS.getConnectionOrEmpty())}>New Dataset from CSV</Button>
            <ConnectionModal setShowModal={setShowConnModal} showModal={showConnModal} connectionId={selectedConn?.id} />

            <Table dataSource={conns} columns={columns} />
        </>
    )
}

export default ConnectionTab
