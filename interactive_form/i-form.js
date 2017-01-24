
(function($){
	$(document).ready(function(){
		// alert("this");
		theForm = new IForm($);
		theForm.setEvents();
	});
}(jQuery));




function IForm(){
	// var $ = jQuery;
	this._loaders = ".if-image-loader";

}

IForm.prototype = {
	constructor: IForm,
	
	createImgNode:function(src){
		return '<img class="if-up-image" src="'+
			src +
			'" alt="User uploaded Image">';
	},
	setEvents:function(){
		var iform = this;
		$(this._loaders).change(function(e){
			// e.preventDefault();
			console.log($(this).siblings(".if-up-image"));

			$(this).siblings(".if-up-image").attr("src",URL.createObjectURL(e.target.files[0]));
			// console.log($("label[for="+e.target.id+"]").css("border", "6px solid black"));
		});

	}



}
