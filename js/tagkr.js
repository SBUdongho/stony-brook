
var _URL = window.URL || window.webkitURL;
var tagkey = {10: 1, 13: 1, 32: 1, 107: 1, 110: 1, 186: 1, 188: 1, 190: 1}; //7개: \(220)은 허용

//http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily/4770179#4770179
var keys = {32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1};

//var regpw = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
var regid = /^[a-zA-Z0-9_]+$/;
//var Alphanum = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
//var Alpha = /^[a-zA-Z_]+$/;
var Em = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

var tpw;


function isInArray(value, array) {
	return array.indexOf(value) > -1;
}
			
function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function pasteHtmlAtCaret(html) {
	var sel, range;
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			var el = document.createElement("div");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(), node, lastNode;
			while ( (node = el.firstChild) ) {
				lastNode = frag.appendChild(node);
			}

			var firstNode = frag.firstChild;
			range.insertNode(frag);
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if ( (sel = document.selection) && sel.type != "Control") {
		var originalRange = sel.createRange();
		originalRange.collapse(true);
		sel.createRange().pasteHTML(html);
	}
}



function howlong(time){
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		daue = (new Date()).toISOString();
		dave = new Date((daue || "").replace(/-/g,"/").replace(/[TZ]/g," "));
		diff = ((dave.getTime() - date.getTime()) / 1000),
		days = Math.floor(diff / 86400);			
	if ( days < 0 ) {
		return "방금 전";
	}
	return (diff < 60 && "방금 전" || diff < 120 && "1분 전" || diff < 3600 && Math.floor( diff / 60 ) + "분 전" || diff < 7200 && "1시간 전" || diff < 86400 && Math.floor( diff / 3600 ) + "시간 전") || days < 7 && days + "일 전" || days < 31 && Math.ceil( days / 7 ) + "주 전" || days < 365 && Math.ceil( days / 30 ) + "달 전" || days >= 365 && Math.floor( days / 365 ) + "년 전";
}//days == 1 && "어제니까" + Math.floor( diff / 3600 ) + "시간 전" || 
	

/*
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}*/
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//

/*
window.onbeforeunload = function (e) {
    var e = e || window.event;

    // For IE and Firefox
    if (e) {
        e.returnValue = 'Leaving the page';
    }

    // For Safari
    return 'Leaving the page';
};*/
/*
window.onpopstate = function(e){
	if(e.state){
		document.getElementById("content").innerHTML = e.state.html;
		document.title = e.state.pageTitle;
		alert(document.title);
	}
};*/

	
	//$(this).animate({position: 'fixed', right: '5%'}, 'slow');


/*
window.onscroll = function() {
	if (window.pageYOffset >= 200) {
       	jQuery('#rightbox').css({position: 'fixed', left: '70%'});
		//$("#rightbox").animate({position: 'fixed', right: '5%'}, 'slow');
	}
	else {
		jQuery('#rightbox').css({position: '', left: ''});
		//$("#rightbox").animate({position: '', right: ''}, 'slow');
	}
};*/

/*
window.onresize = function(event) {

	if (window.outerWidth < 1080) {
		jQuery('#rightbox').css({position: ''});
		//alert('floated');
	} else {
		jQuery('#rightbox').css({position: 'fixed'});
		//alert('fixed');
	}
};*/
	
	
//$(window).width() + a;



$(document).ready(function() {
	
	
	

	
});



