import { Button, Input, Select, Table } from "antd";
import React from "react";
import UTILS from "../../utils";
import { DeleteOutlined } from "@ant-design/icons";

const DataConditionsTable = ({integration, setIntegration}) => {

    const attributeOptions = integration.attributes.map(attr => ({ label: attr.key, key: attr.key, value: attr.key }))

    const addNewCondition = () => {
        const newConditions = UTILS.getWithNewCondition(integration.conditions)
        setIntegration(prev => ({...prev, conditions: newConditions}))
    }

    const removeCondition = (condition) => {
        const newConditions = [...integration.conditions]
        const index = newConditions.indexOf(condition)
        newConditions.splice(index, 1)
        setIntegration(prev => ({...prev, conditions: newConditions}))
    }

    const conditionsColumns = [
        { title: 'Order', key: 'order', dataIndex: 'order', align: 'center', width: '10px' },

        { title: 'Attribute', key: 'attribute', width: "600px",
            render: (_, record) => <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Choose attribute"
                value={record.attribute.key}
                optionFilterProp="children"
                filterOption={(input, opt) => (opt?.key ?? '').toLowerCase().includes(input.toLowerCase()) }
                options={attributeOptions}
                onChange={e => {
                    const newConditions = [...integration.conditions]
                    const index = newConditions.indexOf(record)
                    newConditions[index].attribute = integration.attributes.find(attr => attr.key == e)
                    setIntegration(prev => ({...prev, conditions: newConditions }))
                }}
            /> 
        },

        { title: 'Expression', key: 'expression', 
            render: (_, record) => <div style={{ display: "flex" }}>
                <Select
                    value={record.operator} 
                    style={{ width: "150px" }}
                    onChange={e => {
                        const newConditions = [...integration.conditions]
                        const index = newConditions.indexOf(record)
                        newConditions[index].operator = e
                        setIntegration(prev => ({...prev, conditions: newConditions }))
                    }}
                >
                    {UTILS.SIGNALS.map(sig => <Select.Option value={sig.value} key={sig.value}>{sig.text}</Select.Option>)}
                </Select>
                <Input
                    placeholder="Write some value..."
                    value={record.expression}
                    onChange={e => {
                        const newConditions = [...integration.conditions]
                        const index = newConditions.indexOf(record)
                        newConditions[index].expression = e.target.value
                        setIntegration(prev => ({...prev, conditions: newConditions }))
                    }}
                /> 
            </div> 
        },


        { title: 'Remove', width: '50px', align: 'center',
            render: (_, record) => <Button type="primary" danger onClick={() => removeCondition(record)}><DeleteOutlined /></Button>
        }
    ]

    return (
        <>
        <Button type="primary" size="small" onClick={() => addNewCondition()}>Add Condition</Button>
        <Table 
            pagination={{ hideOnSinglePage: true }}
            dataSource={integration.conditions}
            size="small"
            columns={conditionsColumns}
        />
        </>
    )
}

export default DataConditionsTable
