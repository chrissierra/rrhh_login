var path="https://unwieldy-labradoodle-8398.dataplicity.io/jaja/bower_components/gentelella/production/model/vista_empleados/vista_empleados_sister.php";
window.addEventListener("load", loading_page, false);
/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FUNCION LOAD WINDOW
*/

function loading_page(){

    if(!(localStorage.getItem("id"))){
    location.href="./test.html";
    }else{
    //    alert("asdf")
    }
/*
declarando variables:
***********************************************************************************************************************
*/


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


/*

FIN DECLARACION VARIABLES
*/


const promesa = new Promise((resolve) => {
    calibrando_gps();
    data= 'id='+localStorage.getItem("id")+"&accion=nada&labor=verificar_asistencia&rut="+localStorage.getItem("rut");
    resolve(data);
   
   });


   
promesa.then((data)=> { ajax_fetch(path, data, function funcion_verificar_asistencia(miBlob){
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
}, "json");



})
.then(function(){
    data_salida= 'id='+localStorage.getItem("id")+"&accion=nada&labor=verificar_salida&rut="+localStorage.getItem("rut");
    ajax_fetch(path, data_salida, funcion_verificar_salida, "json");
    
    function funcion_verificar_salida(miBlob) {
    
    
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
    
          }// fin funcion verificar salida
}) // fin funcion promesa
.catch((error) => {console.log(error) });



 } // FIN ONLOAD


/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

FUNCION LOAD WINDOW
*/








