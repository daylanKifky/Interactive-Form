//////////////////////////////////
/// Utility 
//////////////////////////////////

var c = console.log;

//////////////////////////////////
/// Onload 
//////////////////////////////////
(function($){
	$(document).ready(function(){

		//////////////////////////////////
		/// IFORM CONFIG 
		//////////////////////////////////

		var configuration = {
			userInputKey: 'user_input',
			cookieID : 'id_client',
			main_submit_label :'Enviar',
			user_imgs : 'user_imgs'
		};


		//////////////////////////////////
		/// Run 
		//////////////////////////////////
		
		theForm = new IForm(configuration);
		theForm.createElements();
		theForm.setEvents();

		validator.setImgValidation();
		theForm.setValidation();
		validator.preventEarlySubmit(theForm.submitMainForm);


		//////////////////////////////////
		/// Extras 
		//////////////////////////////////

		$('#if-header-tel input').on("change",function(e){
			var value = "<strong>Telefono (";
			value += $( this ).val();
			value += ")</strong>";
			$('#if-tel-option').html(value);
		});

		$('#if-header-mail input').on("change",function(e){
			var value = "<strong>E-mail (";
			value += $( this ).val();
			value += ")</strong>";
			$('#if-email-option').html(value);
		});


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
	this.id = jQObject.attr("id")+"_input";
	this.name = jQObject.attr("if-label");
	this.dimensions = imgSpecs.dimensions;
	this.formats = imgSpecs.formats;

	this.input = '<input class="if-image-loader i-validator" type="file"' +
				' name="'+ this.name + 
				'" id="'+ this.id +'" />';
	this.elements = '<img class="if-up-image" src="" alt="User uploaded Image">'+
                    '<label for="'+this.id+'"></label>';

    this.uploadBar = null;

    var newImgForm = $(this.input);
    jQObject.html(newImgForm).append(this.elements);
    dataObj[this.name] = {imageData:"", uploads:0, originalTitle:"", type:""};
}

	IForm_ImageBuilder.prototype.if_class = ".if-image-loader";


//////////////////////////////////
/// IFORM 
//////////////////////////////////

function IForm(config){
	this._loaders = "input.if-image-loader";
	this._silbingImage = ".if-up-image";
	this._fileLoaded = "if-file-loaded";
	this._submitBtn = "input#if-sumbit";
	this._form = "#i-form";

	this._userInputKey = config.userInputKey;
	this._cookieID = Cookies.get(config.cookieID);
	this._mainSubmitLabel = config.main_submit_label;
	this._userImgs = config.user_imgs;

	this._validator = validator;

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
				new IForm_ImageBuilder($(this), 
					IForm.prototype.imageDefaults, 
					iform.data.images);
		});
	},

	//////////////////////////////////
	/// EVENTS 
	//////////////////////////////////
	
	setValidation: function(){
		var iform = this;
		$( ".i-validator" )
		.each(function(){
				var input = $(this);
				iform._validator.errors[input.attr("id")] = "empty";
				iform._validator.showMessage = false;
				iform._validator[input.attr("id")](input);
				iform._validator.errno ++;
			})
		.change(function() {
			var input = $(this);
			iform._validator.showMessage = true;
			var handler = iform._validator[input.attr("id")];
			if (typeof handler !== "undefined")
				handler(input);
			else
				c("Missing validator for: " + input.attr("name"));
 			
		});
		var counter = 0;
		for (var err in validator.errors){ 
			if (validator.errors.hasOwnProperty(err)) 
				counter ++; 
		}
		if (counter < iform._validator.errno)
			console.log("some validator elements without id!")
	},

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
	
			if (typeof event.target.files[0] == "undefined")
				return;

			iform.data.images.push(data);

			iform.files.set(data.name, event.target.files[0]);
			
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
	submitMainForm:function(){
		var iform = this;
		$("<input type='hidden'/>")
			.attr("name", 'main-submit')
			.attr("value", iform._mainSubmitLabel)
			.appendTo(iform._form);

		$(iform._form).submit();
	},

	setSubmitEvent:function(){
		var iform = this;

		$(this._submitBtn).click(function(event){
			event.preventDefault();
			iform.files.set("CLIENT_ID", iform._cookieID);

			if (typeof iform.data.images[0] !== "undefined" && iform._validator.allValidated()){
				$('#if-loading').removeClass("if-hide");
				var bar = new ProgressBar.SemiCircle()

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
			                    	c( e.loaded + " | " + e.total + " | " + e.loaded / e.total);
			                    	iform.progressBar("#progressBar").animate(e.loaded / e.total);
			                    }
			                } , false);
			            }
			            return myXhr;
			    	},

			    	success: function(response){
			    		$('#if-loading').addClass("if-hide");
			    		try {
			    			var result = $.parseJSON(response);

				    		if (result.errors.length > 0)
				    			alert("errors"); // TODO HANDLE PROPERLY (redu form?)

				    		result.recivedFiles.forEach(function(image){
				    			// c(image);
			    				$('<input />').attr('type', 'hidden')
			    				         .attr('name', iform._userInputKey+"["+iform._userImgs+"]["+ image.field +"]")
			    				         .attr('value', image.original_name)
			    				         .appendTo(iform._form);
				    		});

				    		$('<input />').attr('type', 'hidden')
				    			.attr("name", iform._userInputKey+"["+iform._userImgs+"][sub_path]" )
				    			.attr("value", result.destSubPath )
				    			.appendTo(iform._form);

				    		if (result.errors !== [])
			    				$('<input />').attr('type', 'hidden')
			    					.attr("name", iform._userInputKey+"["+iform._userImgs+"][errors]" )
			    					.attr("value", result.errors.toString() )
			    					.appendTo(iform._form);
			    		
			    		 	iform.submitMainForm();
			    		
			    		} catch (e){
			    			c(response);
			    			c(e);
			    		}
			    		
			    		

			    	}
				}); //ajax end
			}
			else
				if (iform._validator.allValidated())
					iform.submitMainForm();
			// return true;
		}); //on button click end
	}, //setSubmitEvent end

	progressBar: function(container) {
		if (this.uploadBar == null)
			this.uploadBar = new ProgressBar.SemiCircle(container, {
						  strokeWidth: 6,
						  color: '#FFEA82',
						  duration:300,
						  // trailColor: '#eee',
						  // trailWidth: 1,
						  easing: 'easeInOut',
						  svgStyle: null,
						  text: {
						    value: '',
						    alignToBottom: false,
						    fontSize: '28px'
						    // style: {
						    //        // or fontSize: '28px'
						    //        'font-size': '28px'
						    //      }
						  },
						  from: {color: '#FFEA82'},
						  to: {color: '#ED6A5A'},
						  step: (state, bar) => {
						     bar.path.setAttribute('stroke', state.color);
						     var value = Math.round(bar.value() * 100);
						     if (value === 0) {
						       bar.setText('');
						     } else {
						       bar.setText(value+ "%");
						     }

						     bar.text.style.color = state.color;
						   }
						});
			this.uploadBar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			this.uploadBar.text.style.fontSize = '2rem'

		return this.uploadBar;
	}
	
}


//////////////////////////////////
/// EXTRAS 
//////////////////////////////////





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


