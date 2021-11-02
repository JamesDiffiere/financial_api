var belvo = require('belvo').default;

const clientKeyBelvo = async (req)=>{
    return new Promise (async resolve=>{  

        var SecretKeyID = req.headers.username
        var SecretKeyPass = req.headers.password
        var {env,username,password,institution} = req.body;

        var client = await new belvo(
            SecretKeyID,
            SecretKeyPass,
            env
            );

    
        //Get ClientKey 
        await client.connect()
        .then(async function () {
            client.links.register(institution, username, password)
            .then(async function (res) {
                //ClientKey
                var clientKey = res.id;
                //Get Owners Information
                var data = {
                    clientKey,client
                }
                resolve(data);
                
            })
            .catch(function (error) {
                resolve(error);
            });
        });
    });
        
}

module.exports = {clientKeyBelvo};