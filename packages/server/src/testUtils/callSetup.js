/* eslint-disable no-undef */
// require( "ts-node/register")
require("tsconfig-paths/register")

const{setup} = require ("./setup")

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports =  async function(){
    if(!process.env.TEST_HOST){
       return await new Promise(resolve => {
            resolve(setup())
        })
    }
    return null
}