window.onload = function(){
	
	
	
$('.ttnbtn').on('dragstart', false);
document.getElementById('logo').ondragstart = function() { return false; };

	
//alert($(window).width());
	var teid, temp;
	
	if (navigator.cookieEnabled == false) {
		alert('브라우저 설정에서 쿠키 사용을 허용해주세요');
	}
	//alert(navigator.cookieEnabled);
	
	if (document.cookie.indexOf('tags=') == -1) {
		document.cookie = "tags=,한글,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
	}
	
	if (document.cookie.indexOf('login=') == -1) {
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
	}
	
	if (document.cookie.indexOf('temp=') == -1) {
		document.cookie = "temp=,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
	}
	
	if (document.cookie.indexOf('lastag=') == -1) {
		document.cookie = "lastag=,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
	}
	
	
	var ocode1 = document.cookie.split('code=');
	var ocode2 = ocode1[1].split(';');

	//ocode를 쿠키에 넣어주면 안 된다. 변수로 처리해야된다.
	
	

	/*
	if (document.cookie.length < 1) {
		document.cookie = "tags=,한글,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "lastag=,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
	}*/
	
	//var lang = navigator.language || navigator.userLanguage;
	//alert(document.cookie);
	//alert(window.navigator.language.substr(0,2));
	//if (navigator.cookieEnabled == 1)
	
	var socket = io.connect(); //소켓서버 연결
	
	
	

	//window.history.pushState({},"", 'http://127.0.0.1:8000/');

	//다 나눠준다. 태그가 없을 경우 한글로 설정한다.
	if (document.cookie.indexOf('tags=') > -1) {
		var cookietag1 = document.cookie.split('tags=');
		var cookietag2 = cookietag1[1].split(';');
		cookietag2[0].replace(/ /g,'');
		while (cookietag2[0].indexOf(',,') > -1) {	//이거만이 아니라 중복 제거도? 우선은 필요 없다.
			cookietag2[0] = cookietag2[0].replace(/,,/g, ',');
		}
				
		cookietag2[0] = replaceAll(cookietag2[0], '>', '');
		cookietag2[0] = replaceAll(cookietag2[0], '<', '');
		cookietag2[0] = replaceAll(cookietag2[0], ';', '');
		cookietag2[0] = replaceAll(cookietag2[0], '.', '');
		if (cookietag2[0].toString().length <= 2) {
			cookietag2[0] = ',한글,';
		}
		
		document.cookie = "tags=" + cookietag2[0] + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		
		socket.emit('IamOnline', {
			tag: cookietag2[0].slice(1,-1),
			oco: ocode2[0]
		});
		

		socket.emit('me10', cookietag2[0].slice(1,-1));
		
		var mytags = cookietag2[0].replace(',한글,', ',').slice(1,-1).split(',');
		if (mytags[0]) {
			for (var t in mytags) {
				var tli =  '<li>' + mytags[t] + '</li>';
				$("#taglist").append(tli);
			}
		}
		
	} else {

		document.cookie = "tags=,한글,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		socket.emit('IamOnline', {
			tag: '한글',
			oco: ocode2[0]
		});
		socket.emit('me10', '한글');
	}
	

	if (document.cookie.indexOf('login=') > -1 && document.cookie.indexOf('temp=') > -1) {
		
		var cookielogin1 = document.cookie.split('login=');
		var cookielogin2 = cookielogin1[1].split(';');
		
		var cookietemp1 = document.cookie.split('temp=');
		var cookietemp2 = cookietemp1[1].split(';');
		
		if (cookielogin2[0] && cookietemp2[0]) {
			socket.emit('login', {
				id: cookielogin2[0],
				pw: md5(ocode2[0] + cookietemp2[0])
			});
		}	


	}


	var wlh = window.location.href.split('/');

	var wl = wlh[3];
	//alert(wl);
	if (wl && wl.length > 0) {

		if (Math.round(wl) == wl) {
			
			//setTimeout( function() {
				
			//$('body').css('overflow','hidden');
			$("#view").dialog({
				height: 750,
				width: 700,
				position: {
					my: "center",
					at: "center",
					of: window
				},
				modal: true
			});
			
			socket.emit('sendme', wl);	//순서문제였다.
			socket.emit('givemeco', wl);
				
				
			//}, 500);
			//

		} else if (wl == 'verified') {
			alert('이메일 인증이 완료되었습니다.');
		}
	}

	window.history.pushState('', '', '/');
	
	
	
	socket.on('toofast', function(){
		$("#sending").attr('style', "display: none;");
		alert('글은 5초 이상의 간격을 두고 작성할 수 있습니다.');
	}),
	
	socket.on('tfc', function(){
		alert('댓글은 1초 이상의 간격을 두고 작성할 수 있습니다.');
		document.getElementById("com").focus();	
	}),
	
	socket.on('csucc', function(){
		$("#com").val('');
		document.getElementById("com").focus();	
	}),
	
	socket.on('cfail', function(){
		alert('댓글을 쓸 수 없는 글입니다.');		
	}),
	

	socket.on('dupid', function(){
		$("#loading").attr('style', "display: none;");
		alert('이미 등록된 아이디입니다.');
		document.getElementById('signid').focus();
	}),
	
	socket.on('dupname', function(){
		$("#loading").attr('style', "display: none;");
		alert('이미 등록된 닉네임입니다.');
		document.getElementById('signname').focus();
	}),
	
	socket.on('dupnc', function(){
		alert('이미 등록된 닉네임입니다.');
	}),
	socket.on('gapnc', function(){
		alert('닉네임은 24시간마다 변경할 수 있습니다.');
	}),
	socket.on('ncsuc', function(){
		alert('닉네임이 변경되었습니다.');
		window.location = '/';
	}),
	
	socket.on('pwsc', function(){
		$("#npwing").attr('style', "display: none;");
		alert('비밀번호가 변경되었습니다.');
		document.cookie = "temp=" + tpw + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		window.location = '/';
	}),
	socket.on('pwfl', function(){
		$("#npwing").attr('style', "display: none;");
		alert('비밀번호를 다시 확인해주세요.');
	}),
	
	socket.on('rssc', function(){
		$("#resetting").attr('style', "display: none;");
		alert('메일 주소로 임시 비밀번호가 발송되었습니다.');
		$("#reset").dialog('close');
	}),
	
	socket.on('rsfl', function(){
		$("#resetting").attr('style', "display: none;");
		alert('정보를 다시 확인해주세요.');
	}),
	
	socket.on('signed', function(){
		$("#loading").attr('style', "display: none;");
		alert('인증 메일이 발송되었습니다.');		
		$("#signin").dialog('close');
	}),
	
	socket.on('msgsuc', function(){
		$("#noting").attr('style', "display: none;");
		$('#messagesend').dialog('close');
		alert($("#sfr").val().slice(0,-1) + '에게 쪽지를 전송했습니다.');
	}),
	
	socket.on('msgful', function(){
		$("#noting").attr('style', "display: none;");
		$('#messagesend').dialog('close');
		alert('수신자의 쪽지함이 가득 차 전송에 실패했습니다.');
	}),
	
	socket.on('left', function() {
		alert('태그타임 서비스에서 탈퇴되었습니다.');
		$("#leaving").attr('style', "display: none;");
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		window.location = '/';
	}),
	
	socket.on('lpwrong', function() {
		$("#leaving").attr('style', "display: none;");
		alert('비밀번호를 다시 확인해주세요.');
	}),
	
	socket.on('already', function() {
		alert('이미 추천한 글입니다.');
	}),
	
	socket.on('vfail', function() {
		alert('더 이상 추천할 수 없는 글입니다.');
	}),
		
	socket.on('deleted', function(id) {
		alert('글이 삭제되었습니다.');
		$("#view").dialog('close');
		$("#abox").find("[alt='" + id + "']").hide('slow', function(){ $("#abox").find("[alt='" + id + "']").remove(); });
	}),
	
	socket.on('delcom', function(id) {
		$("#view-cbox").find("[cid='" + id + "']").hide('slow', function(){ $("#view-cbox").find("[cid='" + id + "']").remove(); });
	}),
	

	socket.on('logged', function(data) {			//data.pic 유저 설정 사진, data.tag 유저 설정 태그. 이거랑 기존 설정 태그랑 겹치지 않도록 처리.
		$("#nonbox").attr('style', "display: none;");
		$("#inbox").attr('style', "display: block;");
		$("#propic").attr('src', "pics/" + data.pic);
		
		//data.uid
		
		var cookielogin1 = document.cookie.split('login=');
		var cookielogin2 = cookielogin1[1].split(';');
		
		var cookietemp1 = document.cookie.split('temp=');
		var cookietemp2 = cookietemp1[1].split(';');
		
		//if (!cookielogin2[0] || !cookietemp2[0]) {}
		if (teid && temp) {
			document.cookie = "login=" + teid + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
			document.cookie = "temp=" + temp + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		}
		
		var nam = '<label for = "proname"><div id = "proname" alt ="' + data.uid + '">' + data.nam + '</div></label>';		
		$(nam).insertAfter('#propic');
		
		var tl = '문의: <a href="mailto:tagtimemaster@gmail.com">tagtimemaster@gmail.com</a> ©tagtime.net <a href="#" id="pwset" style="margin-left:20px;">비밀번호변경</a> <a href="#" id="leave" style="float:right; margin-right:10%;">회원 탈퇴</a>';
		document.getElementById("footer").innerHTML = tl;
	}),
	
	
	socket.on('prset', function(ufn) {		
		$("#propic").attr('src', "pics/" + ufn);
	}),
	
	socket.on('unlogged', function() {
		alert('아이디와 비밀번호를\n다시 확인해주세요');
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		
	}),
	
	socket.on('unverified', function() {
		alert('이메일 인증 후 사용할 수 있습니다.');
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
	}),
	



	socket.on('wrote', function(wrote){
		//$('body').css('overflow','hidden');
		$("#view").dialog({
			height: 750,
			width: 700,
			//title: $("#faketitlesend").text(),
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		
		//$("#view-tagbox").append($("#tagsent").val());
		$("#sending").attr('style', "display: none;");
		document.cookie = "lastag=" + $("#realwritetag").val().replace(',한글,', ',') + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		$('#write').dialog('close');

		socket.emit('sendme', wrote);
		$("#ananan").html(wrote);
		return false;
	}),
	
	
	
	socket.on('newnote', function(){
		//alert('newnote');
		$("#note").animate({'color': '#f47c20'}, 1000, function() {
			$('#note').animate({color: 'black'}, 1000);
		});

	}),

	
	socket.on('newmsg', function(){
		//alert('newmsg');
		/*
		$('#message').animate({backgroundColor:'red'});		
		setTimeout(function(){
			$('#message').animate({backgroundColor: '#f47c20'});
		}, 500);*/
		
		$("#message").animate({'color': '#f47c20'}, 1000, function() {
			$('#message').animate({color: 'black'}, 1000);
		});
	}),
	

	
	
	
	socket.on('add', function(data){

		$("#faketitleget").html(data.at);
		
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		/*
		var tl;
		var nl;
		var agl = data.ag.replace(',한글', ',').slice(1,-1).split(',');
		
		$("#taglist li").each(function(){
			tl = tl + $(this).text() + ',';
		});
		var tll = tl.split(',');
		for (var i in tll) {
			if (agl.indexOf(tll[i]) > -1) {
				agl.splice(agl.indexOf(tll[i]), 1);
				nl = nl + ',' + tll[i];
			}
		}
		var pl = alg.join();
		nl = nl + ',' + pl;
		ag = replaceAll(nl, ',', ' #');
		*/
		
		if (data.au) {
			var alitem = '<li class="as" style="background-color:#D7F5FF;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		} else {
			var alitem = '<li class="as" style="background-color:#F3FCFF;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "비회원" + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';		
		}
		$(alitem).prependTo('#abox').hide().slideDown();

//$(window).scrollTop() + $(window).height() == $(document).height()
//$(window).height() - $(window).scrollTop() > 200
//$(document).height() - $(window).height() - $(window).scrollTop()
		
		if ($(document).height() > $(window).height() && $(document).height() - $(window).height() - $(window).scrollTop() < 1000) {
			//스크롤바가 있고, 아래쪽이라면
		} else {	//없거나 위다

			if ($("#abox li").length > 50) {
				//alert($("#abox li").length);
				for (var d = $("#abox li").length; d > 50; d--) {
					//alert(d-1);
					$("#abox li").eq(d-1).remove();
				}
				
			}

		}
		//alert($("#abox li").eq(5).html());
		
	}),
	
	
	socket.on('fdd', function(data){			///친구로부터 받은 글 목록

//var item = $("#abox").find('li:eq(' + index + ')').html();
//$("#view-tagbox").append($(this).closest('.as').find('.ang').text());
//var ID = $(this).attr('alt');
//data.ac
//$("#abox").find("li").css("background-color", "red");
//div:contains("test")
		$('#abox').find('li[alt="' + data.ac + '"]').remove();

		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		//var alitem = '<li class="as" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann"><font color = "#0000FF"><strong>' + data.au + '</strong></font></div></div><div class = "ant"><font size = "5px" color = "#0000FF">' + $("#faketitleget").html() + '</font></div><div class = "ang"><font size = "3px">' + ag + '</font></div></li>';
		var alitem = '<li class="as" style="background: repeating-linear-gradient(135deg,  #F3FCFF,  #F3FCFF 10px,  #D7F5FF 2px, #D7F5FF 12px);" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';		
		//background-color:#ffdd99;
		$(alitem).prependTo('#abox').hide().slideDown();
		
		
		if ($(document).height() > $(window).height() && $(document).height() - $(window).height() - $(window).scrollTop() < 1000) {

		} else {

			if ($("#abox li").length > 30) {
				//alert($("#abox li").length);
				for (var d = $("#abox li").length; d > 30; d--) {
					//alert(d-1);
					$("#abox li").eq(d-1).remove();
				}
			}

		}

	}),
	

	socket.on('mdd', function(data){			///5개 추가
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		//alert(ag);
		/*
		if (data.au) {
			var alitem = '<li class="as" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann"><strong>' + data.au + '</strong></div></div><div class = "ant"><font size = "5px" color = "#FF0000">' + $("#faketitleget").html() + '</font></div><div class = "ang"><font size = "3px">' + ag + '</font></div></li>';	
		} else {
			var alitem = '<li class="as" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann"><strong>' + "비회원" + '</strong></div></div><div class = "ant"><font size = "5px" color = "#000000">' + $("#faketitleget").html() + '</font></div><div class = "ang"><font size = "3px">' + ag + '</font></div></li>';		
		}*/
		
		if (data.au) {
			var alitem = '<li class="as" style="background-color:#D7F5FF;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		} else {
			var alitem = '<li class="as" style="background-color:#F3FCFF;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "비회원" + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';		
		}
		
		$(alitem).appendTo('#abox').hide().slideDown();
		//window.scrollTo(0,document.body.scrollHeight);
	}),
	
		
	socket.on('topadd', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');

		
		if (data.au) {
			//var alitem = '<li class="as" style="background-color:#e6f9ff;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann"><strong>' + data.au + '</strong></div></div><div class = "ant"><font size = "5px" color = "#000000">' + $("#faketitleget").html() + '</font></div><div class = "ang"><font size = "3px">' + ag + '</font></div></li>';
			var alitem = '<li class="as" style="background-color:#D7F5FF;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
	
		} else {
			//var alitem = '<li class="as" style="background-color:#ffdd99;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann"><strong>' + "비회원" + '</strong></div></div><div class = "ant"><font size = "5px" color = "#8A8A8A">' + $("#faketitleget").html() + '</font></div><div class = "ang"><font size = "3px">' + ag + '</font></div></li>';		
			var alitem = '<li class="as" style="background-color:#F3FCFF;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "비회원" + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';		
		}		
		$(alitem).prependTo('#toplist').hide().slideDown();
	}),


	socket.on('myadd', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		var alitem = '<li class="as" style="background-color:#D7F5FF;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		$(alitem).prependTo('#mylist').hide().slideDown();
	}),
	
	socket.on('mymore', function(data){			///5개 추가
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');

		var alitem = '<li class="as" style="background-color:#D7F5FF;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	

		$(alitem).appendTo('#mylist').hide().slideDown();
	}),


	socket.on('here', function (adata) {
		var cookielogin1, cookielogin2;
	
		$("#voteup").remove();
		$("#delarticle").remove();
		
		if (adata.An && adata.Ap) {
			$("#view-p").attr('src', "pics/" + adata.Ap);
			$("#view-n").html(adata.An);
		}
		
		if (document.cookie.indexOf('login=') > -1) {
			cookielogin1 = document.cookie.split('login=');
			cookielogin2 = cookielogin1[1].split(';');
		} else {
			cookielogin2 = [];
		}
		
		
		if (!$("#proname").attr('alt')) {
			if (adata.Ai && cookielogin2[0]) {
				if (adata.Ai == cookielogin2[0]) {
					$("#view-n").attr('alt', '');
					var vb = '<a href="#" id="delarticle" class="ttnbtn" style="width:100%;">삭제</a>';
					$(vb).insertAfter('#tagup');
				} else {
					$("#view-n").attr('alt', adata.Ai);
					var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%;">추천</a>';		
					$(vb).insertAfter('#tagup');
				}
			} else {
				$("#view-n").attr('alt', adata.Ai);
				var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%;">추천</a>';		
				$(vb).insertAfter('#tagup');
			}
		} else {
			if (adata.Ai) {
				if (adata.Ai == $("#proname").attr('alt')) {
					$("#view-n").attr('alt', '');
					var vb = '<a href="#" id="delarticle" class="ttnbtn" style="width:100%;">삭제</a>';		
					$(vb).insertAfter('#tagup');
				} else {
					$("#view-n").attr('alt', adata.Ai);
					var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%;">추천</a>';		
					$(vb).insertAfter('#tagup');
				}
			} else {
				$("#view-n").attr('alt', adata.Ai);
				var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%;">추천</a>';		
				$(vb).insertAfter('#tagup');
			}
		}
		
		
		if (adata.Ac) {
			window.history.pushState('', '', '/' + adata.Ac);
			var am = adata.Am;	//내용
			var ad = adata.Ad;	//작성시간
			var au = adata.Au;	//추천수
			var ah = adata.Ah;	//조회수
			var ac = adata.Ac;
			
			var ag = adata.Ag.replace(',한글,', ',').slice(1,-1);
			ag = replaceAll(ag, ',', ',');
			
			$("#view-tagbox").append(ag);
	
			var at = adata.At;	//제목
			$("#faketitleget").html(at);		
			$("#view").dialog('option', 'title', $("#faketitleget").html());
			$("#ananan").html(ac);
	
			$("#hits").html(ah);
			$("#tagup").html(au);
			$("#ttt").html(howlong(ad));
	

			am = replaceAll(am, '&lt;br&gt;', '<br>');
			am = replaceAll(am, '&lt;BR&gt;', '<BR>');
			am = replaceAll(am, '&lt;p&gt;', '<p>');
			am = replaceAll(am, '&lt;P&gt;', '<P>');
			
	
			var aaa = am.split('[pics/apics/');
			
			
	
			if (aaa.length === 1) {	//no pics
				$("#aview").html(aaa[0]);
			} else {				//pics
				for (var tt=1; tt < aaa.length; tt++) {
					//alert(aaa[tt]);//.split(']');
					var aab = aaa[tt].split(']');
					var aac = '<img class="viewpics" src="pics/apics/' + aab[0] + '">' + aab[1];
					aaa[0] += aac;
					if (tt === aaa.length - 1) {
						$("#aview").html(aaa[0]);
					}
				}
			}
			
			
			
		} else {	//삭제된 글

			$("#faketitleget").html('해당 글을 찾을 수 없습니다.');
			$("#view").dialog('option', 'title', $("#faketitleget").html());
			$("#aview").html('');
			$("#voteup").remove();
			$("#delarticle").remove();

		}


	}),
	
	
	socket.on('hits', function(ko){
		$('#hits').html(ko);
	}),
	
	socket.on('ups', function(upu){
		$('#tagup').html(upu);
	}),
	
	
	socket.on('hco', function(hco){
		
		$('#view-cbox').empty();
		var com = hco.slice(1);
		var coms = com.split('>');
		for (var m in coms) {
			if (coms[m].indexOf(':') > -1) {
				var cs = coms[m].split(':'); //0번호 1내용 2사진 3닉네임 4아이디 현재 글의 번호를 저장할 필요는 없다.
				if (cs[2] && cs[3] && cs[4]) {
					var vcs = '<li class="vc" cid = "' + cs[0] + '" alt ="' + cs[4] + '"><img class = "vcp" src="pics/' + cs[2] + '"/><div class = "vcm">' + cs[1] + '<div class = "vcn">' + cs[3] + '</div></div></li>';	
				} else {
					var vcs = '<li class="vc" cid = "' + cs[0] + '"><img class = "vcp" src="pics/default.png"/><div class = "vcm">' + cs[1] + '<div class = "vcn">비회원</div></div></li>';	
				}
				$(vcs).prependTo('#view-cbox').hide().slideDown();
			}
		}
				
	}),
	
	
	socket.on('nco', function(nco){
		
		var cs = nco.slice(1).split(':');
		
		if (cs[2] && cs[3] && cs[4]) {
			var vcs = '<li class="vc" cid = "' + cs[0] + '" alt ="' + cs[4] + '"><img class = "vcp" src="pics/' + cs[2] + '"/><div class = "vcm">' + cs[1] + '<div class = "vcn">' + cs[3] + '</div></div></li>';	
		} else {
			var vcs = '<li class="vc" cid = "' + cs[0] + '"><img class = "vcp" src="pics/default.png"/><div class = "vcm">' + cs[1] + '<div class = "vcn">비회원</div></div></li>';	
		}
		
		$(vcs).prependTo('#view-cbox').hide().slideDown();

		
	}),
	
	
	socket.on('up', function(fn){ //사진의 alt값 수정
				
		var f1 = fn.split('a');
		var f2 = f1[1].split('.');
		//'pics/apics' + fn
		//alert($("#fakebox").find('li:eq(' + f2[0] + ')').html());
		var qq = $("#fakebox").find('li:eq(' + f2[0] + ')').html();
		var pp = qq.replace('alt="' + f2[0] + '"', 'alt="pics/apics/' + fn + '"');
				
		$("#fakebox").find('li:eq(' + f2[0] + ')').html(pp);
		

		var item = $("#fakebox").find('li:eq(' + f2[0] + ')').html();
		document.getElementById('amain').focus();
		pasteHtmlAtCaret(item);	//br 넣을 수도 있음

		//alert($("#fakebox").html());
				
		//var picnums = picnumf[1].split('"');
		//alert(picnums)
		//var picdata = item.split('src="');
		//picdata[1] = picdata[1].slice(0, -2);
		//alert(picdata[1]);
				
		//var picnum = item.split(
			
		//socket.emit('pick', picdata[1]);
		
		//alert(picdata[1]);
	}),
	
	
	socket.on('yourfr', function(fr){
		//친구 신청을. 더 등록할 수 없으면.
		if (fr.frl) {
			if (fr.frl.length > 1) {
				$("#frlist").empty();	
				var frl = fr.frl.slice(1, -1).split(',');
				for (var f in frl) {
					var frli = '<li class="ui-widget-content">' + frl[f] + '</li>';
					$(frli).appendTo('#frlist');
				}
			} else {
				$("#frlist").empty();
				$("#frlist").append('등록된 친구가 없습니다.');
			}
		}
		
		if (fr.frr) {
			if (fr.frr.length > 1) {
				$("#reqlist").empty();			
				var frr = fr.frr.slice(1, -1).split(',');
				for (var r in frr) {
					var rqli = '<li class="ui-widget-content">' + frr[r] + '</li>';
					$(rqli).appendTo('#reqlist');
				}
			} else {
				$("#reqlist").empty();
				$("#reqlist").append('받은 친구 요청이 없습니다.');
			}
		}
	}),
	
	
	
	
	socket.on('yournote', function(un){
		if (un && un.length > 1) {
			$("#notelist").empty();
			var unl = un.slice(1).split('>');
			for (var u in unl) {
				var unn = unl[u].split(':');
				var una = unn[1].split('<');
				if (unn[0] == 'noname') {
					var unli = '<li alt = "' + una[1] +'"><font size = "5px">비회원: </font>' + una[0] + '</li>';
				} else {
					var unli = '<li alt = "' + una[1] +'"><font size = "5px">' + unn[0] + ': </font>' + una[0] + '</li>';
				}

				$(unli).appendTo('#notelist');
			}
		} else {
			$("#notelist").empty();
			$("#notelist").append('새로운 알림이 없습니다.');
		}
	}),
	
	
	socket.on('yourmsg', function(msg){
		if (msg.length > 1) {
			$("#messagelist").empty();
			var msl = msg.slice(1).split('>');
			for (var m in msl) {
				var msn = msl[m].split('<');
				var msli = '<li alt = "' + m +'"><font size = "5px">' + msn[0] + ':</font>' + msn[1] + '</li>';
				$(msli).appendTo('#messagelist');
			}
		} else {
			$("#messagelist").empty();
			$("#messagelist").append('받은 쪽지가 없습니다.');
		}
	}),
	
	socket.on('yourmsf', function(msf){
		if (msf.length > 1) {
			$("#sfrlist").empty();
			var frt = msf.slice(1, -1).split(',');
			for (var f in frt) {
				var frli = '<li class="ui-widget-content">' + frt[f] + '</li>';
				//var frli = '<li class="ui-widget-content ui-selected">' + frt[f] + '</li>';
				$(frli).appendTo('#sfrlist');
			}
		} else {
			$("#sfrlist").empty();
			$("#sfrlist").append('등록된 친구가 없습니다.');
		}
	}),
	



	
	//$("#reqlist").empty();
	
	
	
	
	socket.on('frnotfound', function(){			
		alert('아이디를 다시 확인해주세요');
		document.getElementById('searchid').focus();
		//$("#srp").attr('src', "pics/nobody.png");
		//$("#srn").html('');
	}),
	
	socket.on('frfound', function(fr){	
		$("#srp").attr('src', "pics/" + fr.fp);
		$("#srn").attr('alt', $("#searchid").val());
		$("#srn").html(fr.fn);
	}),
	
	socket.on('fralready', function(){
		alert('이미 친구로 등록된 회원입니다.');	
	}),
	
	socket.on('requested', function(){
		alert('친구 요청을 보냈습니다.');	
	}),
	
	socket.on('reqalready', function(){
		alert('이미 신청한 회원입니다');	
	});
	
	socket.on('rfail', function(){
		alert('상대방의 친구 대기함이 가득 차 요청할 수 없습니다.');		
	}),
	
	socket.on('noone', function(){
		alert('해당 회원을 찾을 수 없습니다.');
	}),
	
	socket.on('disconnect', function() {
		window.location = '/';
	});
	
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

	
	
	
	//$('#rightbox').addClass('fixed');
	
