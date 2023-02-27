import { Card, Col, Row, Space, Tag } from "antd";
import React from "react";

const DataAttributesTag = ({integration, setIntegration}) => {

    const removeAttribute = (key) => {
        const index = integration.attributes.find(at => at.key == key)
        const newAttributes = [...integration.attributes]
        newAttributes.splice(index, 1)
        setIntegration(prev => ({...prev, attributes: newAttributes}))
    }
    
    return (
        <Space size={[0,8]} wrap>
            {integration.attributes.map(attr => (
                <Tag closable onClose={removeAttribute}>{attr.key}</Tag>
            ))}
        </Space>
    )
}

export default DataAttributesTag
