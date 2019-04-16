
var _URL = window.URL || window.webkitURL;
var tagkey = {10: 1, 13: 1, 32: 1, 107: 1, 110: 1, 186: 1, 188: 1, 190: 1};
var keys = {32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1};
var regid = /^[a-zA-Z0-9_]+$/;
var Em = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

var chk;
var mck = 0;
var mpk = 0;
//var nlv;
var tck = 0;
var tpk = 0;
var rfrl;

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
}






window.onload = function(){
	
	
/////////////////////////////////////////////////////처음 접속 처리//////////////////////////////////////////////////////////
	var teid, temp;
	var more = 0;
	
	
	if (navigator.cookieEnabled == false) {
		alert('브라우저 설정에서 쿠키 사용을 허용해주세요');
	}
	
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
	var socket = io.connect(); //소켓서버 연결
	
	/*
	document.cookie = "tags=,한글,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
	socket.emit('IamOnline', {
		tag: '한글',
		oco: ocode2[0]
	});
	socket.emit('me10', '한글');
	*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
				$("#taglist").listview("refresh");
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
	
	//alert(wl);//alert(wl);
	
	if (wl && wl.length > 0) {

		if (Math.round(wl) == wl) {

			//setTimeout( function() {
				
			//$('body').css('overflow','hidden');
			/*
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
			*/
			
			socket.emit('sendme', wl);
			socket.emit('givemeco', wl);
				
			$.mobile.changePage($("#view"), { transition: "pop"});
			//}, 500);
			//

		} else if (wl == 'verified') {
			alert('이메일 인증이 완료되었습니다.');
			window.history.pushState('', '', '/');
		} else if (wl == 'top10') {
			socket.emit('top10', {
				day: 'today',
				frm: 'ko'
			});
			$.mobile.changePage($("#top10"), { transition: "pop"});
			$("#topof").text('오늘의 TOP 10');
			window.history.pushState('', '', '/top10');
		} else if (wl == 'write') {
			
			var cookielast1 = document.cookie.split('lastag=');
			var cookielast2 = cookielast1[1].split(';');
			
			if (cookielast2[0]) {
				if (cookielast2[0].length > 1) {
					var ctc = cookielast2[0].slice(1, -1).split(',');
				
					for (var c in ctc) {
						var tli =  '<li>' + ctc[c] + '</li>';
						$("#write-taglist").append(tli);
					}
					$("#taglist").listview("refresh");
					$("#realwritetag").val(',한글' + cookielast2[0]);
				}
			}
			$.mobile.changePage($("#write"), { transition: "pop"});
			document.getElementById('atitle').focus();
			window.history.pushState('', '', '/write');
		} else {
			window.history.pushState('', '', '/');
		}
	}

	//window.history.pushState('', '', '/');

	$("#logout").hide();
	$("#mypagebtn").hide();
	$("#note").hide();
	$("#message").hide();
	$("#friend").hide();
	


