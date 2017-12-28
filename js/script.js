$(document).ready(function(){
$('#formulario').on('submit',function(event){

	event.preventDefault();

	$.ajax({
				url:'./openfile.php',
				dataType:"json",
				cache:false,
				contentType:false,
				processData:false,
				type:'post',
				success:function(msg){
					var arreglo=JSON.parse(msg);
					var valores=$('#rangoPrecio').val().split(';');
					var Dom='<div class="tituloContenido card"><h5>Resultados de la búsqueda:</h5><div class="divider"></div><button type="button" name="todos" class="btn-flat waves-effect" id="mostrarTodos">Mostrar Todos</button></div>';
					$(".colContenido").html(Dom);
					
					for(x in arreglo){						
						
						var num=arreglo[x].Precio.substr(1);
						var num=num.replace(',','');
						
						if(Number(num)>=Number(valores[0]) && Number(num)<=Number(valores[1])){
							if($("#selectCiudad").val()==arreglo[x].Ciudad && Number($("#selectTipo").val())==0){
								LlenarDatos(arreglo[x].Direccion, arreglo[x].Ciudad, arreglo[x].Telefono, arreglo[x].Codigo_Postal, arreglo[x].Tipo, arreglo[x].Precio);
								console.log('encontro ciudad: '+$("#selectCiudad").val()+'=='+arreglo[x].Ciudad);
							}

							if($("#selectTipo").val()==arreglo[x].Tipo && Number($("#selectCiudad").val())==0){
								LlenarDatos(arreglo[x].Direccion, arreglo[x].Ciudad, arreglo[x].Telefono, arreglo[x].Codigo_Postal, arreglo[x].Tipo, arreglo[x].Precio);
								console.log('encontro ciudad: '+$("#selectCiudad").val()+'=='+arreglo[x].Ciudad);
							}

							if($("#selectCiudad").val()==arreglo[x].Ciudad && $("#selectTipo").val()==arreglo[x].Tipo){
								LlenarDatos(arreglo[x].Direccion, arreglo[x].Ciudad, arreglo[x].Telefono, arreglo[x].Codigo_Postal, arreglo[x].Tipo, arreglo[x].Precio);
							}


							if(Number($("#selectCiudad").val())==0 && Number($("#selectTipo").val())==0){
								LlenarDatos(arreglo[x].Direccion, arreglo[x].Ciudad, arreglo[x].Telefono, arreglo[x].Codigo_Postal, arreglo[x].Tipo, arreglo[x].Precio);
							}							
						}

						
					}
				}
			})

})

})


$(document).on('click', '#mostrarTodos', function(event) {			
			$.ajax({
				url:'./openfile.php',
				dataType:"json",
				cache:false,
				contentType:false,
				processData:false,
				type:'post',
				success:function(msg){
						var arrayciudad=new Array();
						var arrayTipo=new Array();
						var arreglo=JSON.parse(msg);				
						var html='';
						var Dom='<div class="tituloContenido card"><h5>Resultados de la búsqueda:</h5><div class="divider"></div><button type="button" name="todos" class="btn-flat waves-effect" id="mostrarTodos">Mostrar Todos</button></div>';
						$(".colContenido").html(Dom);
						for(x in arreglo){

							arrayciudad[x]=arreglo[x].Ciudad;
							arrayTipo[x]=arreglo[x].Tipo;

							LlenarDatos(arreglo[x].Direccion, arreglo[x].Ciudad, arreglo[x].Telefono, arreglo[x].Codigo_Postal, arreglo[x].Tipo, arreglo[x].Precio);

							
						}
						$('.colContenido').css('min-height', 50+'px');
						$('.colContenido').css('height', 50+'px');
						

						var ciudades=clasificar(arrayciudad);
						var tipos=clasificar(arrayTipo);

						for(x in ciudades){
							$(".opciudad:last-of-type").after('<option class="opciudad" value="'+ciudades[x]+'">'+ciudades[x]+'</option>');
						}

						for(x in tipos){
							$(".optipo:last-of-type").after('<option class="optipo" value="'+tipos[x]+'">'+tipos[x]+'</option>');
						}

						$('select').material_select();					
				}
			})
});




function clasificar(array){
	var Elements=new Array();	
	var i=0;

	for(x in array){
		
		if(!(Elements.includes(array[x]))){
			 Elements[i]=array[x];
			 i++;
		}
	}
	return Elements;	
}

function LlenarDatos(Direccion, ciudad, telefono, postal, tipo, precio){
		datos='<strong>Dirección: </strong>'+Direccion+'<br>';
		datos+='<strong>Ciudad: </strong>'+ciudad+'<br>';
		datos+='<strong>Telefono: </strong>'+telefono+'<br>';
		datos+='<strong>Codigo Postal: </strong>'+postal+'<br>';
		datos+='<strong>Tipo: </strong>'+tipo+'<br>';
		datos+='<strong>Precio: </strong>'+precio+'<br>';
		html='<div class="izquierda"><img src="img/home.jpg"></div><div class="derecha">'+datos+'</div>';
		$(".tituloContenido:last-of-type").after('<div class="tituloContenido card">'+html+'</div>');

}

