import { Col, Row } from "antd";
import React from "react";
import DataAttributesTag from "./DataAttributesTag";
import DataRelationsTable from "./DataRelationsTable";

const DataRelationsRow = ({integration, setIntegration}) => {
    return (
        <>
        <Row>
            <Col span={24}>
                <DataAttributesTag integration={integration} setIntegration={setIntegration} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <DataRelationsTable integration={integration} setIntegration={setIntegration} />
            </Col>
        </Row>
        </>
    )
}

export default DataRelationsRow