(function($) {
	var element = $('#rightbox'),
		originalY = element.offset().top;
    
	// Space between element and top of screen (when scrolling)
	var topMargin = 20;
    
	// Should probably be set in CSS; but here just for emphasis
	element.css('position', 'relative');
    
	$(window).on('scroll', function(event) {
		var scrollTop = $(window).scrollTop();
        
		element.stop(false, false).animate({
			top: scrollTop < originalY
				? 0
				: scrollTop - originalY + topMargin
		}, 300);
	});
})(jQuery);

	
	
	

	
	
	




	
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡhttp://jsfiddle.net/marinagon/1v63t05q/ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	function insertTextAtCursor(text) {
		var sel, range, html;
		if (window.getSelection) {
			sel = window.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				range = sel.getRangeAt(0);
				range.deleteContents();
				range.insertNode(document.createTextNode(text));
			}
		} else if (document.selection && document.selection.createRange) {
			document.selection.createRange().text = text;
		}
	}
	
	
	document.querySelector("#amain").addEventListener("paste", function(e) {
		e.preventDefault();
		if (e.clipboardData && e.clipboardData.getData) {
			var text = e.clipboardData.getData("text/plain");
			document.execCommand("insertHTML", false, text);
		} else if (window.clipboardData && window.clipboardData.getData) {
			var text = window.clipboardData.getData("Text");
			insertTextAtCursor(text);
		}
	});
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ5MOREㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	$("#5more").click(function() {

		var cookietag1 = document.cookie.split('tags=');
		var cookietag2 = cookietag1[1].split(';');
		//alert(cookietag[1]);
		//alert($("#abox li").length);
		socket.emit('5more', {
			num: $("#abox li").length,
			tag: cookietag2[0].slice(1,-1)
		});
		
		/*
		setTimeout( function() {
			$('html, body').animate({
				scrollTop: $(document).height()
			});
		}, 500);*/
		//alert($("#abox li").length);

//$("#abox li").eq(0).css( "background-color", "red" );
//$("#abox").find("[alt='" + id + "']").hide('slow', function(){ $("#abox").find("[alt='" + id + "']").remove(); });
//alert($("#abox li").eq(5).html());

//$(window).scrollTop() + $(window).height() == $(document).height() && $(document).height() > $(window).height();
//window.scrollTo(0,document.body.scrollHeight);

		return false;

	});

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ태그 수정 작업 merge 등. abox 비워줘야된다.ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
//abox .as 흘려보낼 처리 하자. 스크롤 맨 아래 고정? 맨 위만 흘림? 고민하자.

	$("#newtag").keydown(function (k) {	//window.unload event를 잡기 어렵다 지금.
		
		
		if (tagkey[k.keyCode]) {
			k.preventDefault();			
						
			var vava = $("#newtag").val();
			vava = vava.replace(/ /g,'');
			vava = replaceAll(vava, '>', '');
			vava = replaceAll(vava, '<', '');
			vava = replaceAll(vava, ';', '');
			vava = replaceAll(vava, '.', '');
			vava = replaceAll(vava, ',', '');
			vava = replaceAll(vava, '+', '');
			vava = vava.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '');
			$("#newtag").val(vava);
			
			/*
			while ($("#realwritetag").val().indexOf(',,') > -1) {
				$("#realwritetag").val($("#realwritetag").val().replace(/,,/g, ','));
			}*///이 코드 참고.
			
			
			if (vava.length > 0) {
				var cookietag1 = document.cookie.split('tags=');
				var cookietag2 = cookietag1[1].split(';');
				var mytags = cookietag2[0].slice(1,-1).split(',');
					
				if (isInArray(vava, mytags) === true) {
					alert('이미 등록한 태그입니다.');
					$("#atag").val(vava);
				} else {
					$("#abox").empty();
					var tli =  '<li>' + vava + '</li>';
					$("#taglist").append(tli);
					
					var ntl = ',';
					$("#taglist li").each(function(){
						ntl = ntl + $(this).text() + ',';
					});
					
					document.cookie = "tags=" + ntl + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
					
					socket.emit('me10', ntl.slice(1,-1));
					socket.emit('tagedit', ntl.slice(1,-1));
					$("#newtag").val('');
				}
			} else {
				alert('태그를 입력해주세요');
				$("#newtag").val('');
				document.getElementById('newtag').focus();
			}
		}
	});
	
	$("#ntb").click(function(){	//위랑 같은 기능
		
		var vava = $("#newtag").val();
		vava = vava.replace(/ /g,'');
		vava = replaceAll(vava, '>', '');
		vava = replaceAll(vava, '<', '');
		vava = replaceAll(vava, ';', '');
		vava = replaceAll(vava, '.', '');
		vava = replaceAll(vava, ',', '');
		vava = replaceAll(vava, '+', '');
		vava = vava.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '');
			
		$("#newtag").val(vava);
			
		/*
		while ($("#realwritetag").val().indexOf(',,') > -1) {
			$("#realwritetag").val($("#realwritetag").val().replace(/,,/g, ','));
		}*///이 코드 참고.
			
			
		if (vava.length > 0) {
			var cookietag1 = document.cookie.split('tags=');
			var cookietag2 = cookietag1[1].split(';');
			var mytags = cookietag2[0].slice(1,-1).split(',');
				
			if (isInArray(vava, mytags) === true) {
				alert('이미 등록한 태그입니다.');
				$("#atag").val(vava);
			} else {
				$("#abox").empty();
				var tli =  '<li>' + vava + '</li>';
				$("#taglist").append(tli);
				
				var ntl = ',';
				$("#taglist li").each(function(){
					ntl = ntl + $(this).text() + ',';
				});
				
				document.cookie = "tags=" + ntl + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
				
				socket.emit('me10', ntl.slice(1,-1));
				socket.emit('tagedit', ntl.slice(1,-1));
				$("#newtag").val('');
			}
		} else {
			$("#newtag").val('');
			alert('태그를 입력해주세요');
			document.getElementById('newtag').focus();
		}
	
		
		return false;
	});
	


	$('#merge').click(function(){	//여기서도 중복 생각.
		if ($("#taglist .ui-selected").length > 1) {
			$("#abox").empty();
			
			var cookietag1 = document.cookie.split('tags=');
			var cookietag2 = cookietag1[1].split(';');
			var mytags = cookietag2[0].slice(1,-1).split(',');
			var merging = '';
			
			$('#taglist .ui-selected').each(function(){
				if (merging) {
					merging = merging + '+' + $(this).text();
				} else {
					merging = $(this).text();
				}
			});
						
			if (isInArray(merging, mytags) === true) {//지금 이대로는 순서 뒤바뀔 때 체크가 불가능하다. 예) a+b랑 b+a가 다르다.
				alert('이미 등록한 태그입니다.');
			} else {
				$('#taglist .ui-selected').each(function(){
					$(this).remove();
				});		
				var tli =  '<li>' + merging + '</li>';
				$("#taglist").append(tli);
				var ntl = ',';
				$('#taglist li').each(function(){
					ntl = ntl + $(this).text() + ',';
				});
				
				document.cookie = "tags=" + ntl + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
				socket.emit('me10', ntl.slice(1,-1));
				socket.emit('tagedit', ntl.slice(1,-1));
				
			}

		} else {
			alert('합성할 태그를 2개 이상 선택해주세요');
		}
		return false;
	});
	
	$('#erase').click(function(){
		if ($("#taglist .ui-selected").length > 0) {
			$("#abox").empty();
			
			$('#taglist .ui-selected').each(function(){
				$(this).remove();
			});
			
			var ntl = ',';
			$('#taglist li').each(function(){
				ntl = ntl + $(this).text() + ',';
			});
			
			if (ntl.length <= 2) {
				ntl = ',한글,';
				//var tli =  '<li>한글</li>';
				//$("#taglist").append(tli);
			}
			
			
			document.cookie = "tags=" + ntl + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
			socket.emit('me10', ntl.slice(1,-1));
			socket.emit('tagedit', ntl.slice(1,-1));
			//alert($("#taglist li").length);
		} else {
			alert('삭제할 태그를 선택해주세요');
		}
		
		return false;
		
	});





