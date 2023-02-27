import { Button, Select, Table } from "antd";
import React from "react";
import UTILS from '../../utils'
import { DeleteOutlined } from "@ant-design/icons";

const DataRelationsTable = ({ integration, setIntegration }) => {

    const attributeOptions = integration.attributes.map(attr => ({ label: attr.key, key: attr.key, value: attr.key }))

    const addNewRelation = () => {
        const newRelations = UTILS.getWithNewRelation(integration.relations)
        setIntegration(prev => ({...prev, relations: newRelations}))
    }

    const removeRelation = (relation) => {
        const newRelations = [...integration.relations]
        const index = newRelations.indexOf(relation)
        newRelations.splice(index, 1)
        setIntegration(prev => ({...prev, relations: newRelations}))
    }
    
    const relationsColumns = [
        { title: 'Order', key: 'order', dataIndex: 'order', align: 'center', width: '10px' },

        { title: 'Attribute 1', key: 'attribute1', width: "480px",
            render: (_, record) => <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Choose attribute 1"
                value={record.attribute1.key}
                optionFilterProp="children"
                filterOption={(input, opt) => (opt?.key ?? '').toLowerCase().includes(input.toLowerCase()) }
                options={attributeOptions}
                onChange={e => {
                    const newRelations = [...integration.relations]
                    const index = newRelations.indexOf(record)
                    newRelations[index].attribute1 = integration.attributes.find(attr => attr.key == e)
                    setIntegration(prev => ({...prev, relations: newRelations }))
                }}
            /> 
        },

        { title: 'Attribute 2', key: 'attribute2', width: "480px",
            render: (_, record) => <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Choose attribute 2"
                value={record.attribute2.key}
                optionFilterProp="children"
                filterOption={(input, opt) => (opt?.key ?? '').toLowerCase().includes(input.toLowerCase()) }
                options={attributeOptions}
                onChange={e => {
                    const newRelations = [...integration.relations]
                    const index = newRelations.indexOf(record)
                    newRelations[index].attribute2 = integration.attributes.find(attr => attr.key == e)
                    setIntegration(prev => ({...prev, relations: newRelations }))
                }}
            /> 
        },

        { title: '', width: '100px',
            render: (_, record) => <Select 
                value={record.condition} 
                style={{ width: "100%" }}
                onChange={e => {
                    const newRelations = [...integration.relations]
                    const index = newRelations.indexOf(record)
                    newRelations[index].condition = e
                    setIntegration(prev => ({...prev, relations: newRelations }))
                }}
            >
                <Select.Option key="AND" value="AND">AND</Select.Option>
                <Select.Option key="OR" value="OR">OR</Select.Option>
                <Select.Option key="XOR" value="XOR">XOR</Select.Option>
            </Select>
        },

        { title: 'Remove', width: '50px', align: 'center',
            render: (_, record) => <Button type="primary" danger onClick={() => removeRelation(record)}><DeleteOutlined /></Button>
        }
    ]

    return (
        <>
        <Button onClick={() => addNewRelation()} type="primary" size="small">Add Relation</Button>
        <Table
            pagination={{ hideOnSinglePage: true }}
            size="small"
            dataSource={integration.relations}
            columns={relationsColumns}
        />
        </>
    )
}

export default DataRelationsTable
