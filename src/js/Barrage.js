var btn = document.getElementById('btn');
var text = document.getElementsByTagName('input')[0];

//焦点在input时键盘enter和btn绑定
text.onfocus = function() {
	document.onkeydown = function(e) {
		if(!e) {
			e = window.event;
		}
		if((e.keyCode || e.which) == 13) {
			btn.click();
		}
	};
};
//input失去焦点时enter解绑
text.onblur = function() {
	document.onkeydown = function(e) {
		if(!e) {
			e = window.event;
		}
		if((e.keyCode || e.which) == 13) {
			return false;
		}
	};
};
//点击发射按钮发送弹幕
btn.onclick = function() {
	//判断输入为空时提醒输入
	var space  = /^[\s]*$/;

	if(text.value === '' || space.test(text.value)) {
		alert('请输入弹幕内容QAQ=。=');
		return false;
	}
	//生成个节点进行appendChild
	var ulNode = document.getElementById('list-list');
	var screen = document.getElementById('Bscreen');
	var liNode = document.createElement('LI');
	var pNode = document.createElement('P');
	var BpNode = document.createElement('P');
	//定义预设颜色值
	var randomColor = ['red', 'white', 'green', 'blue', 'yellow'];
	//给弹幕增加随机颜色
	BpNode.style.color = randomColor[Math.floor(Math.random() * 5)];
	var randomnum = Math.random() * 90;
	BpNode.style.top = randomnum + '%';
	var spanNode = document.createElement('SPAN');
	var textNode = document.createTextNode(text.value);
	var BtextNode = document.createTextNode(text.value);
	console.log(textNode);
	var pDate = new Date();
	var pH = pDate.getHours();
	var pM = pDate.getMinutes();
	var pS = pDate.getSeconds();

	if(pM < 10) {
		pM ='0'+ pM;
	}
	if(pS < 10) {
		pS ='0'+ pS;
	}
	var Blist = document.getElementsByClassName('list-content')[0];
	var timeNode = document.createTextNode(pH + ":" + pM + ":" + pS);
	console.log(timeNode);
	pNode.appendChild(textNode);
	spanNode.appendChild(timeNode);
	liNode.appendChild(pNode);
	liNode.appendChild(spanNode);
	ulNode.appendChild(liNode);
	BpNode.appendChild(BtextNode);
	Bscreen.appendChild(BpNode);
	//弹幕到最右删除节点
	setTimeout('Bscreen.removeChild(Bscreen.childNodes[0]);', 8000);
	//滚动条置底
	Blist.scrollTop = Blist.scrollHeight;
	//发送完成input的value值重置为空
	text.value ='';
};