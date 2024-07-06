// variable global que almacena la data
var salidaAPI = [];
// inatncia de tabla 
var tablaDatos = new DataTable('#zero_config');

// INSTANCIA Y METODOS PARA LECTOR QR
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
    
    // ORIGINAL
    // // getLlenarTabla();
    // postLlenarTabla(decodedText);
    // Swal.fire({
    //   title: "Correcto",
    //   text: decodedText,
    //   icon: "success"
    // });

    // MODIFICADO
    APIPostInventory(decodedText);
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

// FIN INSTANCIA Y METODOS PARA LECTOR QR


function APIPostInventory(serial) {
  var json = JSON.stringify({
    serial:serial
  });

  $.ajax({
    type: "POST",
    url: "https://prod-38.westeurope.logic.azure.com:443/workflows/eb263ee8f75e42549d22f5c36373b4af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vu-fCkljWVYPzBkQhKe48s1_h4ZtCR1SjStkwpXUzX4",
    data: json,
    dataType: "JSON",
    contentType: 'application/json',
    // async: false,
    success: function (data) {
      var aux = data;
      var encontrado = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#63E6BE" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';
      var noEncontrado = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a21616" d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>';
      // class="table-danger"
      
      console.log("resultado",data);
      // console.log("valor",Object.keys(Object.values(aux)[0]).length);
      // console.log("valor",Object.values(aux));


      if (Object.keys(Object.values(aux)[0]).length == 0) {
        salidaAPI.push([{
          Action: "No encontrado",
          CWID:"No encontrado",
          Comments:"No encontrado",
          Country: "No encontrado",
          DaysNotconnect: "No encontrado",
          DaysOffline: 0,
          Firmado: "No encontrado",
          'Install status': "No encontrado",
          InventoryNumber: null,
          LOCATION: "No encontrado",
          LastSeen: "No encontrado",
          Localidad : null,
          'Location Country': "No encontrado",
          "Model ID": "No encontrado",
          Serial_Number: serial,
          Stockroom: null,
          "User ID": "No encontrado",
          UserName: "No encontrado",
          "assigned to": "No encontrado"
        }]);
      } else {
        aux = data.result.Table1;
        salidaAPI.push(aux);
      }

      // guardar datos en variable global
      // salidaAPI = data.result.Table1;
      // console.log("despues de ajax",salidaAPI);

      // eliminar instancia de datatable
      if (salidaAPI.length !== 0) {
        tablaDatos.destroy();
      }
      // MODIFICADO
      $("#tbody_datos").empty();
      salidaAPI.forEach((elemento,i) => {
        // obtener el array en las iteraciones
        var array = elemento;
        if (array.length == 1) {
          if (array[0].Action == "No encontrado") {
            $("#tbody_datos").append(
              "<tr class='table-danger'>"+
                  "<td style='text-align:center;align-content: center'>" + noEncontrado + " " + array[0].Serial_Number + "</td>"+
                  "<td>" + array[0]['Model ID'] + "</td>"+
                  "<td>" + array[0]['assigned to'] + "</td>"+
                  "<td>" + "No encontrado" + "</td>"+
                  "<td>" + array[0]['Install status'] + "</td>"+
                  "<td>" + "No encontrado" + "</td>"+
                  "<td>" + array[0].Stockroom + "</td>"+
                  "<td>" + array[0].Action + "</td>"+
                  "<td>" + array[0].DaysNotconnect + "</td>"+
                  "<td>" + array[0].Comments + "</td>"+
                  "<td style='text-align:center;align-content: center'>" + noEncontrado + "</td>"+
              "</tr>"
            );
          } else {
            $("#tbody_datos").append(
              "<tr>"+
                  "<td style='text-align:center;align-content: center'>" + encontrado + " " + array[0].Serial_Number + "</td>"+
                  "<td>" + array[0]['Model ID'] + "</td>"+
                  "<td>" + array[0]['assigned to'] + "</td>"+
                  "<td>" + "Revisar" + "</td>"+
                  "<td>" + array[0]['Install status'] + "</td>"+
                  "<td>" + "Revisar" + "</td>"+
                  "<td>" + array[0].Stockroom + "</td>"+
                  "<td>" + array[0].Action + "</td>"+
                  "<td>" + array[0].DaysNotconnect + "</td>"+
                  "<td>" + array[0].Comments + "</td>"+
                  "<td style='text-align:center;align-content: center'>" + encontrado + "</td>"+
              "</tr>"
            );
          }
        } else {
          var resto_array;
          var total;
          // enviar esta info. a la ventana modal
          resto_array = array.slice(1);
          total = resto_array.length;
          array.forEach((elemento2,contador) => {
            if (contador == 0) {
              $("#tbody_datos").append(
                "<tr>"+
                  "<td style='text-align:center;align-content: center'>" + encontrado + " " + elemento2.Serial_Number + "</td>"+
                      "<td>" + elemento2['Model ID'] + "</td>"+
                      "<td>" + elemento2['assigned to'] + "</td>"+
                      "<td>" + "revisar" + "</td>"+
                      "<td>" + elemento2['Install status'] + "</td>"+
                      "<td>" + "revisar" + "</td>"+
                      "<td>" + elemento2.Stockroom + "</td>"+
                      "<td>" + elemento2.Action + "</td>"+
                      "<td>" + elemento2.DaysNotconnect + "</td>"+
                      "<td>" + elemento2.Comments + "</td>"+
                      "<td style='text-align:center;align-content: center'>" + 
                      "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>"+
                        "Total <span class='badge badge-light'>" + (total + 1) + "</span>"+
                      "</button>"+ 
                    "</td>"+
                "</tr>"
              );// mostrar registro

              $('#exampleModal').on('show.bs.modal', function (event) {
                $("#titulo_modal").html("Devices");
                $("#tbody_dispositivos").empty();
                resto_array.forEach(x => {
                  $("#tbody_dispositivos").append(
                    "<tr>"+
                      "<td style='text-align:center;align-content: center'>" + encontrado + " " + x.Serial_Number + "</td>"+
                          "<td>" + x['Model ID'] + "</td>"+
                          "<td>" + x.UserName + "</td>"+
                          "<td>" + x['assigned to'] + "</td>"+
                          "<td>" + x['Install status'] + "</td>"+
                          "<td>" + x.InventoryNumber + "</td>"+
                          "<td>" + x.Localidad + "</td>"+
                          "<td>" + x.Action + "</td>"+
                          "<td>" + x.DaysNotconnect + "</td>"+
                          "<td>" + x.Comments + "</td>"+
                    "</tr>"
                  );
                }); // fin ciclo resto_array
              }) // cuando se muestra el modal

            } // solo la 1er iteracion
          }); // fin ciclo array
        } // fin else array > 1
      }); // fin ciclo salidaAPI
      tablaDatos = $('#zero_config').DataTable({pageLength: 10});
    }, error(data) {
      console.log(data);
    } // fin success
  }); // fin ajax
} // fin metodo

