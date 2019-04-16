
var _URL = window.URL || window.webkitURL;
var tagkey = {10: 1, 13: 1, 32: 1, 107: 1, 110: 1, 186: 1, 188: 1, 190: 1};
var keys = {32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1};

var regid = /^[a-zA-Z0-9_]+$/;
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
		return "just now";
	}
	return (diff < 60 && "just now" || diff < 120 && "1 min ago" || diff < 3600 && Math.floor( diff / 60 ) + " mins ago" || diff < 7200 && "an hour ago" || diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") || days < 7 && days + " days ago" || days < 14 && "a week ago" || days < 31 && Math.ceil( days / 7 ) + " weeks ago" || days < 60 && "a month ago" || days < 365 && Math.ceil( days / 30 ) + " months ago" || days < 730 && "a year ago" || days >= 730 && Math.floor( days / 365 ) + " years ago";
}
	

window.onload = function(){
	
$('.ttnbtn').on('dragstart', false);
document.getElementById('logo').ondragstart = function() { return false; };


	var teid, temp;
	
	if (navigator.cookieEnabled == false) {
		alert('please allow cookies from your browser settings');
	}
	
	if (document.cookie.indexOf('tags=') == -1) {
		document.cookie = "tags=,English,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
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
	var socket = io.connect();
	
	if (document.cookie.indexOf('tags=') > -1) {
		var cookietag1 = document.cookie.split('tags=');
		var cookietag2 = cookietag1[1].split(';');
		cookietag2[0].replace(/ /g,'');
		while (cookietag2[0].indexOf(',,') > -1) {
			cookietag2[0] = cookietag2[0].replace(/,,/g, ',');
		}
				
		cookietag2[0] = replaceAll(cookietag2[0], '>', '');
		cookietag2[0] = replaceAll(cookietag2[0], '<', '');
		cookietag2[0] = replaceAll(cookietag2[0], ';', '');
		cookietag2[0] = replaceAll(cookietag2[0], '.', '');
		if (cookietag2[0].toString().length <= 2) {
			cookietag2[0] = ',English,';
		}
		
		document.cookie = "tags=" + cookietag2[0] + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		
		socket.emit('IamOnline', {
			tag: cookietag2[0].slice(1,-1),
			oco: ocode2[0]
		});
		
		

		socket.emit('me10', cookietag2[0].slice(1,-1));
		
		var mytags = cookietag2[0].replace(',English,', ',').slice(1,-1).split(',');
		if (mytags[0]) {
			for (var t in mytags) {
				var tli =  '<li><lable class="container">' + mytags[t] + '<input type="checkbox" checked="checked"><span class="checkmark"></span></label><div class="clearboth"></div></li>';
				$("#taglist").append(tli);
			}
		}
		
		
		socket.emit('top10', {
			day: 'week',
			frm: 'en'
		});
		
		
	} else {

		document.cookie = "tags=,English,; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		socket.emit('IamOnline', {
			tag: 'English',
			oco: ocode2[0]
		});
		socket.emit('me10', 'English');
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

	if (wl && wl.length > 0) {

		if (Math.round(wl) == wl) {
			
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
			
			socket.emit('sendme', wl);
			socket.emit('givemeco', wl);


		} else if (wl == 'verified') {
			alert('Your account has been verified.');
		}
	}

	window.history.pushState('', '', '/');
	
	
	
	socket.on('toofast', function(){
		$("#sending").attr('style', "display: none;");
		alert('You need at least 5 seconds gap to write a post.');
	}),
	
	socket.on('tfc', function(){
		alert('You need at least 1 second gap to write a comment.');
		document.getElementById("com").focus();	
	}),
	
	socket.on('csucc', function(){
		$("#com").val('');
		document.getElementById("com").focus();	
	}),
	
	socket.on('cfail', function(){
		alert('This post is closed.');
	}),
	

	socket.on('dupid', function(){
		$("#loading").attr('style', "display: none;");
		alert('This ID is already in use.');
		document.getElementById('signid').focus();
	}),
	
	socket.on('dupname', function(){
		$("#loading").attr('style', "display: none;");
		alert('This username is already in use.');
		document.getElementById('signname').focus();
	}),
	
	socket.on('dupnc', function(){
		alert('This username is already in use.');
	}),
	socket.on('gapnc', function(){
		alert('You can set your username at an interval of 24 hours.');
	}),
	socket.on('ncsuc', function(){
		alert('Your username has been changed.');
		window.location = '/';
	}),
	
	socket.on('pwsc', function(){
		$("#npwing").attr('style', "display: none;");
		alert('Your password has been changed.');
		document.cookie = "temp=" + tpw + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		window.location = '/';
	}),
	socket.on('pwfl', function(){
		$("#npwing").attr('style', "display: none;");
		alert('Please check your password again.');
	}),
	
	socket.on('rssc', function(){
		$("#resetting").attr('style', "display: none;");
		alert('New password has been sent to your email.');
		$("#reset").dialog('close');
	}),
	
	socket.on('rsfl', function(){
		$("#resetting").attr('style', "display: none;");
		alert('Please check your email address.');
	}),
	
	socket.on('signed', function(){
		$("#loading").attr('style', "display: none;");
		alert('Verification mail has been sent.');
		$("#signin").dialog('close');
	}),
	
	socket.on('msgsuc', function(){
		$("#noting").attr('style', "display: none;");
		$('#messagesend').dialog('close');
		alert('Message has been sent to ' + $("#sfr").val().slice(0,-1));
	}),
	
	socket.on('msgful', function(){
		$("#noting").attr('style', "display: none;");
		$('#messagesend').dialog('close');
		alert('Failed to send the message. A receiver\'s mailbox is full');
	}),
	
	socket.on('left', function() {
		alert('Your account has been removed.');
		$("#leaving").attr('style', "display: none;");
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		window.location = '/';
	}),
	
	socket.on('lpwrong', function() {
		$("#leaving").attr('style', "display: none;");
		alert('Please check your password again.');
	}),
	
	socket.on('already', function() {
		alert('You have already voted for this.');
	}),
	
	socket.on('vfail', function() {
		alert('This post is unable to vote.');
	}),
		
	socket.on('deleted', function(id) {
		alert('This post has been removed.');
		$("#view").dialog('close');
		$("#abox").find("[alt='" + id + "']").hide('slow', function(){ $("#abox").find("[alt='" + id + "']").remove(); });
	}),
	
	socket.on('delcom', function(id) {
		$("#view-cbox").find("[cid='" + id + "']").hide('slow', function(){ $("#view-cbox").find("[cid='" + id + "']").remove(); });
	}),
	

	socket.on('logged', function(data) {
		$("#nonbox").attr('style', "display: none;");
		$("#inbox").attr('style', "display: block;");
		$("#propic").attr('src', "pics/" + data.pic);

		
		var cookielogin1 = document.cookie.split('login=');
		var cookielogin2 = cookielogin1[1].split(';');
		
		var cookietemp1 = document.cookie.split('temp=');
		var cookietemp2 = cookietemp1[1].split(';');
		

		if (teid && temp) {
			document.cookie = "login=" + teid + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
			document.cookie = "temp=" + temp + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		}
		
		var nam = '<label for = "proname"><div id = "proname" alt ="' + data.uid + '">' + data.nam + '</div></label>';		
		$(nam).insertAfter('#propic');
		
		var tl = 'Contact: <a href="mailto:tagtimemaster@gmail.com">tagtimemaster@gmail.com</a> ©tagtime.net <a href="#" id="pwset" style="margin-left:20px;">change password</a> <a href="#" id="leave" style="float:right; margin-right:10%;">delete account</a>';
		document.getElementById("footer").innerHTML = tl;
	}),
	
	
	socket.on('prset', function(ufn) {		
		$("#propic").attr('src', "pics/" + ufn);
	}),
	
	socket.on('unlogged', function() {
		alert('Please check your ID and PW again.');
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		
	}),
	
	socket.on('unverified', function() {
		alert('You can login after verifying your account.');
		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
	}),


	socket.on('wrote', function(wrote){

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

		$("#sending").attr('style', "display: none;");
		document.cookie = "lastag=" + $("#realwritetag").val().replace(',English,', ',') + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		$('#write').dialog('close');

		socket.emit('sendme', wrote);
		$("#ananan").html(wrote);
		return false;
	}),
	
	
	
	socket.on('newnote', function(){
		$("#note").animate({'color': '#f47c20'}, 1000, function() {
			$('#note').animate({color: 'black'}, 1000);
		});

	}),

	
	socket.on('newmsg', function(){
		$("#message").animate({'color': '#f47c20'}, 1000, function() {
			$('#message').animate({color: 'black'}, 1000);
		});
	}),
	

	
	
	
	socket.on('add', function(data){

		$("#faketitleget").html(data.at);

		var ag = data.ag.replace(',English', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		
		if (data.au) {
			var alitem = '<li class="as" style="background-color:#f2f2f2;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		} else {
			var alitem = '<li class="as" style="background-color:#f2f2f2;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "nonmember" + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';		
		}
		$(alitem).prependTo('#abox').hide().slideDown();

	
		if ($(document).height() > $(window).height() && $(document).height() - $(window).height() - $(window).scrollTop() < 1000) {
		} else {

			if ($("#abox li").length > 50) {
				for (var d = $("#abox li").length; d > 50; d--) {
					$("#abox li").eq(d-1).remove();
				}
			}
		}
	}),
	
	
	socket.on('fdd', function(data){
		
		$('#abox').find('li[alt="' + data.ac + '"]').remove();

		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',English', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		var alitem = '<li class="as" style="background: repeating-linear-gradient(135deg,  #F3FCFF,  #F3FCFF 10px,  #D7F5FF 2px, #D7F5FF 12px);" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';		
		$(alitem).prependTo('#abox').hide().slideDown();
		
		
		if ($(document).height() > $(window).height() && $(document).height() - $(window).height() - $(window).scrollTop() < 1000) {

		} else {

			if ($("#abox li").length > 30) {
				for (var d = $("#abox li").length; d > 30; d--) {
					$("#abox li").eq(d-1).remove();
				}
			}

		}

	}),
	

	socket.on('mdd', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',English', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');

		
		if (data.au) {
			var alitem = '<li class="as" style="background-color:#f2f2f2;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		} else {
			var alitem = '<li class="as" style="background-color:#f2f2f2;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "nonmember" + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';		
		}
		
		$(alitem).appendTo('#abox').hide().slideDown();

	}),
	
		
	socket.on('topadd', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',English', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');

		if (data.au) {
			var alitem = '<li class="as" style="background-color:#f2f2f2;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
	
		} else {
			var alitem = '<li class="as" style="background-color:#f2f2f2;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/default.png"><div class = "ann">' + "nonmember" + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';		
		}		
		$(alitem).prependTo('#tbox').hide().slideDown();
	}),


	socket.on('myadd', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',English', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');
		var alitem = '<li class="as" style="background-color:#f2f2f2;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	
		$(alitem).prependTo('#mylist').hide().slideDown();
	}),
	
	socket.on('mymore', function(data){
		$("#faketitleget").html(data.at);
		var ag = data.ag.replace(',English', ',').slice(1,-1);
		ag = replaceAll(ag, ',', ' #');

		var alitem = '<li class="as" style="background-color:#f2f2f2;" alt="' + data.ac + '"><div class = "anb"><img class = "anp" src="pics/' + data.ap + '"><div class = "ann">' + data.au + '</div></div><div class = "ant">' + $("#faketitleget").html() + '</div><div class = "ang">' + ag + '</div></li>';	

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
					var vb = '<a href="#" id="delarticle" class="ttnbtn" style="width:100%;">delete</a>';
					$(vb).insertAfter('#tagup');
				} else {
					$("#view-n").attr('alt', adata.Ai);
					var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%;">vote</a>';		
					$(vb).insertAfter('#tagup');
				}
			} else {
				$("#view-n").attr('alt', adata.Ai);
				var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%;">vote</a>';		
				$(vb).insertAfter('#tagup');
			}
		} else {
			if (adata.Ai) {
				if (adata.Ai == $("#proname").attr('alt')) {
					$("#view-n").attr('alt', '');
					var vb = '<a href="#" id="delarticle" class="ttnbtn" style="width:100%;">delete</a>';		
					$(vb).insertAfter('#tagup');
				} else {
					$("#view-n").attr('alt', adata.Ai);
					var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%;">vote</a>';		
					$(vb).insertAfter('#tagup');
				}
			} else {
				$("#view-n").attr('alt', adata.Ai);
				var vb = '<a href="#" id="voteup" class="ttnbtn" style="width:100%;">vote</a>';		
				$(vb).insertAfter('#tagup');
			}
		}
		
		
		if (adata.Ac) {
			window.history.pushState('', '', '/' + adata.Ac);
			var am = adata.Am;
			var ad = adata.Ad;
			var au = adata.Au;
			var ah = adata.Ah;
			var ac = adata.Ac;
		
			var ag = adata.Ag.replace(',English,', ',').slice(1,-1);
			ag = replaceAll(ag, ',', ',');
			$("#view-tagbox").append(ag);
	
			var at = adata.At;
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
			
			$("#faketitleget").html('Failed to find the post');		
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
				var cs = coms[m].split(':');
				if (cs[2] && cs[3] && cs[4]) {
					var vcs = '<li class="vc" cid = "' + cs[0] + '" alt ="' + cs[4] + '"><img class = "vcp" src="pics/' + cs[2] + '"/><div class = "vcm">' + cs[1] + '<div class = "vcn">' + cs[3] + '</div></div></li>';	
				} else {
					var vcs = '<li class="vc" cid = "' + cs[0] + '"><img class = "vcp" src="pics/default.png"/><div class = "vcm">' + cs[1] + '<div class = "vcn">nonmember</div></div></li>';	
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
			var vcs = '<li class="vc" cid = "' + cs[0] + '"><img class = "vcp" src="pics/default.png"/><div class = "vcm">' + cs[1] + '<div class = "vcn">nonmember</div></div></li>';	
		}
		
		$(vcs).prependTo('#view-cbox').hide().slideDown();

		
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
				$("#frlist").append('You don\'t have any friend on the list.');
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
				$("#reqlist").append('You didn\'t receive any friend request.');
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
					var unli = '<li alt = "' + una[1] +'"><font size = "5px">nonmember: </font>' + una[0] + '</li>';
				} else {
					var unli = '<li alt = "' + una[1] +'"><font size = "5px">' + unn[0] + ': </font>' + una[0] + '</li>';
				}

				$(unli).appendTo('#notelist');
			}
		} else {
			$("#notelist").empty();
			$("#notelist").append('Your notification box is empty.');
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
			$("#messagelist").append('Your mailbox is empty.');
		}
	}),
	
	socket.on('yourmsf', function(msf){
		if (msf.length > 1) {
			$("#sfrlist").empty();
			var frt = msf.slice(1, -1).split(',');
			for (var f in frt) {
				var frli = '<li class="ui-widget-content">' + frt[f] + '</li>';
				$(frli).appendTo('#sfrlist');
			}
		} else {
			$("#sfrlist").empty();
			$("#sfrlist").append('You don\'t have any friend on the list.');
		}
	}),
		
	
	socket.on('frnotfound', function(){			
		alert('User not found. Please check the ID again.');
		document.getElementById('searchid').focus();
	}),
	
	socket.on('frfound', function(fr){	
		$("#srp").attr('src', "pics/" + fr.fp);
		$("#srn").attr('alt', $("#searchid").val());
		$("#srn").html(fr.fn);
	}),
	
	socket.on('fralready', function(){
		alert('Already on your friend list.');
	}),
	
	socket.on('requested', function(){
		alert('Friend request has been successfully sent.');
	}),
	
	socket.on('reqalready', function(){
		alert('Already sent the friend request.');
	});
	
	socket.on('rfail', function(){
		alert('Failed to send the request. Request box is full.');
	}),
	
	socket.on('noone', function(){
		alert('Cannot find the user.');
	}),
	
	socket.on('disconnect', function() {
		window.location = '/';
	});
	
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

