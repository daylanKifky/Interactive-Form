var c = console.log;
(function($){
	$(document).ready(function(){
		//Questo sarebbe l'uso basico della parte che già funziona. (adesso commentato per provare l'inheritance)
		theForm = new IForm($);
		theForm.createElements();
		theForm.setEvents();
	

		//Si prendono tutti i div con una classe "if-image-loader" e si creano i
		//elementi necesari (un input, un label, e un img)
		//
		//Poi si settano i eventi.
		//
		//L'idea è che IForm, oltre a chiamare i Builder e settare eventi, 
		//porta un registro dei dati caricati in IForm.data 

	});
}(jQuery));



//////////////////////////////////
/// IMAGE BUILDER 
//////////////////////////////////


function IForm_ImageBuilder(jQObject, 
							imgSpecs,
							dataObj){
	this.type = "image";
	this.subtype = "foto"
	this.id = jQObject.attr("id")+"-input";
	this.name = jQObject.attr("if-label");
	this.dimensions = imgSpecs.dimensions;
	this.formats = imgSpecs.formats;

	this.input = '<input class="if-image-loader" type="file"' +
				' name="'+ this.name + 
				'" id="'+ this.id +'" />';
	this.elements = '<img class="if-up-image" src="" alt="User uploaded Image">'+
                    '<label for="'+this.id+'"></label>';

    var newImgForm = $(this.input);
    jQObject.html(newImgForm).append(this.elements);
    dataObj[this.name] = {imageData:"", uploads:0, originalTitle:"", type:""};
}

	IForm_ImageBuilder.prototype.if_class = ".if-image-loader";


//////////////////////////////////
/// TEXT INPUT BUILDER 
//////////////////////////////////

function IForm_TextBuilder(	jQObject, 
							textSpecs,
							dataObj ){


}

//////////////////////////////////
/// IFORM 
//////////////////////////////////

function IForm(){
	this._loaders = "input.if-image-loader";
	this._silbingImage = ".if-up-image";
	this._fileLoaded = "if-file-loaded";
	this._submitBtn = "input#if-sumbit";
	this._form = "#i-form";
	this._userInputKey = 'user_input'; //INI
	this._cookieID = Cookies.get('id_client');


	//////////////////////////////////
	/// DATA 
	//////////////////////////////////	
	this.data={
			images:[],
			header:{},
			content:{}
		};

	this.files = new FormData();
}

IForm.prototype = {
	constructor: IForm,
	
	imageDefaults:{	dimensions: {x:1200, y:800},
					formats : ["jpg", "png", "tiff"]
					},
	
	//////////////////////////////////
	/// CREATION  
	//////////////////////////////////

	createElements: function(){
		var iform = this;
		$(IForm_ImageBuilder.prototype.if_class).each(function(){
			c(this);
				new IForm_ImageBuilder($(this), 
					IForm.prototype.imageDefaults, 
					iform.data.images);
		});
	},

	//////////////////////////////////
	/// EVENTS 
	//////////////////////////////////
	
	setImageSrc:function(obj, imageData){
		$(obj)
			.siblings(this._silbingImage)
			.attr("src", imageData );
	},

	setLabelClass:function(obj){
		$(obj)
			.siblings("label")
			.addClass(this._fileLoaded);
	},

	setEvents:function(){
		this.setImgEvent();
		this.setSubmitEvent();
	},

	setImgEvent:function(){
		var iform = this;
		$(this._loaders).change(function(event){
			var data = {name:$(this).attr("name")};
			iform.data.images.push(data);

			iform.files.append(data.name, event.target.files[0]);
			
			data.originalTitle = event.target.files[0].name;
			data.type = event.target.files[0].type;
			data.size = event.target.files[0].size;
			data.imageData = (URL || webkitURL).createObjectURL(event.target.files[0]);
			data.file = event.target.files[0];
			data.uploads ++;
			iform.setImageSrc(this, data.imageData );
			iform.setLabelClass(this);

			//TODO: add "remove Image button"
		});
	},

	setSubmitEvent:function(){
		var iform = this;

		$(this._form).submit(function(event){
			iform.files.append("CLIENT_ID", iform._cookieID);

			if (typeof iform.data.images[0].file != undefined)
			$.ajax({
				url:'recibe_files.php',
				type:"POST",
				data: iform.files,
				cache: false,
				contentType: false,
		    	processData: false,

		    	xhr: function(){
		    		var myXhr = $.ajaxSettings.xhr();
		    		if (myXhr.upload) {
		                // For handling the progress of the upload
		                myXhr.upload.addEventListener('progress', function(e) {
		                    if (e.lengthComputable) {
		                    	c( e.loaded + " | " + e.total);
		                    }
		                } , false);
		            }
		            return myXhr;
		    	},

		    	success: function(respose){
		    		c(respose);
		    	}
			});

			// iform.data.images.forEach(function(image){
			// 	$('<input />').attr('type', 'hidden')
			// 	         .attr('name', iform._userInputKey+"[img][]")
			// 	         .attr('value', image.imageData)
			// 	         .appendTo(iform._submitBtn);
			// 	});
			
			return false;
		});


		// $(this._submitBtn).click(function(e){
		// 	e.preventDefault();
		// });
	}
}



//////////////////////////////////
/// INHERITANCE TEST
///  
//////////////////////////////////

// //Input Builder dovrebbe essere il genitore, adesso ne ha soltanto delle proprietà di prova
// function InputBuilder(){
// 	this.basicProp = "que paja";

// 	this.print = function(){ c(this.basicProp); };
// }

// //Questa serve soltanto per provare a eredirate sia le "data-members", che i metodi
// //Per ora il pattern "parasitic inheritance sembra d'essere quello che funziona meglio",
// //Ma non risco a soprascrivere la funzione print().
// //
// function Child(){
// 	var parent = new InputBuilder();
// 	parent.extraProp = "realmente una paja"

// 	parent.print = function(){
// 		parent.print();
// 		c(parent.extraProp);
// 	}

// 	return parent;

// }

// // Child.prototype = Object.create(InputBuilder.prototype);
// var elpapa = new InputBuilder();
// var elchild = new Child();
// // elchild.print();
// // c(elchild.b)


