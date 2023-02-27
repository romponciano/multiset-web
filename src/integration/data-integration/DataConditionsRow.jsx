import { Col, Row } from "antd";
import React from "react";
import DataAttributesTag from "./DataAttributesTag";
import DataConditionsTable from "./DataConditionsTable";

const DataConditionsRow = ({integration, setIntegration}) => {
    return (
        <>
        <Row>
            <Col span={24}>
                <DataAttributesTag integration={integration} setIntegration={setIntegration} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <DataConditionsTable integration={integration} setIntegration={setIntegration} />
            </Col>
        </Row>
        </>
    )
}

export default DataConditionsRow
