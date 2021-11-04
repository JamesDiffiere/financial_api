const { response, request } = require('express');
const {clientKeyBelvo} = require('../middlewares/getClientKeyBelvo');
const {validateUser} = require("../middlewares/validateUser");
const invoices = require("../models/belvo_invoices");
const invoices_details = require("../models/belvo_invoices_details");
const invoice_payments = require("../models/belvo_invoice_payments");
const related_documents = require("../models/belvo_related_documents");




const getFiscalInfo = async (req = request, res = response) => {
    
    const {correo,dateFrom,dateTo} = req.body;

    var user = await validateUser(correo);

    const data = await clientKeyBelvo(req);
    var clientKey = data.clientKey;
    var client = data.client;
    var type = ['INFLOW','OUTFLOW'];
        for await(let element_data of type) {   
            client.connect()
            .then(async function () {
                client.invoices.retrieve(clientKey, dateFrom, dateTo, element_data)
                .then(async function (res) {
                    const invoices_outflow = res;

                    invoices_outflow.forEach(async element => {
                        const invoices_data = await invoices.create({
                            id_cliente: user.id,
                            type: element_data,
                            invoice_type: element.invoice_type,
                            invoice_identification: element.invoice_identification,
                            subtotal_amount: element.subtotal_amount,
                            tax_amount: element.tax_amount,
                            discount_amount: element.discount_amount,
                            total_amount: element.total_amount,
                            currency: element.currency,
                            exchange_rate: element.exchange_rate,
                            status: element.status,
                            sender_name: element.sender_name,
                            sender_id: element.sender_id,
                            receiver_name: element.receiver_name,
                            receiver_id: element.receiver_id,
                            certification_authority: element.certification_authority,
                            certification_date: element.certification_date,
                            cancelation_status: element.cancelation_status,
                            cancelation_update_date: element.cancelation_update_date,
                            payment_type: element.payment_type,
                            payment_method: element.payment_method,
                            collected_at: element.collected_at,
                            usage: element.usage,
                            place_of_issue: element.place_of_issue,
                            version: element.version,
                            xml: element.xml,
                            warnings: element.warnings
                        })
                        
                        var invoice_details = element.invoice_details;
                        
                        invoice_details.forEach(async details => {
                            const invoices_details_data = await invoices_details.create({
                                id_cliente: user.id,
                                id_invoices: invoices_data.id,
                                quantity: details.quantity,
                                unit_code: details.unit_code,
                                tax_amount: details.tax_amount,
                                description: details.description,
                                unit_amount: details.unit_amount,
                                total_amount: details.total_amount,
                                pre_tax_amount: details.pre_tax_amount,
                                //retained_taxes: details.retained_taxes,
                                tax_percentage: details.tax_percentage,
                                unit_description: details.unit_description,
                                product_identification: details.product_identification
                            })
                        })

                        var invoices_payments = element.payments;

                        invoices_payments.forEach(async payments => {
                            var invoices_payments_data = await invoice_payments.create({
                                id_cliente: user.id,
                                id_invoices: invoices_data.id,
                                date: payments.date,
                                amount: payments.amount,
                                currency: payments.currency,
                                payer_rfc: payments.payer_rfc,
                                payment_type: payments.payment_type,
                                exchange_rate: payments.exchange_rate,
                                beneficiary_rfc: payments.beneficiary_rfc,
                                payer_bank_name: payments.payer_bank_name,
                                operation_number: payments.operation_number,
                                payer_account_number: payments.payer_account_number,
                                beneficiary_account_number: payments.beneficiary_account_number
                            })  
                            .then(result  => {
                                const registro_related_documents = payments.related_documents;
                                registro_related_documents.forEach(async related_document => {
                                    const insert_related_documents = await related_documents.create({
                                        id_cliente: user.id,
                                        id_payments: result.id,
                                        currency: related_document.currency,
                                        amount_paid: related_document.amount_paid,
                                        installment: related_document.installment,
                                        payment_method: related_document.payment_method,
                                        previous_balance: related_document.previous_balance,
                                        outstanding_balance: related_document.outstanding_balance,
                                        invoice_identification: related_document.invoice_identification
                                    });
                                });
                            });
                                
                            
                        })
                    })
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
        }
}

module.exports ={
    getFiscalInfo
  };

