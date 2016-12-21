$(".head").on("tap",function(){
	window.history.back();
	
})

$(".login_bottom_left").on("tap",function(){
	window.location.href = "../login/login_register.html";
	
})

$(".login_bottom_right").on("tap",function(){
	window.location.href = "../login/login_forget.html";
	
})