$("#btnProbar").click(function (e) { 
  e.preventDefault();
  console.log("variable",salidaAPI);
});

$("#input_serial").blur(function (e) { 
  e.preventDefault();
  // console.log("fuera de foco",$("#input_serial").val());
  // MODIFICADO
  APIPostInventory($("#input_serial").val());
  Swal.fire({
    title: "Correcto",
    text: $("#input_serial").val(),
    icon: "success"
  });
});















// function getLlenarTabla() {
//   $("#tbody_registros").empty();
//   // MODIFICADO
//   $.ajax({
//     type: "GET",
//     url: "https://prod-145.westeurope.logic.azure.com:443/workflows/a14c7effa502449bb946c7899304a0a0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=85o2YUJDBNrounAa4J435kXBtASdfXrDxkWgw701wNM",
//     // data: "data",
//     dataType: "JSON",
//     success: function (data) {
//       console.log(data);
//       var array_datos = data.result.Table1
//       console.log("array",array_datos);
//       array_datos.forEach(e => {
//         console.log(e);
//         $("#tbody_registros").append(
//           "<tr>"+
//             "<th scope='row'>" + e.idAssetsByUser + "</th>"+
//             "<td>" + e.serial + "</td>"+
//             "<td>" + e.country + "</td>"+
//             "<td>" + e.options + "</td>"+
//           "</tr>"
//         );

//       }); // fin array

//     } // fin success
//   }); // fin ajax
// } // fin metodo

// function postLlenarTabla(serial) {
//   $("#tbody_registros").empty();

//   var json = JSON.stringify({
//     serial:serial
//   });

//   // MODIFICADO
//   $.ajax({
//     type: "POST",
//     url: "https://prod-38.westeurope.logic.azure.com:443/workflows/eb263ee8f75e42549d22f5c36373b4af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vu-fCkljWVYPzBkQhKe48s1_h4ZtCR1SjStkwpXUzX4",
//     data: json,
//     dataType: "JSON",
//     contentType: 'application/json',
//     success: function (data) {
//       console.log("resultado",data);
//       // var array_datos = data.result.Table1
//       // console.log("array",array_datos);
//       // array_datos.forEach(e => {
//       //   console.log(e);
//       //   $("#tbody_registros").append(
//       //     "<tr>"+
//       //       "<th scope='row'>" + e.Serial_Number + "</th>"+
//       //       "<td>" + e.Action + "</td>"+
//       //       "<td>" + e.User_x0020_ID + "</td>"+
//       //       "<td>" + e.Model_x0020_ID + "</td>"+
//       //     "</tr>"
//       //   );

//       // }); // fin array

//     }, error(data) {
//       console.log(data);
//     } // fin success
//   }); // fin ajax
// } // fin metodo

// $('#zero_config').DataTable();












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