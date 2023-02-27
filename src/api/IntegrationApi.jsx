const { default: axios } = require("axios")

const HOST = "http://localhost:8081/integration"

const saveIntegration = (integration) => {
    console.log("int ", integration)
    return axios
        .post(`${HOST}/`, integration)
        .then(res => res.data)
        .catch(err => {
            console.log("Err ", err)
        })
}

const getIntegrationById = (integrationId) => {
    return axios
        .get(`${HOST}/${integrationId}`)
        .then(res => res.data)
        .catch(err => {
            console.log("Err ", err)
        })
}

const INTEGRATION_API = {
    saveIntegration,
    getIntegrationById
}

export default INTEGRATION_API
