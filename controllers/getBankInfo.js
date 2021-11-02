const { response, request } = require('express');
const bankAccounts = require('../models/belvo_bankAccounts');
const bankOwners = require('../models/belvo_owners');
const bankTransactions = require('../models/belvo_bankTransactions');
var belvo = require('belvo').default;


const getBankInfo = (req = request, res = response) => {

    //Transladar más adelante a Enviroments Var
    var SecretKeyID = 'fd9b16d1-9cb7-431d-92b9-f421f02acc42';
    var SecretKeyPass = 'KxolXGhCZzM6Ka6xrdVGSstcJvoqT85un#gBiV-#d#Yd-CmgBcuTPJIFsK##Tbha';
    var envyroment = "sandbox";//"development";

    var client = new belvo(
        SecretKeyID,
        SecretKeyPass,
        envyroment
    );
    //Inicia consulta de Llave de acceso a los datos bancarios
    client.connect()
    .then(function () {
        client.links.register('erebor_br_retail', 'bank', 'fulld')
        .then(async function (res) {
            //Guarda llave de acceso
            //d9f3a09b-e39b-40b6-9658-165e21ba684c
            console.log(res.id);
            var clientKey = res.id;

            //Inicia consulta a cuenta bancaria -> Datos Generales 
            client.connect()
            .then(async function () {
            client.accounts.retrieve(clientKey)
                .then(async function (res) {
                    var accountDetails = res;

                    //Guarda link de usuario (Sirve para Owners)
                    var clientLink = res[0].link;
                    //Consulta Información de Owners
                    client.connect()
                    .then(async function () {
                        client.owners.retrieve(clientLink)
                        .then(async function (res) {
                            var owners = res[0];

                            //Guardar información en Base de Datos -> Tabla: belvo_owners
                            const ownersAccount = await bankOwners.create({
                                link: owners.link,
                                created_at: owners.created_at,
                                email: owners.email,
                                address: owners.address,
                                last_name: owners.last_name,
                                first_name: owners.first_name,
                                document_type: owners.document_type,
                                document_number: owners.document_number,
                                collected_at: owners.collected_at,
                                display_name: owners.display_name,
                                phone_number: owners.phone_number,
                                second_last_name: owners.second_last_name,
                                internal_identification: owners.internal_identification
                            })
                            .then(ownersAccount => id_cliente = ownersAccount.id)
                            .then(async function (){
                                //Guarda información en Base de Datos -> Tabla: belvo_bankAccounts
                                accountDetails.forEach(async element => {
                                    const detailAccounts = await bankAccounts.create({ 
                                        id_account_large: element.id,
                                        id_cliente: id_cliente,
                                        created_at: element.created_at,
                                        internal_identification: element.internal_identification,
                                        agency: element.agency,
                                        name: element.name,
                                        number: element.number,
                                        type: element.type,
                                        category: element.category,
                                        bank_product_id: element.bank_product_id,
                                        public_identification_name: element.public_identification_name,
                                        public_identification_value: element.public_identification_value,
                                        currency: element.currency,
                                        loan_data: element.loan_data,
                                        collected_at: element.collected_at,
                                        last_accessed_at: element.last_accessed_at,
                                        balance: element.balance.available
                                    })
                                })                                
                            })
                            .then(async function(){
                                client.connect()
                                .then(async function () {
                                    client.transactions.retrieve(clientKey, '2020-01-01', { 'dateTo': '2021-10-29' })
                                    .then(async function (res) {

                                        var transactions = res;
                                        transactions.forEach(async element => {

                                            console.log(element.id);
                                            console.log(element.balance);
                                            const detailTransactions = await bankTransactions.create({
                                                id_account: element.id_account,
                                                id_account_large: element.account.id,
                                                created_at: element.created_at,
                                                type: element.type,
                                                amount: element.amount,
                                                status: element.status,
                                                balance: element.balance,
                                                category: element.category,
                                                currency: element.currency,
                                                merchant_name: element.merchant.merchant_name,
                                                reference: element.reference,
                                                value_date: element.value_date,
                                                description: element.description,
                                                collected_at: element.collected_at,
                                                observations: element.observations,
                                                accounting_date: element.accounting_date,
                                                internal_identificatio: element.internal_identificatio,
                                            })
                                          });
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                });
                            })

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    })
                    
                })
                .catch(function (error) {
                console.log(error);
                });
            });
            
        })
        .catch(function (error) {
            console.log(error);
        });
    });

    // client.connect()
    //     .then(async function () {
    //       client.accounts.retrieve('80ead4a7-0a93-47cc-b29f-1b1579ffe90c')
    //         .then(async function (res) {
                
    //             var result = res[0];

    //             const detailAccounts = await bankAccounts.create({ 
    //                 id_account_large: result.id_account_large,
    //                 id_cliente: result.id_cliente,
    //                 created_at: result.created_at,
    //                 internal_identification: result.internal_identification,
    //                 agency: result.agency,
    //                 name: result.name,
    //                 number: result.number,
    //                 type: result.type,
    //                 category: result.category,
    //                 bank_product_id: result.bank_product_id,
    //                 public_identification_name: result.public_identification_name,
    //                 public_identification_value: result.public_identification_value,
    //                 currency: result.currency,
    //                 credit_data: result.credit_data,
    //                 loan_data: result.loan_data,
    //                 collected_at: result.collected_at,
    //                 last_accessed_at: result.last_accessed_at,
    //             })
    //             //.then(detailAccounts => console.log(detailAccounts.id));
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //   });


    res.status(200).json({ message: 'Has consultado getBankInfo' });
}




module.exports ={
    getBankInfo
  };