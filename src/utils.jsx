const getConnectionOrEmpty = (connection) => {
    return {
        id: connection?.id,
        url: connection?.url,
        name: connection?.name,
        driver: connection?.driver,
        database: connection?.database,
        type: connection?.type,
        username: connection?.username,
        password: connection?.password,
        isActive: connection?.isActive ?? true
    }
}

const getWithNewRelation = (relations) => {
    const newRelations = [...relations]
    const newOrder = newRelations.length;
    newRelations.push(
        { 
            attribute1: {
                value: undefined,
                label: undefined,
                key: undefined
            }, 
            attribute2: {
                value: undefined,
                label: undefined,
                key: undefined
            }, 
            order: newOrder, 
            condition: undefined 
        }
    )
    return newRelations
}

const getWithNewCondition = (conditions) => {
    const newConditions = [...conditions]
    const newOrder = newConditions.length;
    newConditions.push(
        { 
            attribute: {
                value: undefined,
                label: undefined,
                key: undefined
            },
            order: newOrder, 
            operator: undefined,
            expression: undefined
        }
    )
    return newConditions
}

const SIGNALS = [
    { value: "==", text: "equals" },
    { value: "<=", text: "<=" },
    { value: ">=", text: ">=" },
    { value: "!=", text: "different" },
    { value: ">", text: ">" },
    { value: "<", text: "<" },
    { value: "START_WITH", text: "starts with" },
    { value: "END_WITH", text: "ends with" },
    { value: "CONTAINS", text: "contains" },
    { value: "NOT_CONTAINS", text: "not contains" },
]

const UTILS = {
    getConnectionOrEmpty,
    getWithNewRelation,
    getWithNewCondition,
    SIGNALS
}

export default UTILS
