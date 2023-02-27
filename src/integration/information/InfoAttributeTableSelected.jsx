import { Button, Input, Table } from "antd";
import React from "react";

const InfoAttributeTableSelected = ({ integration, setIntegration }) => {

    const selectedColumns = [
        { title: 'Name', dataIndex: 'key', key: 'name' },
        { title: 'Remove', key: 'action', align: 'center',
            render: (_, record) => <Button size="small" type="primary" danger onClick={() => removeFromIntegration(record)}>{"X"}</Button> 
        }
    ]

    const removeFromIntegration = (attr) => {
        const index = integration.attributes.indexOf(attr)
        const newAttributes = [...integration.attributes]
        newAttributes.splice(index, 1)
        setIntegration(prev => ({...prev, attributes: newAttributes}))
    }
    
    return (
        <>
        <Input disabled placeholder="Type to search" onChange={e => console.log(e.target.value)} />
        <Table  
            size="small"
            dataSource={integration.attributes}
            columns={selectedColumns}
            pagination={{ hideOnSinglePage: true }}
        />
        </>
    )
}

export default InfoAttributeTableSelected
