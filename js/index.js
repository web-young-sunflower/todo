$(function(){
	$("#header .add").on("touchend",function(){
		$(".tan").css("display","block");
	})
	$("#header .san").on("touchend",function(){
			$(".ce").css("display","block");
	})
	$(".ce").on("touchend",function(){
			$(".ce").css("display","none");
	})
	//添加事件
	var input=$(".tan input");
	var arr=[];
	var ul=$(".ul");
	if(localStorage.arr){
		arr=JSON.parse(localStorage.arr);
		render();
	}
	$(".tan .add").on("touchend",function(){
	var v=$.trim(input.val());
   	if(!v){
     		return;
   	}
     	var todo={
     		name:v,
     		state:0,
     	};
     	arr.push(todo);
     	localStorage.arr=JSON.stringify(arr);
     	render();
     	input.val("");
     	$(".tan").css("display","none")
	});
	
	
	var startpos;
     ul.on("touchstart","li",function(e){
     	startpos=e.originalEvent.changedTouches[0].clientX;     	
     })
	 ul.on("touchend","li",function(e){
	 	var endpos=e.originalEvent.changedTouches[0].clientX;
	 	var index=$(this).index();
	 	 if(endpos-startpos>50){
	 		arr[index].state=1;		
	 		$(this).addClass("done");
	 	}
	  if(endpos-startpos<-50){
	 		arr[index].state=0;
	 		$(this).removeClass("done");
	 	}
	  localStorage.arr=JSON.stringify(arr);
	 })
//   删除
	var delete1=$(".delete");
	var li=$(".ul li");
	li.on("touchend",".delete",function(){
//	    alert(1);
	 	li=$(".ul li");
	 	delete1=$(".delete");
	 	var index=delete1.index($(this));
	 	console.log(index);
	 	arr.splice(index,1);
	 	localStorage.arr=JSON.stringify(arr);
	 	li.eq(index).remove();
	  })
	function render(){
   	    ul.empty();  	
     	for(var i=0;i<arr.length;i++){
     		var c=(arr[i].state)?"done":""
     		$("<li class='"+c+"'><div class='con'>"+arr[i].name+"<div class='start'>开始</div><div class='delete iconfont'>&#xe60d;</div>")
     		.appendTo(ul);
     	}
   }
	//
	var all=$("#footer .all");
   var finshed=$("#footer .finshed");
   var plan=$("#footer .plan");
   all.on("touchend",function(){
   	$("#footer div").removeClass("active");
   	$(this).addClass("active");
   	$(".ul li").show();
   })
   finshed.on("touchend",function(){
   	$("#footer div").removeClass("active");
   	$(this).addClass("active");
   	$(".ul").find('li:not(.done)').hide();
   	   	$(".ul .done").show();
   })
   plan.on("touchend",function(){
   	$("#footer div").removeClass("active");
   	$(this).addClass("active");
   	$(".ul .done").hide();
   	   	$(".ul").find('li:not(.done)').show();
   })
})
