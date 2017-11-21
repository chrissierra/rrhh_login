var global_distancia; 
var nombre_trabajador=document.getElementById("nombre_trabajador");
nombre_trabajador.innerText=localStorage.getItem("nombre");

var fecha= new Date();
var dia_de_la_fecha= fecha.getDate() + "/" + (1+fecha.getMonth())+ "/"+fecha.getFullYear();
var disponiendo_fecha= document.getElementById("disponiendo_fecha");
disponiendo_fecha.innerHTML="Marcaje al "+dia_de_la_fecha;


var switch_entrada=document.getElementById("switch_entrada");
switch_entrada.addEventListener("click", marcando_entrada, false);
var switch_salida=document.getElementById("switch_salida");
switch_salida.addEventListener("click", marcando_salida, false);





function marcando_entrada(){

switch_entrada.disabled=true;

navigator.geolocation.getCurrentPosition(success1, error)
setTimeout(function() {
// alert(global_distancia)
if(global_distancia>100){
  //toast no por qq estas muy lejs
  switch_entrada.checked=false;
  switch_entrada.disabled=false;
        document.getElementById("toast_fuera_coordenada").open();
}else if(global_distancia<=0 && global_distancia<99){
  path="http://christophersierrame.ddns.net/jaja/bower_components/gentelella/production/model/vista_empleados/vista_empleados_sister.php";
fetch(path, {
          method: 'POST',
          body: 'id='+localStorage.getItem("id")+"&labor=marcar_asistencia&accion=entrada&rut="+localStorage.getItem("rut"),
          headers: {
              "Content-Type": "application/x-www-form-urlencoded" }
          }).then(function(response)  {
          
        return response.text();
      })
      .then(function(miBlob) {


alert(miBlob);
if(miBlob=="Ejecución exitosa"){
switch_entrada.disabled=true;
ver_hora_movimiento("verificar_asistencia","switch_entrada_item", "switch_entrada", "Entrada a las ");
//ver_hora_movimiento("verificar_asistencia");
}
      });
}else{
  switch_entrada.disabled=false;
}
}, 300);



}// fin funcion marcando entrada






window.addEventListener("load", loading_page, false);

function loading_page(){


// navigator.geolocation.getCurrentPosition(success1, error)
// obtener_locacion();

setTimeout(function() {
  //alert(global_distancia)
}, 400);


path="http://christophersierrame.ddns.net/jaja/bower_components/gentelella/production/model/vista_empleados/vista_empleados_sister.php";
fetch(path, {
          method: 'POST',
          body: 'id='+localStorage.getItem("id")+"&accion=nada&labor=verificar_asistencia&rut="+localStorage.getItem("rut"),
          headers: {
              "Content-Type": "application/x-www-form-urlencoded" }
          }).then(function(response)  {
          
        return response.json();
      })
      .then(function(miBlob) {


if(miBlob.booleano=="true"){
/*
parte doned se verifica el inrgeso, se bloquea el input para marcarlo
*/
switch_entrada.disabled=true;
document.getElementById("switch_entrada_item").disabled=true;
switch_entrada.innerHTML="Entrada realizada a las "+ miBlob.hora_ingreso;
switch_entrada.checked=true;
switch_entrada.invalid=false;

}else{
// si es que aun no ha ingresado....1
//  alert("asdf")
}

      });


/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

*/
fetch(path, {
          method: 'POST',
          body: 'id='+localStorage.getItem("id")+"&accion=nada&labor=verificar_salida&rut="+localStorage.getItem("rut"),
          headers: {
              "Content-Type": "application/x-www-form-urlencoded" }
          }).then(function(response)  {
          
        return response.json();
      })
      .then(function(miBlob) {


if(miBlob.booleano=="true"){
/*
parte doned se verifica el inrgeso, se bloquea el input para marcarlo
*/
switch_salida.disabled=true;
document.getElementById("switch_salida_item").disabled=true;
switch_salida.innerHTML="Salida realizada a las "+ miBlob.hora_ingreso;
switch_salida.checked=true;
switch_salida.invalid=false;

}else{

 
//  switch_salida.checked=true;
// si es que aun no ha SALIDO....1
// alert("asdf")
}

      });

}











function marcando_salida(){

switch_salida.disabled=true;

navigator.geolocation.getCurrentPosition(success1, error)
setTimeout(function() {
// alert(global_distancia)
if(global_distancia>100){
  //toast no por qq estas muy lejs
  switch_salida.checked=false;
  switch_salida.disabled=false;
        document.getElementById("toast_fuera_coordenada").open();
}else if(global_distancia<=0 && global_distancia<99){

//alert("Adsf")
path="http://christophersierrame.ddns.net/jaja/bower_components/gentelella/production/model/vista_empleados/vista_empleados_sister.php";
fetch(path, {
        method: 'POST',
        body: 'id='+localStorage.getItem("id")+"&labor=nulo&accion=salida&rut="+localStorage.getItem("rut"),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function(response)  {
        
      return response.text();
    })
    .then(function(miBlob) {

//alert(miBlob);
      if(miBlob=="Ejecución exitosa"){
       switch_salida.disabled=true;
       document.getElementById("switch_salida_item").disabled=true;
ver_hora_movimiento("verificar_salida","switch_salida_item", "switch_salida", "Salida a las ");
//ver_hora_movimiento(variable_en_query, id_item, id_switch, texto)
      switch_salida.innerHTML="Salida realizada a las 15:50";
      }else if(miBlob=="false"){
        switch_salida.checked=false;
      document.getElementById("toast").open();
      switch_salida.disabled=false;
      }

    });
}else{
  switch_salida.disabled=false;
}
}, 300);


} // fin funcion marcando salida





function ver_hora_movimiento(variable_en_query, id_item, id_switch, texto){
fetch(path, {
          method: 'POST',
          body: 'id='+localStorage.getItem("id")+"&accion=nada&labor="+variable_en_query+"&rut="+localStorage.getItem("rut"),
          headers: {
              "Content-Type": "application/x-www-form-urlencoded" }
          }).then(function(response)  {
          
        return response.json();
      })
      .then(function(miBlob) {


if(miBlob.booleano=="true"){
/*
parte doned se verifica el inrgeso, se bloquea el input para marcarlo
*/
document.getElementById(id_switch).disabled=true;
document.getElementById(id_item).disabled=true;
document.getElementById(id_switch).innerHTML=texto+ miBlob.hora_ingreso;
document.getElementById(id_switch).checked=true;
document.getElementById(id_switch).invalid=false;

}else{

 
//  switch_salida.checked=true;
// si es que aun no ha SALIDO....1
// alert("asdf")
}

      });
}



function obtener_locacion(){
var options = {
enableHighAccuracy: true,
timeout: 5000,
maximumAge: 0
};

function success(pos) {
var crd = pos.coords;

alert('Your current position is:');
alert(`Latitude : ${crd.latitude}`);
alert(`Longitude: ${crd.longitude}`);
alert(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
}





function getLocation() {
navigator.geolocation.getCurrentPosition(
          function(position) {
              var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
              var latLngB = new google.maps.LatLng(localStorage.getItem("latitud"), localStorage.getItem("longitud"));
              var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
            //alert(distance);//In metres
              
          },
          function() {
              alert("geolocation not supported!!");
          }
  );
  
}

function success1(position) {
var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
var latLngB = new google.maps.LatLng(localStorage.getItem("latitud"), localStorage.getItem("longitud"));
var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
//alert(distance);//In metres
global_distancia=distance;

}


function error(position) {
alert("no soporta gps")
}

