const { response, request } = require('express');
const accionistasAvales = require("../models/circulo_accionistas_avales");
const calificacionCartera = require("../models/circulo_calificacion_cartera");
const clavePrevenciones = require("../models/circulo_clave_prevenciones");
const clavesBanxico = require("../models/circulo_claves_banxico");
const consultasInstitucionales = require("../models/circulo_consultas_institucionales");
const creditoDetalles = require("../models/circulo_credito_detalles");
const creditoGeneral = require("../models/circulo_credito_general");
const {validateUser} = require("../middlewares/validateUser");
var axios = require('axios');



const getBuroInfo = (req = request, res = response)=>{
        
    const {apikey,apipass} = req.headers;
    var info = req.body;
    data = JSON.stringify(info);
        
    var config = {
        method: 'post',
        url: 'https://services.circulodecredito.com.mx/sandbox/v1/rcc-pm',
        headers: { 
            'x-api-key': apikey, 
            apikey: apipass, 
            'Content-Type': 'application/json', 
            'Cookie': 'incap_ses_1182_2077528=zSy2CqAYFD18G7uXJU9nECyigGEAAAAA3h7j3Q30SwPSax67aIVGCA==; nlbi_2077528=oVPteHbJ2nX8nkM5Gp8RlAAAAAB+8i3CxAaZICWrJQxP8iKs; visid_incap_2077528=WB+8grkQRwiEW8h5KEjrw45keGEAAAAAQUIPAAAAAAA5vWqKvlb0JNfK0Y9d6H7N'
        },
        data : data
    };
    
    axios(config)
    .then(async function (response) {

        //Información del Accionista
        const accionistas = response.data.accionistas;

        //Registrar Usuario
        var user = await validateUser(info.correo);
        //Registro de Accionistas
        if(accionistas !== null){
            accionistas.forEach(async accionista => {
                var registro_accionistas = await accionistasAvales.create({
                    id_cliente: user.id,
                    RFC: accionista.RFC,
                    CURP: accionista.CURP,
                    nombre: accionista.nombre,
                    segundoNombre: accionista.segundoNombre,
                    apellidoPaterno: accionista.apellidoPaterno,
                    apellidoMaterno: accionista.apellidoMaterno,
                    tipo: "ACCIONISTA",
                    porcentaje_accion: accionista.porcentaje/100
                })
            })
        }

        //Registro de Avales
        const avales = response.data.avales;
        if(avales !== null){
            avales.forEach(async aval => {
                var registro_avales = await accionistasAvales.create({
                    id_cliente: user.id,
                    RFC: aval.RFC,
                    CURP: aval.CURP,
                    nombre: aval.nombre,
                    segundoNombre: aval.segundoNombre,
                    apellidoPaterno: aval.apellidoPaterno,
                    apellidoMaterno: aval.apellidoMaterno,
                    tipo: "AVAL",
                    monto_avalado: aval.cantidad
                })
            })
        }

        //Registro de Calificacion de Cartera Otorgada 
        const calificaciones = response.data.calificacionCartera;
        if(calificaciones !== null){
            calificaciones.forEach(async calificacion => {
                var registro_calificacion = await calificacionCartera.create({
                    id_cliente: user.id,
                    calificacion: calificacion.calificacion,
                    nombreOtorgante: calificacion.nombreOtorgante
                })
            })
        }

        //Registro de Prevenciones
        const prevenciones = response.data.clavePrevenciones;
        if(prevenciones !== null){
            var registro_prevenciones = await clavePrevenciones.create({
                numeroContrato: prevenciones.numeroContrato,
                id_cliente: user.id,
                nombreOtorgante: prevenciones.nombreOtorgante,
                fechaReporte: prevenciones.fechaReporte,
                claveprevencion: prevenciones.clavePrevencion
            })
        }
        
        //Registro Claves Banxico
        const claveBanxico = response.data.clavesBanxico;
        var claveBanxicoAll = [claveBanxico.claveBanxico1,claveBanxico.claveBanxico2,claveBanxico.claveBanxico3,claveBanxico.claveBanxico4];
        for await(let element_data of claveBanxicoAll) {
            if(element_data !== undefined){
                var registro_clavesBanxico = await clavesBanxico.create({
                    id_cliente: user.id,
                    clavesBanxico: element_data
                })
            }
        }

        
        //Registro consultas institucionales y comerciales
        const consultasComerciales = response.data.consultasInstitucionales.comerciales;
        var registro_consultas_comerciales = await consultasInstitucionales.create({
            id_cliente: user.id,
            ultimos3meses:consultasComerciales.ultimos3meses,
            ultimos12meses:consultasComerciales.ultimos12meses,
            ultimos24meses:consultasComerciales.ultimos24meses,
            mas24meses:consultasComerciales.mas24meses,
            tipo_institucion:"COMERCIALES",
        })

        const consultasFinancieras = response.data.consultasInstitucionales.financieras;
        var registro_consultas_comerciales = await consultasInstitucionales.create({
            id_cliente: user.id,
            ultimos3meses:consultasFinancieras.ultimos3meses,
            ultimos12meses:consultasFinancieras.ultimos12meses,
            ultimos24meses:consultasFinancieras.ultimos24meses,
            mas24meses:consultasFinancieras.mas24meses,
            tipo_institucion:"FINANCIERAS",
        })

        const detalleCreditosFinancieros = response.data.credito.cuentasFinancieras;
        const detalleCreditosComerciales = response.data.credito.cuentasComerciales;
        if(detalleCreditosFinancieros !== null){
            detalleCreditosFinancieros.forEach(async creditoFinanciero => {
                var registro_creditos_general = await creditoGeneral.create({
                    id_cliente: user.id,
                    rfc: creditoFinanciero.RFC,
                    contrato: creditoFinanciero.contrato,
                    nombreOtorgante: creditoFinanciero.nombreOtorgante,
                    saldoInicial: creditoFinanciero.saldoInicial,
                    saldoTotal: creditoFinanciero.saldoTotal,
                    moneda: creditoFinanciero.moneda,
                    fechaApertura: creditoFinanciero.fechaApertura,
                    plazo: creditoFinanciero.plazo,
                    tipoCambio: creditoFinanciero.tipoCambio,
                    clavesObservacion: creditoFinanciero.clavesObservacion,
                    tipoCredito: creditoFinanciero.tipoCredito,
                    tipoInstitucion: "FINANCIERA"
                })
            

                var registro_creditos_detalles = await creditoDetalles.create({
                    
                    id_credito_general: registro_creditos_general.id,
                    id_cliente: user.id,
                    vigente: creditoFinanciero.vigente,
                    dias29: creditoFinanciero["29dias"],
                    dias59: creditoFinanciero["59dias"],
                    dias89: creditoFinanciero["89dias"],
                    dias119: creditoFinanciero["119dias"],
                    dias179: creditoFinanciero["179dias"],
                    MasDias180: creditoFinanciero["180MasDias"],
                    actualizacion: creditoFinanciero.actualizacion,
                    fechaCierre: creditoFinanciero.fechaCierre,
                    pagoEfectivo: creditoFinanciero.pagoEfectivo,
                    quita: creditoFinanciero.quita,
                    dacionPago: creditoFinanciero.dacionPago,
                    quebrantoCastigo: creditoFinanciero.quebrantoCastigo,
                    historia: creditoFinanciero.historia,
                    atrasoMayor: creditoFinanciero.atrasoMayor,
                    registroImpugnado: creditoFinanciero.registroImpugnado
                })
                

            });
        }

        if(detalleCreditosComerciales !== null){
            detalleCreditosComerciales.forEach(async creditoComercial => {
                var registro_creditos_general = await creditoGeneral.create({
                    id_cliente: user.id,
                    rfc: creditoComercial.RFC,
                    nombreOtorgante: creditoComercial.nombreOtorgante,
                    saldoTotal: creditoComercial.saldoTotal,
                    moneda: creditoComercial.moneda,
                    tipoInstitucion: "COMERCIAL"
                })

                var registro_creditos_detalles = await creditoDetalles.create({
                    
                    id_credito_general: registro_creditos_general.id,
                    id_cliente: user.id,
                    vigente: creditoComercial.vigente,
                    dias29: creditoComercial["29dias"],
                    dias59: creditoComercial["59dias"],
                    dias89: creditoComercial["89dias"],
                    dias119: creditoComercial["119dias"],
                    dias179: creditoComercial["179dias"],
                    MasDias180: creditoComercial["180MasDias"],
                    actualizacion: creditoComercial.actualizacion,
                    historia: creditoComercial.historia,
                    atrasoMayor: creditoComercial.atrasoMayor
                })

            });
        }

    })
    .catch(function (error) {
    console.log(error);
    });
    

}

module.exports = {
    getBuroInfo
}



    
