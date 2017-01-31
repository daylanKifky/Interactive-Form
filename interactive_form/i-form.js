var c = console.log;
(function($){
	$(document).ready(function(){

		//Questo sarebbe l'uso basico della parte che già funziona. (adesso commentato per provare l'inheritance)
	
		// theForm = new IForm($);
		// theForm.createElements();
		// theForm.setEvents();
	

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
/// INHERITANCE TEST
///  
//////////////////////////////////

//Input Builder dovrebbe essere il genitore, adesso ne ha soltanto delle proprietà di prova
function InputBuilder(){
	this.basicProp = "que paja";

	this.print = function(){ c(this.basicProp); };
}

//Questa serve soltanto per provare a eredirate sia le "data-members", che i metodi
//Per ora il pattern "parasitic inheritance sembra d'essere quello che funziona meglio",
//Ma non risco a soprascrivere la funzione print().
//
function Child(){
	var parent = new InputBuilder();
	parent.extraProp = "realmente una paja"

	parent.print = function(){
		parent.print();
		c(parent.extraProp);
	}

	return parent;

}

// Child.prototype = Object.create(InputBuilder.prototype);
var elpapa = new InputBuilder();
var elchild = new Child();
// elchild.print();
// c(elchild.b)


//--------- La parte di qua sotto funziona bene, ma visto che 
//ci sono diversi tipi di input, ho pensato che non sarebbe male 
//fare un unico "input-Builder" da cui derivare gli altri 
//


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

	//////////////////////////////////
	/// DATA 
	//////////////////////////////////	
	this.data={
			images:{},
			header:{},
			content:{}
		};
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
			var data = iform.data.images[$(this).attr("name")];
			
			data.originalTitle = event.target.files[0].name;
			data.type = event.target.files[0].type;
			data.size = event.target.files[0].size;
			data.imageData = URL.createObjectURL(event.target.files[0]);
			data.uploads ++;
			iform.setImageSrc(this, data.imageData );
			iform.setLabelClass(this);

			//TODO: add "remove Image button"
		});
	},

	setSubmitEvent:function(){
		var iform = this;
		$(this._submitBtn).click(function(e){
			e.preventDefault();
		});
	}
}