/*
(function($) {
	var element = $('#rightbox'),
		originalY = element.offset().top;

	var topMargin = 20;

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
*/
	
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
	
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ5MOREㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	$("#5more").click(function() {

		var cookietag1 = document.cookie.split('tags=');
		var cookietag2 = cookietag1[1].split(';');

		socket.emit('5more', {
			num: $("#abox li").length,
			tag: cookietag2[0].slice(1,-1)
		});

		return false;

	});

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

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
					alert('This tag is already on the list.');
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
				alert('Please fill in the field.');
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
				alert('This tag is already on the list.');
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
			alert('Please fill in the field.');
			document.getElementById('newtag').focus();
		}
	
		
		return false;
	});
	

/*
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
				alert('This tag is already on the list.');
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
			alert('Please select 2 or more 2 tags to merge.');
		}
		return false;
	});
*/
	$('#merge').click(function(){
		if ($("#taglist :checked").length > 2) {
			alert('yes');
		} else {
			alert('Please select 2 or more tags to merge.');
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
				ntl = ',English,';
				//var tli =  '<li>English</li>';
				//$("#taglist").append(tli);
			}
			
			
			document.cookie = "tags=" + ntl + "; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
			socket.emit('me10', ntl.slice(1,-1));
			socket.emit('tagedit', ntl.slice(1,-1));

		} else {
			alert('Please select tags to delete.');
		}
		
		return false;
		
	});





