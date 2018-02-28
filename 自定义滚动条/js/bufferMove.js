//获取非行间样式

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]
	}else{
		return getComputedStyle(obj,null)[attr]
	}
}



//缓冲运动框架

function move(obj,json,time,fn){
	var timer = null;
	clearInterval(timer);
	timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			var now;
			var speed;
			if(attr == 'opacity'){
				now = getStyle(obj,attr)*100;
				speed = (json[attr]*100-now)/10
			}else{
				now = parseInt(getStyle(obj,attr));
				speed = (json[attr]-now)/10
			}
			speed = speed>0?Math.ceil(speed):Math.floor(speed)
			//判断所有值是否都达到终点
			
			if(attr=="opacity"){
				if(now/100!=json[attr]){
					flag = false;
				}
				obj.style.opacity=(now+speed)/100;
				obj.style.filter="alpha(opacity:"+(now+speed)+")"
			}else{
				if(now!=json[attr]){
					flag = false;
				}
				obj.style[attr]=now+speed+"px";
			}
		}
		if(flag){	
			clearInterval(timer);
			if(fn){
				fn();
			}
		}
	},time)
}	
	
	
	
	

