let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 2, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false
);

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
    // ORINGAL
    // console.log(`Code matched = ${decodedText}`, decodedResult);
    // Swal.fire({
    //     title: "Correcto",
    //     text: decodedText,
    //     icon: "success"
    // });
    // html5QrcodeScanner.clean()
    
    
    // getLlenarTabla();
    postLlenarTabla(decodedText);
    Swal.fire({
      title: "Correcto",
      text: decodedText,
      icon: "success"
    });
}



//   html5QrCode.stop().then((ignore) => {
//     // QR Code scanning is stopped.
//   }).catch((err) => {
//     // Stop failed, handle it.
//   });

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}



html5QrcodeScanner.render(onScanSuccess, onScanFailure);



function getLlenarTabla() {
  $("#tbody_registros").empty();
  // MODIFICADO
  $.ajax({
    type: "GET",
    url: "https://prod-145.westeurope.logic.azure.com:443/workflows/a14c7effa502449bb946c7899304a0a0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=85o2YUJDBNrounAa4J435kXBtASdfXrDxkWgw701wNM",
    // data: "data",
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      var array_datos = data.result.Table1
      console.log("array",array_datos);
      array_datos.forEach(e => {
        console.log(e);
        $("#tbody_registros").append(
          "<tr>"+
            "<th scope='row'>" + e.idAssetsByUser + "</th>"+
            "<td>" + e.serial + "</td>"+
            "<td>" + e.country + "</td>"+
            "<td>" + e.options + "</td>"+
          "</tr>"
        );

      }); // fin array

    } // fin success
  }); // fin ajax
} // fin metodo

function postLlenarTabla(serial) {
  $("#tbody_registros").empty();
  // MODIFICADO
  $.ajax({
    type: "POST",
    url: "https://prod-38.westeurope.logic.azure.com:443/workflows/eb263ee8f75e42549d22f5c36373b4af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vu-fCkljWVYPzBkQhKe48s1_h4ZtCR1SjStkwpXUzX4",
    data: {
      serial: serial
    },
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      var array_datos = data.result.Table1
      console.log("array",array_datos);
      array_datos.forEach(e => {
        console.log(e);
        $("#tbody_registros").append(
          "<tr>"+
            "<th scope='row'>" + e.Serial_Number + "</th>"+
            "<td>" + e.Action + "</td>"+
            "<td>" + e.User_x0020_ID + "</td>"+
            "<td>" + e.Model_x0020_ID + "</td>"+
          "</tr>"
        );

      }); // fin array

    }, error(data) {
      alert(data);
    } // fin success
  }); // fin ajax
} // fin metodo












// server = 'pa-dev-db-srv.database.windows.net' 
// database = 'CoffeeChatsEPI' 
// username = 'ITTrucksBrazil' 
// password = '#Ac675rcRO8*nGnS'




// import json
// import pyodbc
 
// server = 'pa-dev-db-srv.database.windows.net' 
// database = 'CountryIT' 
// username = 'CountryIT' 
// password = '#Ac675rcRO8*nGnS'
 
// def lambda_handler(event, context):
//     print(event)
//     print(context)
 
//     lista_sites = []
//     listaaux = []
//     sites = []
//     cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';ENCRYPT=no;UID='+username+';PWD='+ password+';')
//     cursor = cnxn.cursor()
//     cursor2 = cnxn.cursor()
//     cursor.execute("select Id, Nombre from dbo.Sitios WHERE FkRegion = '3'")
//     for i in cursor.fetchall():
//         lista_sites.append(i)

//     for j in range(len(lista_sites)):
//         row = lista_sites[j]
//         listaaux.append(row)
//     for x in range(len(listaaux)):
//         varId = listaaux[x][0]
//         varNome = listaaux[x][1]
 
//         aux = {"Id": varId,"nome":varNome}
//         sites.append(aux)
//         x = x + 1
//     '''
//     jsondumps= json.dumps(sites)
//     status = json.loads(jsondumps)  
//     '''
//     return {
//     'statusCode': 200,
//     "headers": {
//     'Access-Control-Allow-Origin':'*',
//         'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
//         'Access-Control-Allow-Methods':'GET,OPTIONS'
//     },
//     'body': json.dumps(sites)
//     }