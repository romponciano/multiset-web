import { Button, Collapse, FloatButton, Input, Modal } from "antd";
import React, { useState } from "react";
import InfoRow from "./information/InfoRow";
import styled from 'styled-components'
import DataRelationsRow from "./data-integration/DataRelationsRow";
import DataConditionsRow from "./data-integration/DataConditionsRow";
import { CloudDownloadOutlined, SaveOutlined } from "@ant-design/icons";
import INTEGRATION_API from "../api/IntegrationApi";

const IntegrationTab = () => {

    const [integration, setIntegration] = useState({
        attributes: [],
        relations: [],
        conditions: []
    })

    const [showLoadIntegrationModal, setShowLoadIntegrationModal] = useState(false)
    const [integrationId, setIntegrationId] = useState()

    return (
        <>
        <FloatButton
            shape="square"
            type="primary"
            style={{ right: 24 }}
            icon={<SaveOutlined />}
            onClick={() => INTEGRATION_API.saveIntegration(integration).then(data => console.log("data ", data))}
        />
        <FloatButton
            shape="square"
            type="primary"
            style={{ right: 94 }}
            icon={<CloudDownloadOutlined />}
            onClick={() => setShowLoadIntegrationModal(true)}
        />

        <Modal 
            closable 
            onCancel={() => setShowLoadIntegrationModal(false)} 
            open={showLoadIntegrationModal}
        >
            <Input onChange={e => setIntegrationId(e.target.value)} />
            <Button 
                type="primary" 
                onClick={() => {
                    INTEGRATION_API
                        .getIntegrationById(integrationId)
                        .then(data => {
                            console.log("loaded ", data)
                            setIntegration(data)
                        })
                        .then(() => setShowLoadIntegrationModal(false))
                }}
            >
                Load Integration
            </Button>
        </Modal>

        <StyledCollapse>
            <Collapse defaultActiveKey={1} size="small">
                <Collapse.Panel header="Information" key={1}>
                    <InfoRow integration={integration} setIntegration={setIntegration} />
                </Collapse.Panel>

                <Collapse.Panel header="Relations" key={2}>
                    <DataRelationsRow integration={integration} setIntegration={setIntegration} />
                </Collapse.Panel>

                <Collapse.Panel header="Conditions" key={3}>
                    <DataConditionsRow integration={integration} setIntegration={setIntegration} />
                </Collapse.Panel>
                
                <Collapse.Panel header="Charts" key={4}>
                    <div>chart</div>
                </Collapse.Panel>
            </Collapse>
        </StyledCollapse>
        </>
    )
}

export default IntegrationTab

const StyledCollapse = styled.div`
.ant-collapse-header {
    background-color: lightskyblue;
}
`