/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ사진 업로드ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/		
	$('#pupload').on("change", function(event) {
		var files = event.target.files; //FileList object
		var output = document.getElementById("write-picbox");
		if (files.length > 5) {
			alert ('한 번에 최대 5개만 선택 가능합니다');
		} else {
			for (var i = 0; i<files.length; i++) {
				var file = files[i];
				if (file.size < 5242880) {
					var picReader = new FileReader();
					picReader.onload = function (up) {
						var picFile = up.target;
						//var picName = file.name;
						//alert(picName);
						var lis = document.getElementById("fakebox").getElementsByTagName("li");
						var picnum = lis.length;
						
						//alert(picnum);
	
						var div = document.createElement("li");
						var pic = document.createElement("li");
						div.innerHTML = "<img class='write-pics' src='" + picFile.result + "'/>";
						pic.innerHTML = "<img class='fakepics' alt='" + picnum + "' src='" + picFile.result + "'/>";
						output.insertBefore(div,null);
						$("#fakebox").append(pic);
						
						document.getElementById("write-picbox").scrollTop = document.getElementById("write-picbox").scrollHeight;
						
						socket.emit('uppic', {
							num: picnum.toString(),	//이게 클라 정상 확인 처리 신호
							file: picFile.result
						});
						

					};
					picReader.readAsDataURL(file);
				}else{
					alert("5MB 이상의 파일은 등록할 수 없습니다");
					$(this).val("");
				}
			}
		}
		this.value = null;
	});
			

	$("#write-picbox").on('click', ".write-pics", function () {
		var index = $(this).closest("li").index();
		var item = $("#fakebox").find('li:eq(' + index + ')').html();
		//var item = $(this).html();
		//item = item.slice(5, -5);
		document.getElementById('amain').focus();
		pasteHtmlAtCaret(item);

		return false;
	});



	$("#profileup").click(function() {
		alert('크기 500x500 이하의 이미지를 선택해주세요');
	});


	$("#profileup").on("change", function(event) {
		
		var file = event.target.files[0];
		var img;
		
		if (file) {
			if (file.type.indexOf('png') > -1 || file.type.indexOf('jpg') > -1 || file.type.indexOf('jpeg') > -1) {			
				img = new Image();
				img.onload = function(e) {
					if (this.width > 500 || this.height > 500) {
						alert('최대 500x500 크기의 사진만\n프로필로 설정할 수 있습니다');
					} else {
						if (file.size > 700000) {
							alert('파일의 용량이 너무 커서 등록할 수 없습니다.');
						} else {
							var r = new FileReader();
							r.onload = function (at) {
								var pr = at.target;
								socket.emit('setpr', pr.result);
							};
							r.readAsDataURL(file);
						}
					}
				};
				img.onerror = function() {
					alert('잘못된 형식의 파일입니다');
				};
				img.src = _URL.createObjectURL(file);
			} else {
				alert('잘못된 형식의 파일입니다');
			}
		}
	
		this.value = null;
	});


