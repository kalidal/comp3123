/**
 * Purpose: act as an API developer and create a new promise to either resolve or reject
 */

async function fetch_games(){

    let promise_games = new Promise((resolve,reject)=>{

        let isRegistered = true
        
        setTimeout(()=>{
            if(isRegistered){
                const gamesJSON = {
                    monday: "leafs",
                    tuesday: "raptors"
                }
                //static method from JSON prototype/class
                let gamesJSONstr = JSON.stringify(gamesJSON)
                resolve(gamesJSONstr)
            }
            else{
                reject("You must be a registered member first!")
            }
    
        },2000)
        
    })
    let result_from_promise = await promise_games
    console.log(result_from_promise)
    const gamesJSONParsed = JSON.parse(result_from_promise)
    console.log(gamesJSONParsed)

}

fetch_games()
let someStrToPrint = "bob"
console.log(someStrToPrint)


