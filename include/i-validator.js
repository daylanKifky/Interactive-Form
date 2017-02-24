var validator = {
	showMessage : false,
	empty_message : "empty value",
	tooLong_message : function(num){return "please enter a string shorter than " + num + " characters"},
	val: "",
	errno : 0,
	errors : {},
	allowed_tel_chars : "0123456789+ ".split(""),
	base : function(input){
		validator.val = input.val();
		var message = false; 
		if (validator.val === ""){
			message = validator.empty_message;
			validator.displayMessage(input, message);
			return true;
		}
		//check and set message if error found
		return false;
	},

	if_public_nombre_local: function(input){
		var message = validator.base(input);
		if (message)
			return;

		if (!validator.noLonguerThan(100))
			message = validator.tooLong_message(100);

		validator.displayMessage(input, message);
	},

	if_public_contacto: function(input){
		validator.val = input.val();
		var message = false; 
		if (validator.val === ""){
			message = "Por favor seleccionar una opcion";
		}
		validator.displayMessage(input, message);
	},

	if_horario : function (input){
		var message = validator.base(input);
		if (message)
			return;

		if (!validator.noLonguerThan(50))
			message = validator.tooLong_message(50);

		validator.displayMessage(input, message);
	},

	if_about_short_esp : function (input){
		var message = validator.base(input);
		if (message)
			return;

		if (!validator.noLonguerThan(400))
			message = validator.tooLong_message(400);
		
		if (!validator.noMoreWordsThan(30))
			message = "Por favor ingresar una descripcion con no mas de 30 palabras"

		validator.displayMessage(input, message);
	},

	if_sitio_web : function(input){
		var message = validator.base(input);
		if (message)
			return;

		if (!validator.noLonguerThan(100))
			message = validator.tooLong_message(100);

		if (!validator.containsStr("http://") && !validator.containsStr("https://"))
			message = "Please enter a valid website (starting with 'http://' or 'https://')";

		validator.displayMessage(input, message);
	},

	if_public_tel : function (input){
		input.val(input.val().trim());
		var message = validator.base(input);
		if (message)
			return;

		for (var i = 0; i < validator.val.length; i++) {
			var match =
			validator.allowed_tel_chars.some(function(e){
				return e == validator.val[i];
			});
			if (!match){ 
				message = "El telefono debe contener solo numeros, espacios o el caracter '+'"
				validator.displayMessage(input, message);
				return;
			}

			if (validator.val[i] == '+' && i != 0 ){
				message = "El caracter '+' solo puede estar al inicio del telefono"
				validator.displayMessage(input, message);
				return;
			}
		}

		input.val(validator.val.replace("+","00"));
		input.val(input.val().replace("0034", ""));
		input.val(input.val().split(" ").join(""));
		validator.displayMessage(input, message);

	},


	if_public_email : function(input){
		var message = validator.base(input);
		if (message)
			return;

		if (!validator.noLonguerThan(100))
			message = validator.tooLong_message(100);

		if (!validator.containsStr("@"))
			message = "Por favor ingresar una direccion de email valida";

		validator.displayMessage(input, message);
	},

	if_about_long_esp : function (input){
		var message = validator.base(input);
		if (message)
			return;
		
		if (!validator.noMoreWordsThan(120))
			message = "Por favor ingresar una descripcion con no mas de 120 palabras"

		validator.displayMessage(input, message);
	},


	//////////////////////////////////
	/// Display 
	//////////////////////////////////
	
	displayMessage: function(element, msg){
		var tooltip = element.siblings('.i-validator-msg');
		if (msg){
			if (validator.showMessage){
				if (tooltip.length){
					tooltip.html(msg)
				} else {
					element.parent().prepend("<span class='i-validator-msg'>"+msg+"</span>");
					
				}
			}

			validator.errors[element.attr("id")] = msg;

		} else {
			tooltip.remove();
			validator.errors[element.attr("id")] = "ok";

		}
	},


	//////////////////////////////////
	/// UTILS 
	//////////////////////////////////
	

	noMoreWordsThan : function(max){
		return validator.val.split(" ").length < max;
	},

	noLonguerThan: function(size){
		return (validator.val.length < size);
	},
	noShorterThan: function(size){
		return (validator.val.length > size);
	},
	containsStr: function(str){
		return (validator.val.indexOf(str) != -1); 
	},
	isInt:function(){
		return validator.val === parseInt(validator.val);
	}

};


validator.setImgValidation = function(){
	try{
		var if_img_names = $("span#if_img_names").html().split(",");
		
		if_img_names.forEach(function(e){
			validator[e] = function(input){
				console.log(input);
				var message = validator.base(input);
				if (message){
					message = "Por favor seleccionar una imagen";
					return;
				}

				if (!input[0].files[0].name.match(/[^/]+\.(jpg|jpeg|png|tiff|tif)$/i)){
					message = "Solamente imagenes en formato 'jpg', 'png', o 'tiff'";
				}

				if (input[0].files[0].size > 20*1024*1024)
					message = "Solamente imagenes de menos de 20 Mb";

				validator.displayMessage(input, message);

			}
		});

	} catch (e){

	}
}

//////////////////////////////////
/// Same as 
//////////////////////////////////


validator.if_public_direccion = validator.if_public_nombre_local;
validator.if_about_short_eng = validator.if_about_short_esp;
validator.if_about_long_eng = validator.if_about_long_esp;

validator.if_facebook = validator.if_sitio_web;
validator.if_instagram = validator.if_sitio_web;

validator.if_tel_movil = validator.if_public_tel;
validator.if_tel_fijo = validator.if_public_tel; 
validator.if_email = validator.if_public_email;
validator.if_email_factura = validator.if_public_email;
validator.if_dir_factura = validator.if_public_nombre_local;
validator.if_nombre_empresa = validator.if_public_nombre_local;
validator.if_cif_nif = validator.if_public_nombre_local;

validator.allValidated = function(){
	// return true; // BYPASS!!!

	var counter = 0;
	for (var err in validator.errors){ 
		if (validator.errors.hasOwnProperty(err) && validator.errors[err] === "ok") 
			counter ++; 
	}
	if (counter == validator.errno)
		return true;

	console.log("correct: "+ counter +" | total: "+validator.errno);
	return false;
}

validator.preventEarlySubmit = function(submitHandler){
	$(window).keydown(function(event){
	    if( (event.keyCode == 13)) {
	      event.preventDefault();
	      if (validator.allValidated())
	      	submitHandler();
	      
	    }
	});
}