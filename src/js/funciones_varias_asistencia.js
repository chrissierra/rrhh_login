var global_distancia; 
/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FUNCION VER HORA MOVIMIENTO
*/


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
    
    /*
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    FIN FUNCION VER HORA
    */
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    FUNCIONES_LOCACION
    */
    
    
    
    function calibrando_gps(){
      for (var index = 0; index < 15; index++) {
        navigator.geolocation.getCurrentPosition(function(pos){console.log(pos.coords)}, function(){console.log("error")}, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
          })
      }
    }
    
    
    /*
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    FIN FUNCIONES VARIAS LOCACION
    */
    
    
    
    

/*
funciones:
*/

function ajax_fetch(path, data, funcion_resolve, tipo_json_o_text){
    tipo= new String("json");
        let request = new Request(path, {
            method: 'POST',
           
            body:data,
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded"
               
                
                
            })
        });
    
         fetch(request)
        .then((resp) => tipo_json_o_text.trim() == tipo.trim() ? resp.json() : resp.text())
        .then((data)=> { funcion_resolve(data)} );
    
       
    }    