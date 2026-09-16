/**
 * Purpose: Fetch data from a third party API
 * 
 */

let url ="https://isitdownstatus.com/api/v1/status/netflix"
fetch(url).
    then((response)=>{
        return response.json()
    })
    .then((dataJSONobj)=>{
        console.log(dataJSONobj)
        console.log(dataJSONobj.data.status)

    })
    .catch((error)=>{
        console.log(error)
    })