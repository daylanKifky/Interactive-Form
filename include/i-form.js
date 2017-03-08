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
		/// CLIENT DEVICE CHECK 
		//////////////////////////////////
		
		// Safari 3.0+ "[object HTMLElementConstructor]" 
		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
		if (isSafari)
			$('.alert-camp').css("display", "none");

		mobilecheck = function() {
		  var check = false;
		  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		  
			return check;
		};

		function detectRes() {
		   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
		     return true;
		   } else {
		     return false;
		   }
		}

		if (mobilecheck() || detectRes()){
			$("#if-full-error").removeClass("if-hide");
		}

		//////////////////////////////////
		/// IFORM CONFIG 
		//////////////////////////////////

		var configuration = {
			userInputKey: 'user_input',
			cookieID : 'id_client',
			main_submit_label :'Enviar',
			user_imgs : 'user_imgs',
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
	this.transparent = 'http://localhost/trendmap/wp-content/themes/trendmap_theme/img/transparent.gif';

	this.input = '<input class="if-image-loader i-validator" type="file"' +
				' name="'+ this.name + 
				'" id="'+ this.id +'" />';
	this.elements = '<img class="if-up-image" src="'+ this.transparent +'" alt="User uploaded Image">'+
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
		var loader = $(obj);

		var imgElem = loader
			.siblings(this._silbingImage)
			.attr("src", imageData );

		//Center the image
		var contW = loader.parent().width();
		var contH = loader.parent().height();
		var imgW, imgH;
		var img = new Image();
        img.onload = function () { //LESS RATIO = MORE "PORTRAIT"
        	var parentRatio = contW / contH;
        	var imgRatio = this.width / this.height;
        	var reduction;

        	if (parentRatio < imgRatio){ 
	            reduction = contH/this.height;
	            imgElem.css("margin-left", (-(this.width*reduction)+ contW )/2)
	            	.css("margin-top", 0)
	            	.css('width', this.width*reduction )
	            	.css('height', this.height*reduction);

        	} else if (parentRatio > imgRatio) {
        		reduction = contW/this.width;
        		imgElem.css("margin-top", (-(this.height*reduction)+ contH )/2)
        			.css("margin-left", 0)
	        		.css('width', this.width*reduction )
	        		.css('height', this.height*reduction );
        	}

        };
        img.src = imageData;

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

				var request = $.ajax({
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

				$('#ajax-abort').click(function(){
					request.abort();
					$('#if-loading').addClass("if-hide");
				})

				
			
			} else if (iform._validator.allValidated()){
					iform.submitMainForm();
			} else {
				$("#error-camp").addClass('if-field-error').html("<p>Algunos de los campos requeridos presentan errores o estan vacios</p>");
				$( ".i-validator" )
				.each(function(){
						var input = $(this);
						// iform._validator.errors[input.attr("id")] = "empty";
						iform._validator.showMessage = true;
						iform._validator[input.attr("id")](input);
					});
				window.scrollTo(0,0);
			}
			// return true;
		}); //on button click end
	}, //setSubmitEvent end

	progressBar: function(container) {
		if (this.uploadBar == null)
			this.uploadBar = new ProgressBar.SemiCircle(container, {
						  strokeWidth: 6,
						  // color: '#FFEA82',
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
						  from: {color: '#22668E'},
						  to: {color: '#CE4481'},
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