/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

	$('#pupload').on("change", function(event) {
		var files = event.target.files;
		var output = document.getElementById("write-picbox");
		if (files.length > 5) {
			alert ('Unable to select more than 5 images at once.');
		} else {
			for (var i = 0; i<files.length; i++) {
				var file = files[i];
				if (file.size < 5242880) {
					var picReader = new FileReader();
					picReader.onload = function (up) {
						var picFile = up.target;

						var lis = document.getElementById("fakebox").getElementsByTagName("li");
						var picnum = lis.length;

	
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
					alert("File size cannot exceed 5MB");
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
		alert('Choose an image smaller than 500x500 pixels');
	});


	$("#profileup").on("change", function(event) {
		
		var file = event.target.files[0];
		var img;
		
		if (file) {
			if (file.type.indexOf('png') > -1 || file.type.indexOf('jpg') > -1 || file.type.indexOf('jpeg') > -1) {			
				img = new Image();
				img.onload = function(e) {
					if (this.width > 500 || this.height > 500) {
						alert('This image exceeds the maximum size.');
					} else {
						if (file.size > 700000) {
							alert('File size is too big to be uploaded.');
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
					alert('File type error.');
				};
				img.src = _URL.createObjectURL(file);
			} else {
				alert('File type error.');
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


		mn = replaceAll(mn, '<', '&lt;');
		mn = replaceAll(mn, '>', '&gt;');
		
		var uca = mn.split('&lt;img class="fakepics" alt="');
		mn = uca[0];
		

		if (uca.length === 1) {	//no pics
			if (mn.length > 8000) {
				alert('Main field cannot be longer than 8000 letters.');
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
						alert('Main field cannot be longer than 8000 letters.');
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
					alert('Please fill in the title filed.');
					document.getElementById("atitle").focus();
				} else if ($("#faketitlesend").html().length > 100) {
					alert('Title cannot be longer than 100 letters.');
				} else if ($("#amain").html().length == 0) {
					alert('Please fill in the main field.');
					document.getElementById("amain").focus();
				} else if ($("#realwritetag").val().length > 2000) {
					alert('Too many tags. Tag list needs to be truncated');
				} else {
					SendArticle($("#faketitlesend").html(),$("#amain").html(),$("#realwritetag").val().slice(1, -1));
					$("#sending").attr('style', "display: block;");
					$("#faketitlesend").html('');
				}
			
			
			}
			

		}

	});


	
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
				alert('Please fill in the title filed.');
				document.getElementById("atitle").focus();
			} else if ($("#faketitlesend").html().length > 100) {
				alert('Title cannot be longer than 100 letters.');
			} else if ($("#amain").html().length == 0) {
				alert('Please fill in the main field.');
				document.getElementById("amain").focus();
			} else if ($("#realwritetag").val().length > 2000) {
				alert('Too much tags. Tags need to be truncated');
			} else {
				//alert($("#amain").html());
				SendArticle($("#faketitlesend").html(),$("#amain").html(),$("#realwritetag").val().slice(1, -1));
				$("#sending").attr('style', "display: block;");
				$("#faketitlesend").html('');
			}
	
		}

	});


	$("#view-rightbox").on('click', "#delarticle", function () {
		if (confirm("Do you really want to delete this post?")) {
			socket.emit('delarticle', $("#ananan").html());
		}
		return false;
	});


	$("#view-rightbox").on('click', "#voteup", function () {
		if ($("#nonbox").css('display') === 'block') {
			alert('You need to be logged in to vote.');
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
					alert('Your comment is too long.');
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
				alert('Your comment is too long.');
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
	

	$("#abox").on('click', ".as", function () {

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
		
		{ 
        $('.ui-widget-overlay').bind('click', function()
        { 
            $("#view").dialog('close'); 
        }); 
    }
		
		return false;
	});


	$("#aview").on('click', ".viewpics", function () {

		var widthRatio = $(window).width() / $(this).width();
		var heightRatio = $(window).height() / $(this).height();
		
		var ratio = widthRatio;

		if (widthRatio * $(this).height() > $(window).height()) {
			ratio = heightRatio;
		} else {
			ratio = widthRatio;
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
	
	$("#view-cbox").on('click', "li", function () {		
		if ($(this).attr("alt") && $("#proname").attr("alt") && $(this).attr("alt") !== $("#proname").attr("alt")) {
			if (confirm('Do you want to send a friend request to ' + "\"" + $(this).closest('li').find('.vcn').text() + "\"?")) {
				socket.emit('reqfriend', $(this).attr("alt"));
			}
		} else if ($(this).attr("alt") && $("#proname").attr("alt") && $(this).attr("alt") == $("#proname").attr("alt")) {
			if (confirm("Do you want to delete this comment?")) {
				socket.emit('delcomment', {	an: $("#ananan").html(), dc: $(this).attr("cid")});
			}
		}
	});
	

	$("#view-rightbox").on('click', "#view-p", function () {
		if ($("#view-n").attr("alt") && $("#proname").attr("alt") && $("#view-n").attr("alt") !== $("#proname").attr("alt")) {
			if (confirm('Do you want to send a friend request to ' + "\"" + $("#view-n").text() + "\"?")) {
				socket.emit('reqfriend', $("#view-n").attr("alt"));
			}
		}
	});
	
	$("#view-rightbox").on('click', "#view-n", function () {
		if ($("#view-n").attr("alt") && $("#proname").attr("alt") && $("#view-n").attr("alt") !== $("#proname").attr("alt")) {
			if (confirm('Do you want to send a friend request to ' + "\"" + $("#view-n").text() + "\"?")) {
				socket.emit('reqfriend', $("#view-n").attr("alt"));
			}
		}
	});
	
	$("#ananan").click(function () {
		alert('tagtime.net/' + $("#ananan").html()); 
	});


	$("#signup").click(function() {
		
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
										uln: 'en'
									});
										
									$("#loading").attr('style', "display: block;");
										
								} else {
									alert('Please check your email address.');
									document.getElementById('email').focus();
								}
			
							} else {
								alert('Your username contains invalid characters.');
								document.getElementById('signname').focus();
							}
						} else {
							alert('ID has to be alphanumeric, and only \_ is allowed.');
							document.getElementById('signid').focus();
						}
						
					} else {
						alert('Please make your password 8 letters or longer.');
						document.getElementById('upass').focus();
					}
				} else {
					alert('Please check your password again.');
					document.getElementById('upass').focus();
				}				
			} else {
				alert('Please fill in the username field.');
				document.getElementById('signname').focus();
			}
		} else {
			alert('Please make your ID 6 letters or longer.');
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
					alert('Please check your email address.');
					document.getElementById('curmail').focus();
				} else {
				
					if ($("#resetting").css('display') === 'none') {
						$("#resetting").attr('style', "display: block;");
						
						socket.emit('rsp', {
							id: $("#curid").val(),
							ma: $("#curmail").val(),
							ln: 'en'
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
				alert('Please check your email address.');
				document.getElementById('curmail').focus();
			} else {
				
				if ($("#resetting").css('display') === 'none') {
					$("#resetting").attr('style', "display: block;");
					
					socket.emit('rsp', {
						id: $("#curid").val(),
						ma: $("#curmail").val(),
						ln: 'en'
					});
				}
			}

		}
		return false;

	});
	
	
	$("#logpw").keydown(function(e) {
		if (e.keyCode === 13 || e.keyCode === 10 ) {
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

	$("#logout").click(function() {
		$("#propic").attr('src', 'pics/default.png');
		$("#inbox").attr('style', "display: none;");
		$("#nonbox").attr('style', "display: block;");
		$("#proname").remove();

		document.cookie = "login=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		document.cookie = "temp=; expires=Thu, 31 Dec 2019 12:00:00 UTC; path=/";
		socket.emit('logout');
		
		var tl = 'Contact: <a href="mailto:tagtimemaster@gmail.com">tagtimemaster@gmail.com</a> ©tagtime.net';
		document.getElementById("footer").innerHTML = tl;
		return false;
	});
	
	
	
	$("#inbox").on('click', "#proname", function () {	

		var sun = prompt("Do you want to change your username?");
		if (sun != null && sun.length > 0) {
			if (sun !== $("#proname").html()) {
				if (sun.indexOf('<') == -1 && sun.indexOf('>') == -1 && sun == sun.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g, '')) {
					socket.emit('sun', sun);
				} else {
					alert('Your username contains invalid characters.');
				}
			} else {
				alert('This username is the same as before.');
			}
		}
		
			
		return false;
	});
	
	
	
	$("#friend").click(function() {
		socket.emit('myfriends');
		$("#friendialog").dialog({
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

		socket.emit('delnote', $(this).attr('alt'));

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
			alert('Please select messages to reply.');
		}	

		
		return false;
	});
	
	
	
	
	$("#delmessage").click(function() {
		$('#delmsglist').val('');
		
		$('#messagelist .ui-selected').each(function(){
			$('#delmsglist').val($('#delmsglist').val() + $(this).attr('alt') + ',');
		});
		
		socket.emit('delmsg', $('#delmsglist').val());
		return false;
	});
	
	
	
	
	
	$("#msend").click(function() {

		$("#sfr").val('');
		
		
		if ($('#sfrlist .ui-selected').length == 0) {
			alert('Please select more than one friend from the list.');
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
	
	
	$("#top10").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'today',
			frm: 'en'
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
	
	
	$("#todayen").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'today',
			frm: 'en'
		});
		return false;
	});	
	
	$("#weeken").click(function() {
		$("#toplist").empty();
		socket.emit('top10', {
			day: 'week',
			frm: 'en'
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

/*
	$( "#taglist" ).bind("mousedown", function(e) {
		e.metaKey = true;
	}).selectable();
*/		
	
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
			if (confirm('Do you want to send a friend request to ' + "\"" + $("#srn").val() + "\"?")) {
				socket.emit('reqfriend', $("#srn").attr('alt'));
			}
		} else {
			alert('Please search for a friend first.');
			document.getElementById('searchid').focus();
		}
		return false;
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
	
	
	$("#delfriend").click(function() {

		$("#delfriendlist").val('');
		$('#frlist .ui-selected').each(function(){
			$("#delfriendlist").val($("#delfriendlist").val() + $(this).text() + ',');
		});

		socket.emit('delfriend', $("#delfriendlist").val());
		
		return false;
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
	
	
	$('#atag').bind("paste",function(e) {
		e.preventDefault();
	});
	
	$("#atag").keydown(function (k) {
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
					alert('This tag is already on the list.');
					$("#atag").val(vava);
				} else {

					var tli =  '<li>' + vava + '</li>';
					$("#write-taglist").append(tli);
					document.getElementById("write-taglist").scrollTop = document.getElementById("write-taglist").scrollHeight;
					$("#realwritetag").val($("#realwritetag").val() + vava + ',');

					$("#atag").val('');
				}
			} else {				
				alert('Please fill in the field');
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
				alert('This tag is already on the list.');
				$("#atag").val(vava);
			} else {
				
				var tli =  '<li>' + vava + '</li>';
				$("#write-taglist").append(tli);
				document.getElementById("write-taglist").scrollTop = document.getElementById("write-taglist").scrollHeight;
				
				
				$("#realwritetag").val($("#realwritetag").val() + vava + ',');

				$("#atag").val('');
			}
		} else {
			alert('Please fill in the field');
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
			title: "CHANGE PASSWORD",
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
				alert('Please check your password again.');
				document.getElementById('npass').focus();
			} else {
				if ($("#cpass").val() == $("#npass").val()) {
					alert('Your new password is the same as before.');
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
						alert('Please make your password 8 letters or longer.');
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
					alert('Please check your password again.');
					document.getElementById('npass').focus();
				} else {
					if ($("#cpass").val() == $("#npass").val()) {
						alert('Your new password is the same as before.');
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
							alert('Please make your password 8 letters or longer.');
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
			title: "LEAVE TAGTIME?",
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

	$("#log_open").click(function() {

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
		$("#signin").dialog({
			position: {
				my: "center",
				at: "center",
				of: window
			},
			modal: true,
		});

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
				$("#realwritetag").val(',English' + cookielast2[0]);
			}
		}
		

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

		return false;
	});
	
	
		
	$("#write").on('dialogclose', function() {

		$("#atitle").val('');
		$("#amain").html('');
		$("#atag").val('');				
		$("#write").dialog("destroy");
		$("#write-picbox").empty();
		$("#fakebox").empty();
		$("#pupload").empty();
		$("#write-taglist").empty();
		$("#realwritetag").val(',English,');
		$("#sending").attr('style', "display: none;");
	
		return false;

	});
	
	
	$("#view").on('dialogclose', function() {

		window.history.pushState('', '', '/');
		$("#aview").html('');
		$("#view").dialog("destroy");
		$("#ananan").html('');
		$("#com").val('');
		$("#view-tagbox").empty();
		$("#hits").html('');
		$("#tagup").html('');
		$("#ttt").html('');
		$('#view-cbox').empty();
		socket.emit('IamO');
		
		$("#view-p").attr('src', "pics/default.png");
		$("#view-n").html('nonmember');
		$("#view-n").attr('alt', '');
		$("#voteup").remove();
		$("#delarticle").remove();
		
		$('#Fullscreen').hide();
		$('#Fullscreen img').attr('src', '');
		
		return false;
	});
	

	
	$("#login").on('dialogclose', function() {

		$("#logid").val('');
		$("#logpw").val('');
		$("#login").dialog("destroy");

	
		return false;

	});
	
	
	$("#signin").on('dialogclose', function() {

		$("#signid").val('');
		$("#signname").val('');
		$("#upass").val('');
		$("#passcheck").val('');
		$("#email").val('');
		$("#signin").dialog("destroy");
		return false;

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


};

