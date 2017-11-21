


/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FUNCION MARCANDO_SALIDA
*/


function marcando_salida(){
  alert("en marcando salida")
calibrando_gps();
switch_salida.disabled=true;

navigator.geolocation.getCurrentPosition(success1_salida, console.log("error"),{
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
  })
} // fin funcion marcando salida


/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FIN MARCANDO_SALIDA
*/

















/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FUNCION SUCCESS1_SALIDA

*/

  function success1_salida(position) {
    var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var latLngB = new google.maps.LatLng(localStorage.getItem("latitud"), localStorage.getItem("longitud"));
    var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
    //alert(distance);//In metres
    global_distancia=distance;
    realizando_efectiva_salida()
    }



/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FUNCION SUCCESS1_SALIDA
*/












/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FUNCION REALIZANDO EFECTIVA LA SALIDA
*/




function realizando_efectiva_salida() {
  // alert(global_distancia)
if(global_distancia>160){
    
    //toast no por qq estas muy lejs
    switch_salida.checked=false;
    switch_salida.disabled=false;
    document.getElementById("toast_fuera_coordenada").open();

}else if(global_distancia<=0 || global_distancia<159){


      data= 'id='+localStorage.getItem("id")+"&labor=nulo&accion=salida&rut="+localStorage.getItem("rut")+"&nombre_empresa_usuario_plataforma="+localStorage.getItem("nombre_empresa_usuario_plataforma")+"&nombre="+localStorage.getItem("nombre")+"&apellido="+localStorage.getItem("apellido"),
          
      ajax_fetch(path, data, funcion_resolve, "texto");

          function funcion_resolve(miBlob) {
                  var ejecucion_exitosa= new String("exitosa")
                    alert(miBlob);
                          if(miBlob.search(ejecucion_exitosa)>=0){
                          switch_salida.disabled=true;
                          document.getElementById("switch_salida_item").disabled=true;
                          ver_hora_movimiento("verificar_salida","switch_salida_item", "switch_salida", "Salida a las ");
                          switch_salida.innerHTML="Salida realizada a las 15:50";
                          }else if(miBlob=="false"){

                          switch_salida.checked=false;
                          document.getElementById("toast").open();
                          switch_salida.disabled=false;
                          }
                  
                        }
}else{
    switch_salida.disabled=false;
}
      
}// fin funcion de fetch, 

  
/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FIN FUNCION SALIDA EFECTIVA
*/
