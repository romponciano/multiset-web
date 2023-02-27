import { Tabs } from "antd";
import React from "react";
import ConnectionTab from "./connection/ConnectionTab";
import IntegrationTab from "./integration/IntegrationTab";

const App = () => {
    
    return (
        <Tabs 
            defaultActiveKey="1" 
            items={[
                {
                    key: 1,
                    label: 'Integration',
                    children: <IntegrationTab />
                },
                {
                    key: 2,
                    label: 'Datasets',
                    children: <ConnectionTab />
                }
            ]}
        />
    )
}

export default App