///////////////////////////////////////////소켓 수신 처리//////////////////////////////////////////////////
	
	
	socket.on('add', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		if (data.au) {
			var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		} else {
			var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "비회원" + '</div></div><div class = "ant"><font color = "#777777">' + $("#faketitleget").html() + '</font></div><div class = "ang">' + ag + '</div></li>';		
		}
		$(alitem).prependTo('#abox').hide().slideDown();
		$("#abox").listview("refresh");

		if ($(document).height() > $(window).height() && $(document).height() - $(window).height() - $(window).scrollTop() < 1500) {

		} else {
			if ($("#abox li").length > 40) {
				for (var d = $("#abox li").length; d > 40; d--) {
					$("#abox li").eq(d-1).remove();
				}
			}
		}
	});
	
	socket.on('mdd', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		if (data.au) {
			var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		} else {
			var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "비회원" + '</div></div><div class = "ant"><font color = "#777777">' + $("#faketitleget").html() + '</font></div><div class = "ang">' + ag + '</div></li>';		
		}
		$(alitem).appendTo('#abox').hide().slideDown();
		$("#abox").listview("refresh");
	}),
	
	socket.on('fdd', function(data){
		$('#abox').find('li[alt="' + data.ac + '"]').remove();
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant"><font color = "#163E8F">' + $("#faketitleget").html() + '</font></div><div class = "ang">' + ag + '</div></li>';	
		$(alitem).prependTo('#abox').hide().slideDown();
		$("#abox").listview("refresh");
		
		if ($(document).height() > $(window).height() && $(document).height() - $(window).height() - $(window).scrollTop() < 1500) {

		} else {
			if ($("#abox li").length > 40) {
				for (var d = $("#abox li").length; d > 40; d--) {
					$("#abox li").eq(d-1).remove();
				}
			}
		}

	}),
	
	
	socket.on('topadd', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		
		if (data.au) {
			var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		} else {
			var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "비회원" + '</div></div><div class = "ant"><font color = "#777777">' + $("#faketitleget").html() + '</font></div><div class = "ang">' + ag + '</div></li>';		
		}	
		$(alitem).prependTo('#toplist').hide().slideDown();
	}),
	
	socket.on('myadd', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';
		$(alitem).prependTo('#mylist').hide().slideDown();
	}),
	
	socket.on('mymore', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',한글', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		var alitem = '<li class="as" data-icon="false" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';
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
					var vb = '<a href="#" id="delarticle" class="ttnbtn" style="width:100%; margin-top: 15px; font-size: 70px;">삭제</a>';
					$(vb).insertAfter('#tagup');
				} else {
					$("#view-n").attr('alt', adata.Ai);
					var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%; margin-top: 15px; font-size: 70px;">추천</a>';		
					$(vb).insertAfter('#tagup');
				}
			} else {
				$("#view-n").attr('alt', adata.Ai);
				var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%; margin-top: 15px; font-size: 70px;">추천</a>';		
				$(vb).insertAfter('#tagup');
			}
		} else {
			if (adata.Ai) {
				if (adata.Ai == $("#proname").attr('alt')) {
					$("#view-n").attr('alt', '');
					var vb = '<a href="#" id="delarticle" class="ttnbtn" style="width:100%; margin-top: 15px; font-size: 70px;">삭제</a>';		
					$(vb).insertAfter('#tagup');
				} else {
					$("#view-n").attr('alt', adata.Ai);
					var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%; margin-top: 15px; font-size: 70px;">추천</a>';		
					$(vb).insertAfter('#tagup');
				}
			} else {
				$("#view-n").attr('alt', adata.Ai);
				var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%; margin-top: 15px; font-size: 70px;">추천</a>';		
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
			$("#vtitle").text($("#faketitleget").html());

			$("#hits").html(ah);
			$("#tagup").html(au);
			$("#ttt").html(howlong(ad));
	

			am = replaceAll(am, '&lt;br&gt;', '<br>');
			am = replaceAll(am, '&lt;BR&gt;', '<BR>');
			am = replaceAll(am, '&lt;p&gt;', '<p>');
			am = replaceAll(am, '&lt;P&gt;', '<P>');
			
	
			var aaa = am.split('[pics/apics/');
			
			
	
			if (aaa.length === 1) {
				$("#aview").html(aaa[0]);
			} else {
				for (var tt=1; tt < aaa.length; tt++) {
					var aab = aaa[tt].split(']');
					var aac = '<img class="viewpics" src="pics/apics/' + aab[0] + '">' + aab[1];
					aaa[0] += aac;
					if (tt === aaa.length - 1) {
						$("#aview").html(aaa[0]);
					}
				}
			}
			
		} else {
			window.history.pushState('', '', '/0');

			$("#faketitleget").html('해당 글을 찾을 수 없습니다.');
			$("#vtitle").text($("#faketitleget").html());
			$("#aview").html('');
			
			//$("#voteup").remove();
			//$("#delarticle").remove();

		}

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
	
	socket.on('hits', function(ko){
		$('#hits').html(ko);
	}),
	
	socket.on('ups', function(upu){
		$('#tagup').html(upu);
	}),
	
	
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
		$("#reset").popup('close');
		$("#curid").val('');
		$("#curmail").val('');
	}),
	
	socket.on('rsfl', function(){
		$("#resetting").attr('style', "display: none;");
		alert('정보를 다시 확인해주세요.');
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
		$("#aview").html('');
		$("#vtitle").text('삭제된 글입니다.');
		$("#com").val('');
		$("#com").html('');
			
		$("#view-tagbox").empty();
		$("#hits").html('');
		$("#tagup").html('');
		$("#ttt").html('');
		$("#view-cbox").empty();
		socket.emit('IamO');
			
		$("#view-p").attr('src', "pics/default.png");
		$("#view-n").html('비회원');
		$("#view-n").attr('alt', '');
		$("#abox").find("[alt='" + id + "']").hide('slow', function(){ $("#abox").find("[alt='" + id + "']").remove(); });
		$("#mylist").find("[alt='" + id + "']").hide('slow', function(){ $("#abox").find("[alt='" + id + "']").remove(); });
		
		
 		if (mck == 1) {
			$.mobile.changePage($("#mlpage"));
			mck = 0;
		} else {
			$.mobile.changePage($("#main"));
		}
		
	}),
	
	socket.on('delcom', function(id) {
		$("#view-cbox").find("[cid='" + id + "']").hide('slow', function(){ $("#view-cbox").find("[cid='" + id + "']").remove(); });
	}),
	
	
	
	socket.on('signed', function(){
		$("#loading").attr('style', "display: none;");
		alert('인증 메일이 발송되었습니다.');		
		$("#signin").popup('close');
	}),




	socket.on('logged', function(data) {			//data.nam data.uid data.pic
		$("#login").popup('close');
		$("#logid").val('');
		$("#logpw").val('');
		
		
		$("#log_open").hide();
		$("#sign_open").hide();
		
		$("#logout").show();
		$("#mypagebtn").show();
		$("#note").show();
		$("#message").show();
		$("#friend").show();
		
		

		$("#propic").attr('src', "pics/" + data.pic);
		$("#proname").html(data.nam);
		$("#proname").attr('alt', data.uid);

		
		var cookielogin1 = document.cookie.split('login=');
		var cookielogin2 = cookielogin1[1].split(';');
		
		var cookietemp1 = document.cookie.split('temp=');
		var cookietemp2 = cookietemp1[1].split(';');

		if (teid && temp) {
			document.cookie = "login=" + teid + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
			document.cookie = "temp=" + temp + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		}
		
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
	
	
	/*팝업
	내 글 보기 (버튼, 페이지로 연결 -> 비회원이 페이지 요청하면?(주소로) -> 처리할 필요가 없다. ㅁㄶㄴㅁㅇㄻㄴㅇㄹ요청 -> 메인으로 감)
	프사
	*/
	
	//끝나면 로그인 뒷작업 (댓글 삭제 등, 프로필 로그아웃에서 빼고 등), 서버에서 헤더 체크 후 응답 주는 등 처리.
	//댓글 클릭하면 친추 confirm 띄워주기 등.
	socket.on('prset', function(ufn) {		
		$("#propic").attr('src', "pics/" + ufn);
	}),
	
	
	socket.on('yournote', function(un){
		if (un && un.length > 1) {
			$("#notelist").empty();
			var unl = un.slice(1).split('>');
			for (var u in unl) {
				var unn = unl[u].split(':');
				var una = unn[1].split('<');
				if (unn[0] == 'noname') {
					var unli = '<li alt = "' + una[1] +'"><font size = "10px">비회원: </font>' + una[0] + '</li>';
				} else {
					var unli = '<li alt = "' + una[1] +'"><font size = "10px">' + unn[0] + ': </font>' + una[0] + '</li>';
				}

				$(unli).appendTo('#notelist');
			}
		} else {
			$("#notelist").empty();
			$("#notelist").append('새로운 알림이 없습니다.');
		}
	}),
	
	
	socket.on('yourmsg', function(msg){
		//alert(1);
		if (msg.length > 1) {
			$("#messagelist").empty();
			var msl = msg.slice(1).split('>');
			for (var m in msl) {
				var msn = msl[m].split('<');
				var msli = '<li alt = "' + m +'"><font size = "10px">' + msn[0] + ': </font>' + msn[1] + '</li>';
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
	
	socket.on('msgsuc', function(){
		$("#noting").attr('style', "display: none;");
		$("#messagesend").popup('close');
		$("#sfrlist").empty();
		alert($("#sfr").val().slice(0,-1) + '에게 쪽지를 전송했습니다.');
	}),
	
	socket.on('msgful', function(){
		$("#noting").attr('style', "display: none;");
		$("#messagesend").popup('close');
		$("#sfrlist").empty();
		alert('수신자의 쪽지함이 가득 차 전송에 실패했습니다.');
	}),
	
	
	socket.on('yourfr', function(fr){

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
	
	
	socket.on('up', function(fn){
				
		var f1 = fn.split('a');
		var f2 = f1[1].split('.');

		var qq = $("#fakebox").find('li:eq(' + f2[0] + ')').html();
		var pp = qq.replace('alt="' + f2[0] + '"', 'alt="pics/apics/' + fn + '"');
				
		$("#fakebox").find('li:eq(' + f2[0] + ')').html(pp);
		

		var item = $("#fakebox").find('li:eq(' + f2[0] + ')').html();
		document.getElementById('amain').focus();
		pasteHtmlAtCaret(item);

	}),
	
	
	socket.on('wrote', function(wrote){

		$("#sending").attr('style', "display: none;");
		document.cookie = "lastag=" + $("#realwritetag").val().replace(',한글,', ',') + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";

		$.mobile.changePage($("#view"), { transition: "pop"});
		socket.emit('sendme', wrote);
		$("#ananan").html(wrote);
		return false;

		
	}),
	
	
	
	socket.on('frnotfound', function(){			
		alert('아이디를 다시 확인해주세요');
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
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(window).on("navigate", function (event, data) {
	var direction = data.state.direction;


//	var index = $.mobile.navigate.history.stack.length - 1;
//	alert($.mobile.navigate.history.stack[index].hash );
//	alert($.mobile.activePage.data('url')); pageUrl

	if (direction == 'back') {
		
		//$.mobile.changePage($("#main"));
		//alert($.mobile.activePage.data('url'));
		if ($.mobile.activePage.data('url') == 'view') {
			/*
			tck는
			top -> view로 갈 때 1이 되고
			view -> top로 갈 때 0이 된다.
			
			tpk는
			top이 켜져있으면 1이고
			꺼지면 0이 된다.
			*/
			if (tpk == 1) {
				$.mobile.changePage($("#main"));
				tpk = 0;
			} else if (mpk == 1) {
				$.mobile.changePage($("#main"));
				mpk = 0;
			} else {
				socket.emit('sendme', chk);
				socket.emit('givemeco', chk);
			}
		}
		
		
/*
		if (data.state.hash == '#view') {
			alert('back to the view');
			
			var index = $.mobile.navigate.history.stack.length - 1;
			if ($.mobile.navigate.history.stack[index].hash == '#/') {
				socket.emit('sendme', chk);
				socket.emit('givemeco', chk);
			}
		}
*/

	}
	if (direction == 'forward') {
		event.preventDefault();
	}
});


///////////////////////////////////////////페이지 이동///////////////////////////////////////////////////////

	$(document).on('pagechange', function(e, data){
		//alert(data.prevPage.attr('id'));
		//alert(data.toPage.attr('id'));
		//alert('tpk: ' + tpk + '  tck: ' + tck);
		/*if (data.prevPage.attr('id') == 'main' && data.toPage.attr('id') == 'view') {
			var index = $.mobile.navigate.history.stack.length - 1;
			$.mobile.navigate.history.stack.splice(index, 1);
		} else if (data.prevPage.attr('id') == 'view' && data.toPage.attr('id') == 'main') {
			var index = $.mobile.navigate.history.stack.length - 1;
			alert($.mobile.navigate.history.stack[index].url);
			alert($.mobile.navigate.history.stack[index-1].url);
			alert($.mobile.navigate.history.stack[index+1].url);
			//$.mobile.navigate.history.stack.splice(index, 1);
		} else*/ if (data.prevPage.attr('id') == 'view' && data.toPage.attr('id') == 'view') {
			
			if (tck == 1) { //top에서 왔으면 top으로 돌려보내준다.
				$.mobile.changePage($("#top10"));
				tck = 0;
			} else if (mck == 1) {
				$.mobile.changePage($("#mlpage"));
				mck = 0;
			} else {
				$.mobile.changePage($("#main"));
				/*
				if (nlv == 1) {
					$("#notepopup").popup('open');
					$("#notepopup").css({left: '-35%', top: '-500px'});
				}
				nlv = 0;
				*/
				window.history.pushState('', '', '/');
			}

			$("#aview").html('<img src = "pics/loading.gif" style="width:100%;hegiht:100%;"><div style="height:5000px;"></div>');
			$("#vtitle").text('잠시 기다려주세요');

			$("#com").val('');
			$("#com").html('');
			
			$("#view-tagbox").empty();
			$("#hits").html('0');
			$("#tagup").html('0');
			$("#ttt").html('방금 전');//timetimetime
			$("#view-cbox").empty();
			socket.emit('IamO');
			
			$("#view-p").attr('src', "pics/default.png");
			$("#view-n").html('비회원');
			$("#view-n").attr('alt', '');
			

		} else if (data.prevPage.attr('id') == 'write' && data.toPage.attr('id') == 'write') {
			$.mobile.changePage($("#main"));
			window.history.pushState('', '', '/');
		} else if (data.prevPage.attr('id') == 'top10' && data.toPage.attr('id') == 'top10') {
			$.mobile.changePage($("#main"));
			window.history.pushState('', '', '/');
		} else if (data.prevPage.attr('id') == 'write') {

			$("#atitle").val('');
			$("#amain").html('');
			$("#atag").val('');
			
			$("#write-picbox").empty();
			$("#fakebox").empty();
			$("#pupload").empty();
			$("#write-taglist").empty();
			
			$("#realwritetag").val(',한글,');
			$("#sending").attr('style', "display: none;");

		} else if (data.prevPage.attr('id') == 'top10' && data.toPage.attr('id') == 'main') {
			$("#toplist").empty();
			$("#topof").text('');
			tpk = 0;
		} else if (data.prevPage.attr('id') == 'main' && data.toPage.attr('id') == 'top10') {
			tpk = 1;
		} else if (data.prevPage.attr('id') == 'mlpage' && data.toPage.attr('id') == 'main') {
			mpk = 0;
		} else if (data.prevPage.attr('id') == 'main' && data.toPage.attr('id') == 'mlpage') {
			mpk = 1;
		} else if (data.prevPage.attr('id') == 'mlpage' && data.toPage.attr('id') == 'mlpage') {
			mpk = 0;
			mpk = 0;
			$.mobile.changePage($("#main"));

		}/* else if (data.toPage.attr('id') == 'top10') {
			window.history.pushState('', '', '/top10');
		} else if (data.toPage.attr('id') == 'write') {
			window.history.pushState('', '', '/write');
		}*/

	});
	

	$(document).on('pagebeforeshow', function(e, data){
 		if ($.mobile.activePage.attr('id') == 'write') {
			window.history.pushState('', '', '/write');
		} else if ($.mobile.activePage.attr('id') == 'top10') {
			window.history.pushState('', '', '/top10');
		} else if ($.mobile.activePage.attr('id') == 'mlpage') {
			window.history.pushState('', '', '/mypage');
		}
	});

	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////버그 없이 완성했다. more 불러오기/////////////////////////////////////////
	$('body').on({
		'touchmove': function(e) { 
			if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
				if (more == 0) {
					var cookietag1 = document.cookie.split('tags=');
					var cookietag2 = cookietag1[1].split(';');

					more = 1;
					
					socket.emit('5more', {
						num: $("#abox li").length,
						tag: cookietag2[0].slice(1,-1)
					});
				}
			} else {
				more = 0;
			}
		}
	});
	
	window.addEventListener('scroll', function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
			if (more == 0) {
				var cookietag1 = document.cookie.split('tags=');
				var cookietag2 = cookietag1[1].split(';');

				more = 1;
				
				socket.emit('5more', {
					num: $("#abox li").length,
					tag: cookietag2[0].slice(1,-1)
				});
			}
		} else {
			more = 0;
		}
	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////메뉴 관련//////////////////////////////////////////////////////

	$("#log_open").click(function() {
		$("#login").popup('open');
	});
	
	
	
	$("#logpw").keydown(function(e) {
		if (e.keyCode === 13 || e.keyCode === 10 ) {	//ie11?
			temp = md5($("#logpw").val());
			teid = $("#logid").val();

			socket.emit('login', {
				id: teid,
				pw: md5(ocode2[0] + temp)
			});
			
			$("#login").popup('close');
			$("#logid").val('');
			$("#logpw").val('');
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
		

		return false;
		
	});
	
	
	
	
	$("#log_close").click(function() {
		$("#logid").val('');
		$("#logpw").val('');
	});
	


	$("#resetpw").click(function() {

		$("#login").popup('close');
		$("#logid").val('');
		$("#logpw").val('');
		$("#reset").popup('open');
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
	
	$("#pw_close").click(function() {
		$("#curid").val('');
		$("#curmail").val('');
	});
	

		

	//로그인/로그아웃에서 프로필 사진, 닉네임 등도 처리해야된다.
	
	$("#logout").click(function() {
		
		$("#logout").hide();
		$("#mypagebtn").hide();
		$("#note").hide();
		$("#message").hide();
		$("#friend").hide();
		
		$("#log_open").show();
		$("#sign_open").show();
		
		$("#proname").html('');
		$("#proname").attr('alt', '');
		$("#propic").attr('src', 'pics/default.png');

		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		socket.emit('logout');
		
		return false;
	});
	
	
	
	$("#sign_open").click(function() {
		$("#signid").val('');
		$("#signname").val('');
		$("#upass").val('');
		$("#passcheck").val('');
		$("#email").val('');
		$("#signin").popup('open');
	});
	
	$("#signup").click(function() {										///////////가입 전송 버튼
		
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

	});
	

	
	$("#mypagebtn").click(function() {
		$("#mypage").popup('open');
	});
	
	
	$("#mylistbtn").click(function() {
		$("#mylist").empty();		
		socket.emit('mylist');
		$.mobile.changePage($("#mlpage"), { transition: "pop"});
		mpk = 1;
	});

	
	$("#mylist").on('click', ".as", function () {
		var ID = $(this).attr('alt');
		socket.emit('sendme', ID);
		socket.emit('givemeco', ID);
		chk = ID;
		$.mobile.changePage($("#view"), { transition: "pop"});
		mck = 1;
	});
	
	$("#mymore").click(function() {
		socket.emit('mymore', $("#mylist li").length);
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
	
	
	
	$("#pnset").click(function() {
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
	});


	$("#npw_open").click(function() {
		$("#mypage").popup('close');
		$("#cpass").val('');
		$("#npass").val('');
		$("#npasscheck").val('');
		$("#npwpopup").popup('open');
		
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


	$("#leave").click(function() {
		$("#mypage").popup('close');
		$("#lpass").val('');
		$("#leavepopup").popup('open');
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
	});
	
	$('#lpass').keydown(function(e) {
		if ($("#lpass").val().length > 0) {
			if (e.keyCode === 13 || e.keyCode === 10 ) {
				e.preventDefault();
				if ($("#leaving").css('display') === 'none') {
					var m5lp = md5($("#lpass").val());		
					$("#leaving").attr('style', "display: block;");
					socket.emit('leave', md5(ocode2[0] + m5lp));
					$("#lpass").val('');
				}
			}
		}
	});

	
	
	$("#note").click(function() {

		socket.emit('notecall');
		$("#notepopup").popup('open');
	});
	
	
	$("#notelist").on('click', "li", function () {
		
		socket.emit('delnote', $(this).attr('alt'));

		var ID = $(this).attr('alt');
		socket.emit('sendme', ID);
		socket.emit('givemeco', ID);
		chk = ID;
		//nlv = 1;
		
		$.mobile.changePage($("#view"), { transition: "pop"});

	});
	$("#note_close").click(function() {
		$("#notelist").empty();
	});
	
	
	$("#message").click(function() {
		$("#messagepopup").popup('open');
	});
	
	
	
	$("#message_view").click(function() {
		
		$("#messagepopup").popup('close');
		socket.emit('msgcall');
		
		$("#messageview").popup('open');		
		//alert(1);
	});
	
	
	
	
	$("#delmessage").click(function() {
		$('#delmsglist').val('');
		$('#messagelist .ui-selected').each(function(){
			$('#delmsglist').val($('#delmsglist').val() + $(this).attr('alt') + ',');
		});
	
		socket.emit('delmsg', $('#delmsglist').val());
	});
	
	
	
	$("#repmessage").click(function() {

		rfrl = ',';
		$("#sfrlist").empty();
		
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
			$("#messageview").popup('close');
			$("#messagesend").popup('open');
			rfrl = ',';
		} else {
			alert('답장할 쪽지를 선택해주세요');
		}

	});
	
	
	
	$("#mvc").click(function() {
		$("#messagelist").empty();
	});
	
	
	
	
	$("#message_write").click(function() {
		$("#messagepopup").popup('close');
		socket.emit('msgfriend');
		$("#messagesend").popup('open');
	});
	
	$("#msend").click(function() {

		$("#sfr").val('');
		if ($('#sfrlist .ui-selected').length == 0) {
			alert('오른쪽의 친구 목록에서 쪽지 수신자를 선택해주세요.');
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
	
	$("#send_close").click(function() {
		$("#messagesend").popup('close');
		$("#sfrlist").empty();
		$("#noting").attr('style', "display: none;");
	});
	
	
	
	$("#friend").click(function() {
		$("#friendpopup").popup('open');
		$("#frlist").empty();
		$("#reqlist").empty();
		$("#srp").attr('src', "pics/nobody.png");
		$("#srn").html('');
		$("#srn").attr('alt', "");
		$("#searchid").val('');
		$("#delfriendlist").val('');
		$("#denyfriendlist").val('');
		$("#accfriendlist").val('');
		socket.emit('myfriends');
	});

	
	$("#frsrc_view").click(function() {
		$("#friendpopup").popup('close');
		$("#frsrc").popup('open');
	});
	
	$("#searchfriend").click(function() {
		if ($("#searchid").val().length > 1) {
			socket.emit('searchfriend', $("#searchid").val());
		}
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
	});
	
	
	$("#frreq_view").click(function() {
		$("#friendpopup").popup('close');
		$("#frreq").popup('open');
	});
	
	$("#accfriend").click(function() {

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
	
	$("#frlis_view").click(function() {
		$("#friendpopup").popup('close');
		$("#frlis").popup('open');
	});
	
	
	
	$("#delfriend").click(function() {

		$("#delfriendlist").val('');
		$('#frlist .ui-selected').each(function(){
			$("#delfriendlist").val($("#delfriendlist").val() + $(this).text() + ',');
		});

		socket.emit('delfriend', $("#delfriendlist").val());
		

		return false;
	});
	
	
	
	
	$("#set_open").click(function() {
		$("#settings").popup('open');
	});
	
	$("#set_close").click(function() {
		$("#newtag").val('');
	});
	
	
	
	
	
	$("#newtag").keydown(function (k) {
		
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
					$("#taglist").listview("refresh");
					
					var ntl = ',';
					$('#taglist li').each(function(){
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
	
	
	$("#ntb").click(function(){
		
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
				$("#taglist").listview("refresh");

				var ntl = ',';
				$('#taglist li').each(function(){
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
	
	});
	
	
	
	
	$('#merge').click(function(){
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
						
			if (isInArray(merging, mytags) === true) {
				alert('이미 등록한 태그입니다.');
			} else {
				$('#taglist .ui-selected').each(function(){
					$(this).remove();
				});		
				var tli =  '<li>' + merging + '</li>';
				$("#taglist").append(tli);
				$("#taglist").listview("refresh");
				
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
				//$("#taglist").listview("refresh");
			}
			
			document.cookie = "tags=" + ntl + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
			socket.emit('me10', ntl.slice(1,-1));
			socket.emit('tagedit', ntl.slice(1,-1));

		} else {
			alert('삭제할 태그를 선택해주세요');
		}
		
	});

	
	
	
	$("#set_close").click(function() {
		$("#taglist .ui-selected").each(function(){
			$(this).removeClass('ui-selected');
		});
	});
	
	
	
	
	$("#top_open").click(function() {
		$("#top10list").popup('open');
	});
	
	
	$("#todayko").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'today',
			frm: 'ko'
		});
		$.mobile.changePage($("#top10"), { transition: "pop"});
		$("#topof").text('오늘의 TOP 10');
	});
	
	$("#weekko").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'week',
			frm: 'ko'
		});
		$.mobile.changePage($("#top10"), { transition: "pop"});
		$("#topof").text('금주의 TOP 10');
	});
	
	$("#todayworld").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'today',
			frm: 'world'
		});
		$.mobile.changePage($("#top10"), { transition: "pop"});
		$("#topof").text('세계의 오늘');
	});
	
	$("#weekworld").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'week',
			frm: 'world'
		});
		$.mobile.changePage($("#top10"), { transition: "pop"});
		$("#topof").text('세계의 금주');
	});
	
	
	$("#toplist").on('click', ".as", function () {

		var ID = $(this).attr('alt');
		socket.emit('sendme', ID);
		socket.emit('givemeco', ID);
		chk = ID;
		$.mobile.changePage($("#view"), { transition: "pop"});
		tck = 1;

	});


	$("#taglist").on('click', 'li', function (e) {
		if ($(this).hasClass('ui-selected') == 0)
			$(this).addClass('ui-selected');
		else
			$(this).removeClass('ui-selected');
	});
	
	$("#messagelist").on('click', 'li', function (e) {
		if ($(this).hasClass('ui-selected') == 0)
			$(this).addClass('ui-selected');
		else
			$(this).removeClass('ui-selected');
	});
	
	$("#sfrlist").on('click', 'li', function (e) {
		if ($(this).hasClass('ui-selected') == 0)
			$(this).addClass('ui-selected');
		else
			$(this).removeClass('ui-selected');
	});

	$("#reqlist").on('click', 'li', function (e) {
		if ($(this).hasClass('ui-selected') == 0)
			$(this).addClass('ui-selected');
		else
			$(this).removeClass('ui-selected');
	});
	$("#frlist").on('click', 'li', function (e) {
		if ($(this).hasClass('ui-selected') == 0)
			$(this).addClass('ui-selected');
		else
			$(this).removeClass('ui-selected');
	});
	
	
	/*
	$('#taglist').children('li').bind('touchstart', function(e) {
		if ($(this).hasClass('ui-selected') == 0)
			$(this).addClass('ui-selected');
		else
			$(this).removeClass('ui-selected');
	});
	*/
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////글 보기 관련////////////////////////////////////////////////////////////

	$("#abox").on('click', ".as", function () {

		var ID = $(this).attr('alt');
		socket.emit('sendme', ID);
		socket.emit('givemeco', ID);
		chk = ID;

//		chk = $(this).attr('alt');
		
		$.mobile.changePage($("#view"), { transition: "pop"});
		//window.history.pushState('', '', '/');
	});
	
	
	$("#view-cbox").on('click', "li", function () {		
		if ($(this).attr("alt") && $("#proname").attr("alt") && $("#proname").attr("alt").length > 1 && $(this).attr("alt") !== $("#proname").attr("alt")) {
			if (confirm("\"" + $(this).closest('li').find('.vcn').text() + "\"에게 친구 요청을 보낼까요?")) {
				socket.emit('reqfriend', $(this).attr("alt"));
			}
		} else if ($(this).attr("alt") && $("#proname").attr("alt") && $(this).attr("alt") == $("#proname").attr("alt")) {
			if (confirm("이 댓글을 삭제하시겠습니까?")) {
				socket.emit('delcomment', {	an: window.location.href.split('/')[3], dc: $(this).attr("cid")});
			}
		}
	});
	

	$("#view-mbox").on('click', "#view-p", function () {
		if ($("#view-n").attr("alt") && $("#proname").attr("alt") && $("#proname").attr("alt").length > 1 && $("#view-n").attr("alt") !== $("#proname").attr("alt")) {
			if (confirm("\"" + $("#view-n").text() + "\"에게 친구 요청을 보낼까요?")) {
				socket.emit('reqfriend', $("#view-n").attr("alt"));
			}
		}
	});
	
	$("#view-mbox").on('click', "#view-n", function () {
		if ($("#view-n").attr("alt") && $("#proname").attr("alt") && $("#proname").attr("alt").length > 1 && $("#view-n").attr("alt") !== $("#proname").attr("alt")) {
			if (confirm("\"" + $("#view-n").text() + "\"에게 친구 요청을 보낼까요?")) {
				socket.emit('reqfriend', $("#view-n").attr("alt"));
			}
		}
	});
	
	
	$("#view-mbox").on('click', "#delarticle", function () {
		if (confirm("이 글을 삭제하시겠습니까?")) {
			socket.emit('delarticle', window.location.href.split('/')[3]);
		}
	});


	$("#view-mbox").on('click', "#voteup", function () {
		if ($("#proname").attr('alt') && $("#proname").attr('alt').length > 1) {
			socket.emit('voteup', window.location.href.split('/')[3]);
		} else {
			alert('로그인 후 추천하실 수 있습니다');
		}
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
						an: window.location.href.split('/')[3],
						cm: $("#com").val()
					});
					$("#com").val('');
					$("#com").html('');
				}
			}
		}
	});
	
	$('#cup').click(function(){
		$("#com").val(replaceAll($("#com").val(), '<', '&lt;'));
		$("#com").val(replaceAll($("#com").val(), '>', '&gt;'));
		$("#com").val(replaceAll($("#com").val(), ':', '&#58;'));
		$("#com").val($("#com").val().replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '').trim());

		if ($("#com").val().length > 0 || $("#com").html().length > 0) {
			
			if ($("#com").val().length > 200 || $("#com").html().length) {
				$("#com").val('');
				$("#com").html('');
				alert('댓글이 너무 길어 등록에 실패했습니다.');
				return false;
			} else {
				socket.emit('comment', {
					an: window.location.href.split('/')[3],
					cm: $("#com").val()
				});
				$("#com").val('');
				$("#com").html('');
			}

		}
		document.getElementById("com").focus();
		return false;
	});
	
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	
	
	
///////////////////////////////////////로고///////////////////////////////////////////////////////
    
	$("#logo").click(function(){
		window.location = '/';
	});
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	
//////////////////////////////////////////////////글 작성 관련///////////////////////////////////////////////////////////

	$("#write_open").click(function(){
		
		
		var cookielast1 = document.cookie.split('lastag=');
		var cookielast2 = cookielast1[1].split(';');
		
		if (cookielast2[0]) {
			if (cookielast2[0].length > 1) {
				var ctc = cookielast2[0].slice(1, -1).split(',');
			
				for (var c in ctc) {
					var tli =  '<li>' + ctc[c] + '</li>';
					$("#write-taglist").append(tli);
				}
				$("#taglist").listview("refresh");
				$("#realwritetag").val(',한글' + cookielast2[0]);
			}
		}
		
		$.mobile.changePage($("#write"), { transition: "pop"});
		document.getElementById('atitle').focus();
		
		
	});
	
	
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
							num: picnum.toString(),
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
					
					var tli =  '<li>' + vava + '</li>';

					$(tli).appendTo('#write-taglist').hide().animate({width: 'toggle'});
					
					
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

				$(tli).appendTo('#write-taglist').hide().animate({width: 'toggle'});
					
					
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
		
		$(this).animate({width: '0'}, function (){$(this).remove();});
		$("#realwritetag").val($("#realwritetag").val().replace(',' + text + ',', ','));
		
		return false;
	});
	
	
	
	function SendArticle(ttl, mn, tg) {

		tg = replaceAll(tg, '>', '');
		tg = replaceAll(tg, '<', '');
		tg = replaceAll(tg, ';', '');
		tg = replaceAll(tg, '.', '');
		tg = replaceAll(tg, '+', '');

		mn = replaceAll(mn, '<', '&lt;');
		mn = replaceAll(mn, '>', '&gt;');
		
		var uca = mn.split('&lt;img class="fakepics" alt="');
		mn = uca[0];
		
		if (uca.length === 1) {
			if (mn.length > 8000) {
				alert('내용은 최대 8000글자까지만 작성 가능합니다.');
			} else {
				socket.emit('article', {
					title : ttl,
					main : mn,
					tags : tg
				});
				
			}
		} else {
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

					}
				}
			}
		}
	}
	
	
	$('#asend').click(function(){

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

	});
	
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

};