/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/	
		
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡArticle Send and Dialog Closeㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/			
	function SendArticle(ttl, mn, tg) {
		
		tg = replaceAll(tg, '>', '');
		tg = replaceAll(tg, '<', '');
		tg = replaceAll(tg, ';', '');
		tg = replaceAll(tg, '.', '');
		tg = replaceAll(tg, '+', '');

		//중복쉼표 이미 지움
		
		//ps 삭제
		//타이틀은 미리 정리해서 전달, 내용은 여기서 한다.
		mn = replaceAll(mn, '<', '&lt;');
		mn = replaceAll(mn, '>', '&gt;');
		
		var uca = mn.split('&lt;img class="fakepics" alt="');
		mn = uca[0];
		

		if (uca.length === 1) {	//no pics
			if (mn.length > 8000) {
				alert('내용은 최대 8000글자까지만 작성 가능합니다.');
			} else {
				socket.emit('article', {
					title : ttl,
					main : mn,
					tags : tg
				});
				
				//document.cookie = "lastag=" + $("#realwritetag").val().slice(3) + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
				//$('#write').dialog('close');
			}

		} else {				//pics
			for (x=1; x < uca.length; x++) {
				var ucb = uca[x].split('"');
				var ucc = '[' + ucb[0] + ']' + ucb[3].slice(4);
				mn += ucc;
				if (x === uca.length - 1) {
					if (mn.length > 8000) {
						alert('내용은 최대 8000글자까지만 작성 가능합니다.');
					} else {				
						socket.emit('article', {
							title : ttl,
							main : mn,
							tags : tg
						});
						
						//document.cookie = "lastag=" + $("#realwritetag").val().slice(3) + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
						//$('#write').dialog('close');
					}
				}
			}
		}
		
		
	}






	$("#atitle").keydown(function(e) {
		
		if (e.keyCode === 13 || e.keyCode === 10) {
			e.preventDefault();
			
			var atitle = $("#atitle").val().trim();
			atitle = replaceAll(atitle, '<', '&lt;');
			atitle = replaceAll(atitle, '>', '&gt;');
			$("#faketitlesend").html(atitle.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, ''));
			$("#amain").html($("#amain").html().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, ''));
			$("#realwritetag").html($("#realwritetag").html().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, ''));

			
			if ($("#sending").css('display') === 'none') {
			
				$("#realwritetag").val($("#realwritetag").val().replace(/ /g,''));
		
				while ($("#realwritetag").val().indexOf(',,') > -1) {
					$("#realwritetag").val($("#realwritetag").val().replace(/,,/g, ','));
				}
				
				if ($("#faketitlesend").html().length == 0) {
					alert('제목을 입력해주세요');
					document.getElementById("atitle").focus();
				} else if ($("#faketitlesend").html().length > 100) {
					alert('제목은 최대 100글자까지 입력 가능합니다');
				} else if ($("#amain").html().length == 0) {
					alert('내용을 입력해주세요');
					document.getElementById("amain").focus();
				} else if ($("#realwritetag").val().length > 2000) {
					alert('태그가 너무 많아 등록할 수 없습니다.');
				} else {
					SendArticle($("#faketitlesend").html(),$("#amain").html(),$("#realwritetag").val().slice(1, -1));
					$("#sending").attr('style', "display: block;");
					$("#faketitlesend").html('');
				}
			
			
			}
			

		} else if (e.keyCode === 9) {
			e.preventDefault();
			$("#amain").focus();
		}

	});


	
	$('#asend').click(function(){	//위랑 여기를 sending의 display가 none일 때만 보내도록 해야된다.
	
	
		var atitle = $("#atitle").val().trim();
		atitle = replaceAll(atitle, '<', '&lt;');
		atitle = replaceAll(atitle, '>', '&gt;');

		$("#faketitlesend").html(atitle.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, ''));
		$("#amain").html($("#amain").html().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, ''));
		$("#realwritetag").html($("#realwritetag").html().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, ''));


		if ($("#sending").css('display') === 'none') {
		
			$("#realwritetag").val($("#realwritetag").val().replace(/ /g,''));
	
			while ($("#realwritetag").val().indexOf(',,') > -1) {
				$("#realwritetag").val($("#realwritetag").val().replace(/,,/g, ','));
			}
	
			if ($("#faketitlesend").html().length == 0) {
				alert('제목을 입력해주세요');
				document.getElementById("atitle").focus();
			} else if ($("#faketitlesend").html().length > 100) {
				alert('제목은 최대 100글자까지 입력 가능합니다');
			} else if ($("#amain").html().length == 0) {
				alert('내용을 입력해주세요');
				document.getElementById("amain").focus();
			} else if ($("#realwritetag").val().length > 2000) {
				alert('태그가 너무 많아 등록할 수 없습니다.');
			} else {
				//alert($("#amain").html());
				SendArticle($("#faketitlesend").html(),$("#amain").html(),$("#realwritetag").val().slice(1, -1));
				$("#sending").attr('style', "display: block;");
				$("#faketitlesend").html('');
			}
	
		}

		//var atitle = $("#atitle").val();
		//atitle = replaceAll(atitle, '<', '&lt;');
		//atitle = replaceAll(atitle, '>', '&gt;');
		//$("#faketitlesend").html(atitle);
		//$("#faketitlesend").html()를 보내지 않는다.
		
		

		/*
		$("#atitle").val(replaceAll($("#atitle").val(), '<', '&lt;'));
		$("#atitle").val(replaceAll($("#atitle").val(), '>', '&gt;'));
		$("#faketitlesend").html($("#atitle").val());
		*/
		//var eg = $("#realwritetag").val().slice(1);
		//eg = '#' + replaceAll(eg, ',', ' #');
		//$("#tagsent").val(eg);
		

		//document.cookie = "lastag=" + $("#realwritetag").val().slice(3) + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		
		//$('#write').dialog('close');
		

		//var ttt = document.getElementById("tags_input).getElementsByTagName("tag");
		//alert(ttt.length);
	});
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/		
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ삭제나 추천을 클릭했을 때, 댓글을 달 때ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/	



/*
	$('#profile').click(function(){
		alert('picclicked');
	});
*/

	$("#view-rightbox").on('click', "#delarticle", function () {
		if (confirm("이 글을 삭제하시겠습니까?")) {
			socket.emit('delarticle', $("#ananan").html());
		}
		return false;
	});


	$("#view-rightbox").on('click', "#voteup", function () {
		if ($("#nonbox").css('display') === 'block') {
			alert('로그인 후 추천하실 수 있습니다');
		} else {
			socket.emit('voteup', $("#ananan").html());
		}
		return false;
	});
	
	


	$("#com").keydown(function(e) {

		if (e.keyCode === 13 || e.keyCode === 10) {
			e.preventDefault();
			
			$("#com").val(replaceAll($("#com").val(), '<', '&lt;'));
			$("#com").val(replaceAll($("#com").val(), '>', '&gt;'));
			$("#com").val(replaceAll($("#com").val(), ':', '&#58;'));
			$("#com").val($("#com").val().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '').trim());
			
			if ($("#com").val().length > 0) {
				if ($("#com").val().length > 200) {
					$("#com").val('');
					alert('댓글이 너무 길어 등록에 실패했습니다.');
					return false;
				} else {
					socket.emit('comment', {
						an: $("#ananan").html(),
						cm: $("#com").val().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '')
					});
					$("#com").val('');
				}
			}
			
		}
	});
	
	$('#cup').click(function(){
		$("#com").val(replaceAll($("#com").val(), '<', '&lt;'));
		$("#com").val(replaceAll($("#com").val(), '>', '&gt;'));
		$("#com").val(replaceAll($("#com").val(), ':', '&#58;'));
		$("#com").val($("#com").val().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '').trim());
			
		if ($("#com").val().length > 0) {
			
			if ($("#com").val().length > 200) {
				$("#com").val('');
				alert('댓글이 너무 길어 등록에 실패했습니다.');
				return false;
			} else {
				socket.emit('comment', {
					an: $("#ananan").html(),
					cm: $("#com").val().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '')
				});
				$("#com").val('');
				
			}

		}
		document.getElementById("com").focus();
		return false;
	});
	
	


