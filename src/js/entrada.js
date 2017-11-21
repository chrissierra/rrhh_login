

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FUNCION ENTRADA SUCCESS
*/


function success1_entrada(position) {
    var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var latLngB = new google.maps.LatLng(localStorage.getItem("latitud"), localStorage.getItem("longitud"));
    var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
    //alert(distance);//In metres
    global_distancia=distance;
   efectiva_entrada()
   
    }
  
    /*
    FUNCION ENTRADA SUCCESS
  
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  */
  
  
  
  
  
  
  /*
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  FUNCION ENTRADA
  */
  
  
    function efectiva_entrada() {
     alert(global_distancia)
     valor_global_distancia= parseInt(global_distancia);
     alert(valor_global_distancia)
      if(valor_global_distancia > 160){
        alert("no, por lejania")
        //toast no por qq estas muy lejs
        switch_entrada.checked=false;
        switch_entrada.disabled=false;
              document.getElementById("toast_fuera_coordenada").open();
      }else if(valor_global_distancia<=0  || valor_global_distancia < 159){
  
        alert("aca")
        path="https://unwieldy-labradoodle-8398.dataplicity.io/jaja/bower_components/gentelella/production/model/vista_empleados/vista_empleados_sister.php";
      fetch(path, {
                method: 'POST',
                body: 'id='+localStorage.getItem("id")+"&labor=marcar_asistencia&accion=entrada&rut="+localStorage.getItem("rut")+"&nombre_empresa_usuario_plataforma="+localStorage.getItem("nombre_empresa_usuario_plataforma")+"&nombre="+localStorage.getItem("nombre")+"&apellido="+localStorage.getItem("apellido"),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded" }
                }).then(function(response)  {
                
              return response.text();
            })
            .then(function(miBlob) {
      
      
      alert(miBlob);
      var ejecucion_exitosa= new String("exitosa")
      alert(miBlob);
            if(miBlob.search(ejecucion_exitosa)>=0){
    //  if(miBlob=="Ejecución exitosa"){

        
        document.getElementById("switch_entrada_item").disabled=true;
       



        alert("en ejecucion exitosa ya")
      switch_entrada.disabled=true;
      ver_hora_movimiento("verificar_asistencia","switch_entrada_item", "switch_entrada", "Entrada a las ");
      //ver_hora_movimiento("verificar_asistencia");
      }
            });
      }else{
        alert("aca")
        switch_entrada.disabled=false;
      }
      } // FIN FUNCION
  
    /*
    FUNCION ENTRADA SUCCESS
  
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  */
  
  
  
  
  
  
  /*
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  FUNCION MARCANDO ENTRADA
  */
  
  
  function marcando_entrada(){
  alert("se apreta")
  switch_entrada.disabled=true;
  
  calibrando_gps();
  
  
  navigator.geolocation.getCurrentPosition(success1_entrada, console.log("error"), {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
    });
  }// fin funcion marcando entrada
  /*
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  FUNCION MARCANDO ENTRADA
  */
  
  
  
  
  
  
  
  