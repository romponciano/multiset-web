import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import CONNECTION_API from "../../api/ConnectionApi";
import InfoAttributeTableOptions from "./InfoAttributeTableOptions";
import InfoAttributeTableSelected from "./InfoAttributeTableSelected";
import InfoSelectDataset from "./InfoSelectDataset";

const InfoRow = ({integration, setIntegration}) => {

    const [selectedConnection, setSelectedConnection] = useState()

    const [selectedtable, setSelectedTable] = useState()

    const [attributeOptions, setAttributeOptions] = useState([])

    useEffect(() => {
        if(selectedConnection && selectedtable) {
            CONNECTION_API
                .getAllAttributesFrom(selectedConnection.id, selectedtable.name)
                .then(data => setAttributeOptions(data))
        }
    }, [selectedConnection, selectedtable])

    return (
        <>
        <InfoSelectDataset 
            selectedConnection={selectedConnection} 
            setSelectedConnection={setSelectedConnection} 
            setSelectedTable={setSelectedTable} 
        />
        
        <Row>
            <Col span={12}>
                <InfoAttributeTableOptions 
                    integration={integration} 
                    setIntegration={setIntegration}
                    attributeOptions={attributeOptions} 
                />
            </Col>
            <Col span={12}>
                <InfoAttributeTableSelected 
                    integration={integration}
                    setIntegration={setIntegration}
                />
            </Col>
        </Row>
        </>
    )
}

export default InfoRow
