const { default: axios } = require("axios")

const HOST = "http://localhost:8081/connection"

const getAllConnections = () => {
    return axios
        .get(`${HOST}/`)
        .then(res => res.data)
        .catch(err => {
            console.log("Error ", err)
        })
}

const getConnection = (connectionId) => {
    return axios
        .get(`${HOST}/${connectionId}`)
        .then(res => res.data)
        .catch(err => {
            console.log("Error ", err)
        })
}

const saveConnection = (conn) => {
    return axios
        .post(`${HOST}/`, conn)
        .then(res => res.data)
        .catch(err => {
            console.log("Error ", err)
        })
}

const getAllTablesFrom = (connectionId) => {
    return axios
        .get(`${HOST}/${connectionId}/table`)
        .then(res => res.data)
        .catch(err => {
            console.log("Error ", err)
        })
}

const getAllAttributesFrom = (connectionId, table) => {
    return axios
        .get(`${HOST}/${connectionId}/table/${table}/attribute`)
        .then(res => res.data)
        .catch(err => {
            console.log("Error ", err)
        })
}

const CONNECTION_API = {
    getAllConnections,
    saveConnection,
    getConnection,
    getAllTablesFrom,
    getAllAttributesFrom
}

export default CONNECTION_API
