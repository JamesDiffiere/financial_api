# financial_api
Rest API que permite traer la información de Belvo y Circulo de Crédito (Versión Beta -> Servirá para la estructuración de la Base de Datos y Modelo Financiero) 


# Descarga el proyecto e instala las librerías necesarias
`npm i`

## Método POST -> Obtener e insertar en Base de Datos información de Circulo de Crédito 
`Example Data` <br><br>
<b>HOST:</b> `http://localhost:8080/cc/`
<br>
<b>BODY:</b> `{
        "correo":"prueba@prueba.com",
        "password":"1234",
        "folioOtorgante": "1000002",
        "persona": {
            "RFC": "EDC930121E02",
            "nombre": "EMPRESA TI SA DE CV",
            "domicilio": {
            "direccion": "AV. PASEO DE LA REFORMA 02",
            "CP": "68370",
            "coloniaPoblacion": "GUERRERO",
            "delegacionMunicipio": "CUAUHTEMOC",
            "ciudad": "CIUDAD DE MEXICO",
            "estado": "CDMX",
            "pais": "MX"
            }
        }
}`
<br>
<b>HEADERS(sandbox):</b> 
  `apiKey: plbTp8K53duWBcoGU7cKRjrYiXAJuADR,
  apiPass: RqIKtAJNXOyN9uKe`
