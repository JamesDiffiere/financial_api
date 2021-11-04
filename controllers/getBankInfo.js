const { response, request } = require('express');
const bankAccounts = require('../models/belvo_bankAccounts');
const bankOwners = require('../models/belvo_owners');
const usuarios = require('../models/usuarios');
const bankTransactions = require('../models/belvo_bankTransactions');
const {clientKeyBelvo} = require("../middlewares/getClientKeyBelvo");
const {validateUser} = require("../middlewares/validateUser");
var belvo = require('belvo').default;
const { json } = require('body-parser');


const getBankInfo = async (req = request, res = response) => {
    
    var {dateFrom,dateTo,correo} = req.body

    var user = await validateUser(correo);
    
    //Obtiene Llave de acceso a la información bancaria
    var data = await clientKeyBelvo(req)
    var clientKey = data.clientKey
    var client = data.client
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
                                id_cliente: user.id,
                                created_at: owners.created_at,
                                email: user.correo,
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
                                        id_cliente: user.id,
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
                                    client.transactions.retrieve(clientKey, dateFrom, { 'dateTo': dateTo })
                                    .then(async function (res) {

                                        var transactions = res;
                                        transactions.forEach(async element => {
                                            console.log(user.id);
                                            const detailTransactions = await bankTransactions.create({
                                                id_cliente: user.id,
                                                id_account: element.id_account,
                                                id_account_large: element.account.id,
                                                created_at: element.created_at,
                                                type: element.type,
                                                amount: element.amount,
                                                status: element.status,
                                                balance: element.balance,
                                                category: element.category,
                                                currency: element.currency,
                                                merchant_name: element.merchant === null ? '':element.merchant.merchant_name,
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
                            })

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                        }); 
                })
                .catch(function (error) {
                console.log(error);
                });
            })
        .catch(function (error) {
            console.log(error);
        });
    res.status(200).json({ message: 'Has consultado getBankInfo' });
}




module.exports ={
    getBankInfo
  };