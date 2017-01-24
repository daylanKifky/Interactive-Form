 // var loadFile = function(event) {
 //    var output = document.getElementById('image_to_display');
 //    output.src = URL.createObjectURL(event.target.files[0]);
 //  };



(function($){
	$(document).ready(function(){
		var loaders = $(".if-image-loader").click(function(e){
			e.preventDefault();

			$("label[for="+e.target.id+"]").css("background-image",
			 "url('http://workco.it/img/workco_logo.png')");
			// console.log("label[for="+e.target.id+"]");
			// console.log($("label[for="+e.target.id+"]").css("border", "6px solid black"));
		});

	});
}(jQuery));
// http://workco.it/img/workco_logo.png