/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/	
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡSOCKET GETㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/	

	
	$("#abox").on('click', ".as", function () {
	//var index = $(this).closest("li").index();
	//var item = $("#abox").find('li:eq(' + index + ')').html();

		//$('body').css('overflow','hidden');
		$("#view").dialog({
			height: 750,
			width: 700,
			//title: $(this).closest('.as').find('.ant').text(),
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		//$("#view-tagbox").append($(this).closest('.as').find('.ang').text());
		var ID = $(this).attr('alt');
		socket.emit('sendme', ID);
		socket.emit('givemeco', ID);
		//$("#ananan").html(ID);	//article number

/*
alert($(window).height());
alert($(window).scrollTop());
alert($(document).height());
alert($(document).scrollTop());
*/
	//alert($(document).height() - $(document).scrollTop());
	//alert($(window).scrollTop() + $(window).height());
	//alert($(document).height() - $(window).height() - $(window).scrollTop());
		
		return false;
	});


	$("#aview").on('click', ".viewpics", function () {

		var widthRatio = $(window).width() / $(this).width();
		var heightRatio = $(window).height() / $(this).height();
		
		var ratio = widthRatio;

		if (widthRatio * $(this).height() > $(window).height()) {
			ratio = heightRatio;	//세로로 크다
		} else {
			ratio = widthRatio;	//가로로 크다
		}

		$('#Fullscreen img').css('width', $(this).width() * ratio);
		$('#Fullscreen img').css('height', $(this).height() * ratio);
		$('#Fullscreen img').attr('src', $(this).attr('src'));
		
		$('#Fullscreen').fadeIn('fast');
		
	});

    $('#Fullscreen').click(function () {    	
		$(this).fadeOut('fast', function () {
			$('#Fullscreen img').attr('src', '');
		});
    });
	
	//$(this).closest('li').find('.vcn').text()
	$("#view-cbox").on('click', "li", function () {		
		if ($(this).attr("alt") && $("#proname").attr("alt") && $(this).attr("alt") !== $("#proname").attr("alt")) {
			if (confirm("\"" + $(this).closest('li').find('.vcn').text() + "\"에게 친구 요청을 보낼까요?")) {
				socket.emit('reqfriend', $(this).attr("alt"));
			}
		} else if ($(this).attr("alt") && $("#proname").attr("alt") && $(this).attr("alt") == $("#proname").attr("alt")) {
			if (confirm("이 댓글을 삭제하시겠습니까?")) {
				socket.emit('delcomment', {	an: $("#ananan").html(), dc: $(this).attr("cid")});
			}
		}
	});
	

	$("#view-rightbox").on('click', "#view-p", function () {
		if ($("#view-n").attr("alt") && $("#proname").attr("alt") && $("#view-n").attr("alt") !== $("#proname").attr("alt")) {
			if (confirm("\"" + $("#view-n").text() + "\"에게 친구 요청을 보낼까요?")) {
				socket.emit('reqfriend', $("#view-n").attr("alt"));
			}
		}
	});
	
	$("#view-rightbox").on('click', "#view-n", function () {
		if ($("#view-n").attr("alt") && $("#proname").attr("alt") && $("#view-n").attr("alt") !== $("#proname").attr("alt")) {
			if (confirm("\"" + $("#view-n").text() + "\"에게 친구 요청을 보낼까요?")) {
				socket.emit('reqfriend', $("#view-n").attr("alt"));
			}
		}
	});
	
	$("#ananan").click(function () {
		alert('tagtime.net/' + $("#ananan").html()); 
	});
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가입, 로그인, 로그아웃 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//

	$("#signup").click(function() {										///////////가입 전송 버튼
		
		//function check
		//길이 먼저 체크하고 여기로 들어와야된다. upass, passcheck 동일 확인도.
		if ($('#signid').val().length >= 6) {
			if ($('#signname').val().length > 0) {
				if ($('#upass').val() == $('#passcheck').val()) {					
					if ($('#upass').val().length >= 8) {
						
						if ($('#signid').val().match(regid) && $('#signid').val().indexOf(' ') == -1) {
							if ($('#signname').val().indexOf('<') == -1 && $('#signname').val().indexOf('>') == -1 && $('#signname').val() == $('#signname').val().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '')) {				
								if ($('#email').val().match(Em)) {
									socket.emit('signin', {
										uid: $('#signid').val(),
										uname: $('#signname').val(),
										upw: md5($('#upass').val()),
										umail: $('#email').val(),
										uln: 'ko'
									});
										
									$("#loading").attr('style', "display: block;");
										
								} else {
									alert('잘못된 이메일 형식입니다.');
									document.getElementById('email').focus();
								}
			
							} else {
								alert('닉네임에 사용할 수 없는 문자가 포함되어 있습니다.');
								document.getElementById('signname').focus();
							}
						} else {
							alert('아이디는 영문, 숫자와 \_의 조합으로만 등록할 수 있습니다.');
							document.getElementById('signid').focus();
						}
						
					} else {
						alert('비밀번호는 8글자 이상 입력해주세요.');
						document.getElementById('upass').focus();
					}
				} else {
					alert('비밀번호를 다시 확인해주세요');
					document.getElementById('upass').focus();
				}				
			} else {
				alert('닉네임을 입력해주세요');
				document.getElementById('signname').focus();
			}
		} else {
			alert('아이디는 6글자 이상 입력해주세요');
			document.getElementById('signid').focus();
		}


		return false;
	});
	
	
	
	$("#resetpw").click(function() {

		$("#login").dialog('close');
		$("#reset").dialog({
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true,
		});
		return false;
		
	});
	
	
	
	$("#curmail").keydown(function(e) {
		if (e.keyCode === 13 || e.keyCode === 10 ) {
			
			if ($("#curid").val().length > 0 && $("#curmail").val().length > 0) {
				
				if ($("#curmail").val().indexOf('@') == -1) {
					alert('메일 주소를 다시 확인해주세요');
					document.getElementById('curmail').focus();
				} else {
				
					if ($("#resetting").css('display') === 'none') {
						$("#resetting").attr('style', "display: block;");
						
						socket.emit('rsp', {
							id: $("#curid").val(),
							ma: $("#curmail").val(),
							ln: 'ko'
						});
					}
				}
			}
			return false;			
		}
	});
	
	
	$("#pwset").click(function() {
		
		if ($("#curid").val().length > 0 && $("#curmail").val().length > 0) {

			if ($("#curmail").val().indexOf('@') == -1) {
				alert('메일 주소를 다시 확인해주세요');
				document.getElementById('curmail').focus();
			} else {
				
				if ($("#resetting").css('display') === 'none') {
					$("#resetting").attr('style', "display: block;");
					
					socket.emit('rsp', {
						id: $("#curid").val(),
						ma: $("#curmail").val(),
						ln: 'ko'
					});
				}
			}

		}
		return false;

	});
	
	
	$("#logpw").keydown(function(e) {
		if (e.keyCode === 13 || e.keyCode === 10 ) {	//ie11?
			temp = md5($("#logpw").val());
			teid = $("#logid").val();

			socket.emit('login', {
				id: teid,
				pw: md5(ocode2[0] + temp)
			});
			
			$('#login').dialog('close');
			return false;			
		}
	});
	

	$("#logup").click(function() {
		
		temp = md5($("#logpw").val());
		teid = $("#logid").val();
		
		socket.emit('login', {
			id: teid,
			pw: md5(ocode2[0] + temp)
		});
		
		$("#login").dialog('close');
		return false;
		
	});

	$("#logout").click(function() {										///////////로그아웃
		$("#propic").attr('src', 'pics/default.png');
		$("#inbox").attr('style', "display: none;");
		$("#nonbox").attr('style', "display: block;");
		$("#proname").remove();
		//$("#abox").empty();
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		socket.emit('logout');
		//socket.emit('ko10');
		
		var tl = '문의: <a href="mailto:tagtimemaster@gmail.com">tagtimemaster@gmail.com</a> ©tagtime.net';
		document.getElementById("footer").innerHTML = tl;
		return false;
	});
	
	
	
	$("#inbox").on('click', "#proname", function () {	

		
		var sun = prompt("새로운 닉네임을 입력해주세요");
		if (sun != null && sun.length > 0) {
			if (sun !== $("#proname").html()) {
				if (sun.indexOf('<') == -1 && sun.indexOf('>') == -1 && sun == sun.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '')) {
					socket.emit('sun', sun);
				} else {
					alert('닉네임에 사용할 수 없는 문자가 포함되어있습니다.');
				}
			} else {
				alert('현재 닉네임과 다른 닉네임을 입력해주세요.');
			}
		}
		
			
		return false;
	});
	
	
	
	$("#friend").click(function() {
		socket.emit('myfriends');
		$("#friendialog").dialog({
			height: 600,
			width: 600,
			title: "친구 관리",
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		return false;
	});
	
	
	$("#mylistbtn").click(function() {
		$("#mylist").empty();		
		socket.emit('mylist');
		$("#mydialog").dialog({
			height: 630,
			width: 650,
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		return false;
	});
	
	$("#mylist").on('click', ".as", function () {

		$("#view").dialog({
			height: 750,
			width: 700,
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});

		var ID = $(this).attr('alt');
		socket.emit('sendme', ID);
		socket.emit('givemeco', ID);

		return false;
		
	});
	
	$("#mymore").click(function() {
		socket.emit('mymore', $("#mylist li").length);
		return false;
	});
	
	
	$("#note").click(function() {
		//$('body').css('overflow','hidden');
		
		socket.emit('notecall');
		$("#notedialog").dialog({
			height: 600,
			width: 600,
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		return false;
	});
	
	
	
	$("#notelist").on('click', "li", function () {
		//alert($(this).attr('alt'));
		socket.emit('delnote', $(this).attr('alt'));

		//$('body').css('overflow','hidden');
		$("#view").dialog({
			height: 750,
			width: 700,
			//title: $(this).closest('.as').find('.ant').text(),
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		//$("#view-tagbox").append($(this).closest('.as').find('.ang').text());
		var ID = $(this).attr('alt');
		socket.emit('sendme', ID);
		socket.emit('givemeco', ID);
		//$("#ananan").html(ID);	//article number
		return false;

	});
	
	
	
	
	
	$("#message").click(function() {


		socket.emit('msgcall');
		$("#messagedialog").dialog({
			height: 600,
			width: 600,
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		return false;
	});
	
	
	$("#sndmessage").click(function() {
		socket.emit('msgfriend');
		$("#messagesend").dialog({
			height: 500,
			width: 500,
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		return false;
	});
	
	
	$("#repmessage").click(function() {
		//socket.emit('msgfriend');

		var rfrl = ',';
		$('#messagelist .ui-selected').each(function(){
			var rfr = $(this).text().split(':');
			if (rfrl.indexOf(rfr[0]) < 0) {
				rfrl = rfrl + rfr[0] + ',';
			}
		});
		
		if (rfrl.length > 1) {
			var rr = rfrl.slice(1,-1).split(',');
			for (var r in rr) {
				var frli = '<li class="ui-widget-content ui-selected">' + rr[r] + '</li>';
				$(frli).appendTo('#sfrlist');
				
			}
			$("#messagesend").dialog({
				height: 500,
				width: 500,
				position: {
					my: "center",
					at: "center",
					of: window
				},
				modal: true
			});
		} else {
			alert('답장할 쪽지를 선택해주세요');
		}	
		
		

		
		
/*
		if (msf.length > 1) {
			$("#sfrlist").empty();
			var frt = msf.slice(1, -1).split(',');
			for (var f in frt) {
				var frli = '<li class="ui-widget-content">' + frt[f] + '</li>';
				//var frli = '<li class="ui-widget-content ui-selected">' + frt[f] + '</li>';
				$(frli).appendTo('#sfrlist');
			}
		} else {
			$("#sfrlist").empty();
		}
*/
		
		
		return false;
	});
	
	
	
	
	$("#delmessage").click(function() {
		$('#delmsglist').val('');
		
		$('#messagelist .ui-selected').each(function(){
			$('#delmsglist').val($('#delmsglist').val() + $(this).attr('alt') + ',');
		});
		//alert($('#delmsglist').val());		
		socket.emit('delmsg', $('#delmsglist').val());
		return false;
	});
	
	
	
	
	
	$("#msend").click(function() {
		//$('#messagelist li').addClass('ui-selected');
		//addClass('ui-selected')
		$("#sfr").val('');
		
		
		if ($('#sfrlist .ui-selected').length == 0) {
			alert('친구 목록에서 쪽지 수신자를 선택해주세요.');
		} else {			
			$('#sfrlist .ui-selected').each(function(){
				$("#sfr").val($("#sfr").val() + $(this).text() + ',');
			});
			
			$('#mmain').val(replaceAll($('#mmain').val(), '<', '&lt;'));
			$('#mmain').val(replaceAll($('#mmain').val(), '>', '&gt;'));
			
			
			socket.emit('msgsend', {
				to: $("#sfr").val(),
				main: $('#mmain').val()
			});
	
			
			$("#noting").attr('style', "display: block;");

		}

		return false;
	});
	

	/*
			$('#com').val(replaceAll($('#com').val(), '<', '&lt;'));
			$('#com').val(replaceAll($('#com').val(), '>', '&gt;'));
			$('#com').val(replaceAll($('#com').val(), ':', '&#58;'));
	*/
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡTOP10ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	$("#top10").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'today',
			frm: 'ko'
		});
		
		$("#topdialog").dialog({
			height: 600,
			width: 650,
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		return false;
	});
	
	
	$("#todayko").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'today',
			frm: 'ko'
		});
		return false;
	});	
	
	$("#weekko").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'week',
			frm: 'ko'
		});
		return false;
	});
	
	$("#todayworld").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'today',
			frm: 'world'
		});
		return false;
	});
	
	$("#weekworld").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'week',
			frm: 'world'
		});		
		return false;
	});
	
	
	
	
	
	$("#toplist").on('click', ".as", function () {

		//$('body').css('overflow','hidden');
		$("#view").dialog({
			height: 750,
			width: 700,
			//title: $(this).closest('.as').find('.ant').text(),
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		//$("#view-tagbox").append($(this).closest('.as').find('.ang').text());
		var ID = $(this).attr('alt');
		socket.emit('sendme', ID);
		socket.emit('givemeco', ID);
		//$("#ananan").html(ID);
		return false;
		
	});
	
	
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/


	
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡFr, Ui, 친구 관련ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	//$(".abox").dotdotdot();
	$( "#taglist" ).bind("mousedown", function(e) {
		e.metaKey = true;
	}).selectable();
		
	
	$( "#frlist" ).bind("mousedown", function(e) {
		e.metaKey = true;
	}).selectable();
	

	
	$( "#reqlist" ).bind("mousedown", function(e) {
		e.metaKey = true;
	}).selectable();
	
	$( "#sfrlist" ).bind("mousedown", function(e) {
		e.metaKey = true;
	}).selectable();	
	
	$( "#messagelist" ).bind("mousedown", function(e) {
		e.metaKey = true;
	}).selectable();
	
	
	$("#searchid").keydown(function (e) {
		if (e.keyCode === 13 || e.keyCode === 10 ) {
			e.preventDefault();
			if ($("#searchid").val().length > 1) {
				socket.emit('searchfriend', $("#searchid").val());
			}
		}
	});
	
	
	$("#searchfriend").click(function() {
		if ($("#searchid").val().length > 1) {
			socket.emit('searchfriend', $("#searchid").val());
		}
		return false;
	});
		
	$("#reqfriend").click(function() {
		if ($("#srn").html().length > 1) {
			if (confirm("\"" + $("#srn").html() + "\"에게 친구 요청을 보낼까요?")) {
				socket.emit('reqfriend', $("#srn").attr('alt'));
			}
		} else {
			alert('요청할 친구를 검색해주세요.');
			document.getElementById('searchid').focus();
		}
		return false;
	});
	
	
	
	$("#accfriend").click(function() {
		//socket.emit('reqfriend', $("#srn").attr('alt'));
		$("#accfriendlist").val('');
		
		$("#reqlist .ui-selected").each(function(){
			$("#accfriendlist").val($("#accfriendlist").val() + $(this).text() + ',');
		});
		socket.emit('accfriend', $("#accfriendlist").val());
		return false;
	});
	
	$("#denyfriend").click(function() {
		
		$("#denyfriendlist").val('');
		
		$("#reqlist .ui-selected").each(function(){
			$("#denyfriendlist").val($("#denyfriendlist").val() + $(this).text() + ',');
		});
		
		socket.emit('denyfriend', $("#denyfriendlist").val());
		return false;
	});
	

	
	
	
	$("#delfriend").click(function() {
		//alert($( "#frlist option:selected" ).val());
		$("#delfriendlist").val('');
		$('#frlist .ui-selected').each(function(){
			$("#delfriendlist").val($("#delfriendlist").val() + $(this).text() + ',');
		});
		//alert($("#delfriendlist").val());
		socket.emit('delfriend', $("#delfriendlist").val());
		
		/*
		foo[i] = $(selected).text();
		alert(foo[i]);	
		
		for(var x in foo) {
			alert(foo[x]);
		}
		$alert(('#frlist li.selected a').text());
		*/
		return false;
	});
	
	

	
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//



	$("#amain").keydown(function (e) {
		if (e.keyCode === 9) {
			e.preventDefault();

			var editor = document.getElementById("amain");
			var doc = editor.ownerDocument.defaultView;
			var sel = doc.getSelection();
			var range = sel.getRangeAt(0);
	
			var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
			range.insertNode(tabNode);
	
			range.setStartAfter(tabNode);
			range.setEndAfter(tabNode); 
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (e.keyCode === 13 || e.keyCode === 10 ) {
			document.execCommand('insertHTML', false, '<br><br>');
			return false;
		}

		
	});
	
	
	$('#atag').bind("paste",function(e) {
		e.preventDefault();
	});
	
	$("#atag").keydown(function (k) {/////////////////////////////////////////////////////////////////////////////////////
		if (tagkey[k.keyCode]) {
			k.preventDefault();
			
			var vava = $("#atag").val();
			vava = vava.replace(/ /g,'');

			vava = replaceAll(vava, '>', '');
			vava = replaceAll(vava, '<', '');
			vava = replaceAll(vava, ';', '');
			vava = replaceAll(vava, '.', '');
			vava = replaceAll(vava, ',', '');
			vava = replaceAll(vava, '+', '');

			
			if (vava.length > 0) {
			
			
				var realt = $("#realwritetag").val().slice(1).split(',');
					
				if (isInArray(vava, realt) === true) {
					alert('이미 등록한 태그입니다.');
					$("#atag").val(vava);
				} else {
					
					//var tl = document.getElementById("write-taglist").getElementsByTagName("li");
					//var tll = tl.length;
		
					//var tli = document.createElement("li");
					//tli.innerHTML = "<input class='write-tags' alt='" + tll + "' value='" + vava + "'>";
					
					//var tli = '<li alt= "' + tll + '" value="' + vava + '">' + coms[m] + '</li>';
					
					var tli =  '<li>' + vava + '</li>';
					$("#write-taglist").append(tli);
					document.getElementById("write-taglist").scrollTop = document.getElementById("write-taglist").scrollHeight;
				
					
					$("#realwritetag").val($("#realwritetag").val() + vava + ',');
					
					//alert($("#realwritetag").val());
					$("#atag").val('');
				}
			} else {				
				alert('태그를 입력해주세요');
				$("#atag").val('');
				document.getElementById('atag').focus();
			}
			
		}
	});
	
	
	$("#atb").click(function() {
		
		var vava = $("#atag").val();
		vava = vava.replace(/ /g,'');
		vava = replaceAll(vava, '>', '');
		vava = replaceAll(vava, '<', '');
		vava = replaceAll(vava, ';', '');
		vava = replaceAll(vava, '.', '');
		vava = replaceAll(vava, ',', '');
		vava = replaceAll(vava, '+', '');
			
		if (vava.length > 0) {
		
		
			var realt = $("#realwritetag").val().slice(1).split(',');

			if (isInArray(vava, realt) === true) {
				alert('이미 등록한 태그입니다.');
				$("#atag").val(vava);
			} else {
				
				var tli =  '<li>' + vava + '</li>';
				$("#write-taglist").append(tli);
				document.getElementById("write-taglist").scrollTop = document.getElementById("write-taglist").scrollHeight;
				
				
				$("#realwritetag").val($("#realwritetag").val() + vava + ',');

				$("#atag").val('');
			}
		} else {				
			alert('태그를 입력해주세요');
			$("#atag").val('');
			document.getElementById('atag').focus();
		}
		return false;
	});
	
	
	
	$("#write-taglist").on('click', "li", function () {
		var text = $(this).text();
		$(this).remove();
		$("#realwritetag").val($("#realwritetag").val().replace(',' + text + ',', ','));
		
		return false;
	});
	
	
	$("#footer").on('click', "#pwset", function () {
		$("#npwdialog").dialog({
			title: "비밀번호 변경",
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true,
		});
		return false;
	});
	
	
	$("#setpw").click(function() {
		if ($("#cpass").val().length > 0 && $("#npass").val().length > 0) {
			if ($("#npass").val() !== $("#npasscheck").val()) {
				alert('비밀번호를 다시 확인해주세요.');
				document.getElementById('npass').focus();
			} else {
				if ($("#cpass").val() == $("#npass").val()) {
					alert('새 비밀번호가 현재 비밀번호와 같습니다.');
				} else {
					if ($("#npass").val().length >= 8) {
						if ($("#npwing").css('display') === 'none') {
							$("#npwing").attr('style', "display: block;");
								
							socket.emit('spw', {
								cp: md5($("#cpass").val()),
								np: md5($("#npass").val())
							});
							tpw = md5($("#npass").val());
							$("#cpass").val('');
							$("#npass").val('');
							$("#npasscheck").val('');
						}
					} else {
						alert('비밀번호는 8글자 이상 입력해주세요.');
						document.getElementById('npass').focus();
					}
				}
			}
		}
		return false;

	});
	
	
	$('#npasscheck').keydown(function(e) {
		
		if (e.keyCode === 13 || e.keyCode === 10 ) {
			if ($("#cpass").val().length > 0 && $("#npass").val().length > 0) {
				if ($("#npass").val() !== $("#npasscheck").val()) {
					alert('비밀번호를 다시 확인해주세요.');
					document.getElementById('npass').focus();
				} else {
					if ($("#cpass").val() == $("#npass").val()) {
						alert('새 비밀번호가 현재 비밀번호와 같습니다.');
					} else {
						if ($("#npass").val().length >= 8) {
							if ($("#npwing").css('display') === 'none') {
								$("#npwing").attr('style', "display: block;");
									
								socket.emit('spw', {
									cp: md5($("#cpass").val()),
									np: md5($("#npass").val())
								});
								tpw = md5($("#npass").val());
								$("#cpass").val('');
								$("#npass").val('');
								$("#npasscheck").val('');
							}
						} else {
							alert('비밀번호는 8글자 이상 입력해주세요.');
							document.getElementById('npass').focus();
						}
						return false;
					}
				}
			}
		}
		
	});
	
	
	$("#footer").on('click', "#leave", function () {
		$("#leavedialog").dialog({
			title: "정말로 탈퇴하시겠습니까?",
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true,
		});
		return false;
	});
	
	$("#lps").click(function() {
		if ($("#lpass").val().length > 0) {
			if ($("#leaving").css('display') === 'none') {
				var m5lp = md5($("#lpass").val());		
				$("#leaving").attr('style', "display: block;");
				socket.emit('leave', md5(ocode2[0] + m5lp));
				$("#lpass").val('');
			}
		}
		return false;
	});
	
	$('#lpass').keydown(function(e) {
		if ($("#lpass").val().length > 0) {
			if (e.keyCode === 13 || e.keyCode === 10 ) {
				if ($("#leaving").css('display') === 'none') {
					var m5lp = md5($("#lpass").val());		
					$("#leaving").attr('style', "display: block;");
					socket.emit('leave', md5(ocode2[0] + m5lp));
					$("#lpass").val('');
				}
				return false;
			}
		}
	});

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡDialogㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	$("#log_open").click(function() {
		//$("#nonbox").attr('style', "display:none;");
		//$('body').css('overflow','hidden');
		$("#login").dialog({
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true,
		});
		return false;
	});


	$("#sign_open").click(function() {
		//$('body').css('overflow','hidden');
		$("#signin").dialog({
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true,
		});
		//$("#signin").dialog({draggable: false}).parent().draggable();
		return false;
	});
	

	$("#write_open").click(function() {
		var cookielast1 = document.cookie.split('lastag=');
		var cookielast2 = cookielast1[1].split(';');
		
		if (cookielast2[0]) {
			if (cookielast2[0].length > 1) {
				var ctc = cookielast2[0].slice(1, -1).split(',');
			
				for (var c in ctc) {
					var tli =  '<li>' + ctc[c] + '</li>';
					$("#write-taglist").append(tli);
				}
				$("#realwritetag").val(',한글' + cookielast2[0]);
			}
		}
		

		
		//$('body').css('overflow','hidden');
		$("#write").dialog({
			height: 700,
			width: 700,
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true
		});
		document.getElementById('atitle').focus();
		//$("#write").dialog({draggable: false}).parent().draggable();
		//document.body.style.overflow = "hidden";
		return false;
	});
	
	
		
	$("#write").on('dialogclose', function() {
		//$('body').css('overflow','scroll');
		$("#atitle").val('');
		$("#amain").html('');
		$("#atag").val('');				
		$("#write").dialog("destroy");
		$("#write-picbox").empty();
		$("#fakebox").empty();
		$("#pupload").empty();
		$("#write-taglist").empty();
		$("#realwritetag").val(',한글,');
		$("#sending").attr('style', "display: none;");
	
		return false;
		//document.body.style.overflow = "visible";
	});
	
	
	$("#view").on('dialogclose', function() { ///////////////////////////////////////////////////////////////////////////////////
		//$('body').css('overflow','scroll');
		window.history.pushState('', '', '/');
		$("#aview").html('');
		$("#view").dialog("destroy");
		$("#ananan").html('');//articlenumber
		$("#com").val('');
		$("#view-tagbox").empty();
		$("#hits").html('');
		$("#tagup").html('');
		$("#ttt").html('');//timetimetime
		$('#view-cbox').empty();
		socket.emit('IamO');
		
		$("#view-p").attr('src', "pics/default.png");
		$("#view-n").html('비회원');
		$("#view-n").attr('alt', '');
		$("#voteup").remove();
		$("#delarticle").remove();
		
		$('#Fullscreen').hide();
		$('#Fullscreen img').attr('src', '');
		
		return false;
	});
	

	
	$("#login").on('dialogclose', function() {
		//$('body').css('overflow','scroll');
		$("#logid").val('');
		$("#logpw").val('');
		$("#login").dialog("destroy");

	
		return false;
		//document.body.style.overflow = "visible";
	});
	
	
	$("#signin").on('dialogclose', function() {
		//$('body').css('overflow','scroll');
		$("#signid").val('');
		$("#signname").val('');
		$("#upass").val('');
		$("#passcheck").val('');
		$("#email").val('');
		$("#signin").dialog("destroy");
		return false;
		//document.body.style.overflow = "visible";
	});
	
	
	$("#friendialog").on('dialogclose', function() {
		$("#friendialog").dialog("destroy");
		$("#frlist").empty();
		$("#reqlist").empty();
		$("#srp").attr('src', "pics/nobody.png");
		$("#srn").html('');
		$("#srn").attr('alt', "");
		$("#searchid").val('');
		
		$("#delfriendlist").val('');
		$("#denyfriendlist").val('');
		$("#accfriendlist").val('');
		return false;
	});

	$("#topdialog").on('dialogclose', function() {
		$("#topdialog").dialog("destroy");
		$("#toplist").empty();
		return false;
	});


	$("#topdialog").on('dialogclose', function() {
		$("#topdialog").dialog("destroy");
		$("#toplist").empty();
		return false;
	});
	
	
	$("#messagedialog").on('dialogclose', function() {
		$("#messagedialog").dialog("destroy");
		$("#messagelist").empty();

		return false;
	});
	
	$("#messagesend").on('dialogclose', function() {
		$("#messagesend").dialog("destroy");
		$("#sfrlist").empty();
		$("#mmain").val('');
		return false;
	});
	
	
	$("#npwdialog").on('dialogclose', function() {
		$("#npwdialog").dialog("destroy");
		$("#npwing").attr('style', "display: none;");
		$("#cpass").val('');
		$("#npass").val('');
		$("#npasscheck").val('');
		return false;
	});

	$("#leavedialog").on('dialogclose', function() {
		$("#leavedialog").dialog("destroy");
		$("#leaving").attr('style', "display: none;");
		$("#lpass").val('');
		return false;
	});

	$("#reset").on('dialogclose', function() {
		$("#resetting").attr('style', "display: none;");
		$("#curid").val('');
		$("#curmail").val('');
		return false;
	});

		
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

};

