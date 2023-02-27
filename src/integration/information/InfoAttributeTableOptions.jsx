import { Button, Input, Table } from "antd";
import React, { useEffect, useState } from "react";

const InfoAttributeTableOptions = ({integration, setIntegration, attributeOptions}) => {

    const addColumns = [
        { title: 'Name', dataIndex: 'key', key: 'name' },
        { title: 'Add', key: 'action', align: 'center',
            render: (_, record) => <Button size="small" type="primary" onClick={() => addToIntegration(record)}>{">>"}</Button> 
        }
    ]
    
    const [filteredOptions, setFilteredOptions] = useState([])

    useEffect(() => {
        const newOptions = attributeOptions.filter(attr => !integration.attributes.includes(attr))
        setFilteredOptions([...newOptions])
    }, [integration.attributes])
    
    useEffect(() => {
        setFilteredOptions(attributeOptions)
    }, [attributeOptions])

    const addToIntegration = (attr) => {
        const newAttributes = [...integration.attributes]
        newAttributes.push(attr)
        setIntegration(prev => ({...prev, attributes: newAttributes}))
    }

    const filterAttributeOptions = (value) => {
        var filter
        if(!value || value == '') {
            filter = attributeOptions
        } else {
            filter = attributeOptions.filter(attr => attr?.key?.includes(value))
        }
        setFilteredOptions(filter)
    }

    return (
        <>
        <Input placeholder="Type to search" onChange={e => filterAttributeOptions(e.target.value)} />
        <Table
            size="small"
            dataSource={filteredOptions}
            columns={addColumns}
            pagination={{ hideOnSinglePage: true }}
        />
        </>
    )
}

export default InfoAttributeTableOptions
