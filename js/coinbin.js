$(document).ready(function() {
	
	window.onload=doesConnectionExist();

	/* Detect if online */
	function doesConnectionExist() {
		if(navigator.onLine===true){
			$("#isConnected").removeClass("hidden").fadeIn().fadeOut().fadeIn();
		}
	}
	
	/* easy login code */
	var privkey;
	var pubkey;
	var s;
	$("#openBtn").click(function(){
		var username = $("#openUsername").val().toLowerCase();
			if($("#openPass").val().length>=10){
				$("#openLogin").hide();
				var username = $("#openUsername").val().toLowerCase();
				var pass = $("#openPass").val();
				s = username;
				s += '|'+pass+'|';
				s += s.length+'|!@'+((pass.length*7)+username.length)*7;
				var regchars = (pass.match(/[a-z]+/g)) ? pass.match(/[a-z]+/g).length : 1;
				var regupchars = (pass.match(/[A-Z]+/g)) ? pass.match(/[A-Z]+/g).length : 1;
				var regnums = (pass.match(/[0-9]+/g)) ? pass.match(/[0-9]+/g).length : 1;
				s += ((regnums+regchars)+regupchars)*pass.length+'3571';
				s += (s+s);
				var o=0;
				var u=0;
				for(i=1;i<=50000;i++){
					s = Crypto.SHA256(s);
				}
				coinjs.compressed = true;
				var keys = coinjs.newKeys(s);

				$("#walletAddress").html(keys.address);
				$("#walletHistory").attr('href','http://www.blockchain.info/address/'+keys.address);
				$("#walletKeys .address").val(keys.address);
				$("#walletKeys .privkey").val(keys.wif);
				$("#walletKeys .pubkey").val(keys.pubkey);
				privkey = keys.wif;
				pubkey = keys.pubkey;
				
				$("#openWallet").removeClass("hidden").show();
				$("#verify").removeClass("hidden").show();
				$("#walletKeys").removeClass("hidden").show();
				$("#logout123").removeClass("hidden").show();
				var h='';
				h += '<span>'+username+'</span>';
				$(h).appendTo("#logout123 .username");
			} else {
				$("#openLoginStatus").html("Your password must be at least 10 characters long").removeClass("hidden").fadeOut().fadeIn();
			}

		$("#openLoginStatus").prepend('<span class="glyphicon glyphicon-exclamation-sign"></span> ');
	});
	
	/* Setup Account Login code */
	$("#setupAccountBtn").click(function(){
		
		if($("#openPass").val().length>=10){
			if($("#openPass").val()==$("#openPassConfirm").val()){
				$("#openLogin").hide();
				var username = $("#openUsername").val().toLowerCase();
				var pass = $("#openPass").val();
				s = username;
				s += '|'+pass+'|';
				s += s.length+'|!@'+((pass.length*7)+username.length)*7;
				var regchars = (pass.match(/[a-z]+/g)) ? pass.match(/[a-z]+/g).length : 1;
				var regupchars = (pass.match(/[A-Z]+/g)) ? pass.match(/[A-Z]+/g).length : 1;
				var regnums = (pass.match(/[0-9]+/g)) ? pass.match(/[0-9]+/g).length : 1;
				s += ((regnums+regchars)+regupchars)*pass.length+'3571';
				s += (s+s);
				var o=0;
				var u=0;
				for(i=1;i<=50000;i++){
					s = Crypto.SHA256(s);
				}
				coinjs.compressed = true;
				var keys = coinjs.newKeys(s);

				$("#walletAddress").html(keys.address);
				$("#walletHistory").attr('href','http://www.blockchain.info/address/'+keys.address);
				$("#walletKeys .address").val(keys.address);
				$("#walletKeys .privkey").val(keys.wif);
				$("#walletKeys .pubkey").val(keys.pubkey);
				privkey = keys.wif;
				pubkey = keys.pubkey;
				
				$("#openWallet").removeClass("hidden").show();
				$("#verify").removeClass("hidden").show();
				$("#walletKeys").removeClass("hidden").show();
				$("#logout123").removeClass("hidden").show();
				var h='';
				h += '<span>'+username+'</span>';
				$(h).appendTo("#logout123 .username");
			} else {
				$("#openLoginStatus").html("Your passwords do not match!").removeClass("hidden").fadeOut().fadeIn();
			}
		} else {
			$("#openLoginStatus").html("Your password must be at least 10 characters long").removeClass("hidden").fadeOut().fadeIn();
		}

		$("#openLoginStatus").prepend('<span class="glyphicon glyphicon-exclamation-sign"></span> ');
	});
	
	$(".showKey").click(function(){
		$("input[type='password']",$(this).parent().parent()).attr('type','text');
	});
	
	/* hard login code */
	$("#privBtn").click(function(){
		coinjs.compressed = true;
		privkey = $("#privKey").val();
		pubkey = $("#pubKey").val();
		$("#openWallet").removeClass("hidden").show();
		$("#verify").addClass("hidden");
		$("#walletKeys").removeClass("hidden").show();
		$("#logout123").removeClass("hidden").show();
		var h='';
		h += '<span>'+pubkey+'</span>';
		$(h).appendTo("#logout123 .username");
		
		var multipleTrans = $("#verifyScript").val();
		seperateTrans = multipleTrans.split(",");
		if(seperateTrans[0]===pubkey){
			notSignedArr.push(seperateTrans[0]);
			seperateTrans.splice(0,1);
			a = seperateTrans.length;
			var y=a;
			var h ='';
			h += '<span>'+y+'</span>';
			$("#ready").removeClass("hidden").show();
			$(h).appendTo("#ready .numTransactions");
		}
		else{
			$("#notCorrectLogin").removeClass("hidden").fadeIn().fadeOut().fadeIn();
		}

	});
	
	/*  verifyBtn Code (easy only) */
	
	var seperateTrans = [];
	var notSignedArr = [];
	var a;
	$("#verifyBtn").click(function(){
		$("#verify").addClass("hidden");
		var multipleTrans = $("#verifyScript").val();
		seperateTrans = multipleTrans.split(",");
		if(seperateTrans[0]===pubkey){
			notSignedArr.push(seperateTrans[0]);
			seperateTrans.splice(0,1);
			a = seperateTrans.length;
			var y=a;
			var h ='';
			h += '<span>'+y+'</span>';
			$("#ready").removeClass("hidden").show();
			$(h).appendTo("#ready .numTransactions");
		}
		else{
			$("#notCorrectLogin").removeClass("hidden").fadeIn().fadeOut().fadeIn();
		}
		

	});
	
	/* Welcome note and logout button */
	$("#walletLogout").click(function(){
		$("#openTXID").val("");
		$("#openPass").val("");
		$("#openPassConfirm").val("");

		$("#openLogin").show();
		$("#openWallet").addClass("hidden");
		$("#openLoginStatus").hide();

		$("#walletAddress").html("");
		$("#walletHistory").attr('href','http://www.blockchain.info/address/');
		$("#walletQrCode").html('<img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=bitcoin:">');
		$("#walletKeys .privkey").val("");
		$("#walletKeys .pubkey").val("");
		$("#notCorrectLogin").addClass("hidden");
		$("#verify").addClass("hidden");
		$("#ready").addClass("hidden");
		$("#show").addClass("hidden");
		$("#showAll").addClass("hidden");
		$("#verifyScript").val("");
		
		
		
		window.location.reload();
	});

	/* broadcast a transaction (not being used at this time)

	$("#rawSubmitBtn").click(function(){
		var tx = coinjs.transaction();
		tx.broadcast(function(data){
			$("#rawTransactionStatus").html(unescape($(data).find("response").text()).replace(/\+/g,' ')).removeClass('hidden');
			if($(data).find("result").text()==1){
				$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger');
				$("#rawTransactionStatus").html('txid: '+$(data).find("txid").text());
			} else {
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span> ');
			}
			$("#rawTransactionStatus").fadeOut().fadeIn();
		}, $("#rawTransaction").val());
	});*/
	

	/* readyBtn Code */
	var x=0;
	$("#readyBtn").click(function(){
		$("#ready").addClass("hidden");
		
		seperateMore();
	});
	
	/* seperateMore() code */
	
	var transNums = [];
	var transScript = [];
	function seperateMore(){
		for(var l=0;l<seperateTrans.length;l++){
			var temp = [];
			temp = seperateTrans[l].split(".");
			transNums.push(temp[0]);
			transScript.push(temp[1]);
		}
		show();
	}
	
	/* show() code */
	function show(){
		duplicateShow();
		$("#show").removeClass("hidden").show();
		$("#shower"+x).removeClass("hidden").show();
		var tx = coinjs.transaction();
		
		var decode = tx.deserialize(transScript[x]);
		var txNum = transNums[x];
		var h ='';
		var y=x+1;
		h += '<span>'+y+'/'+a+'</span>';
		$(h).appendTo("#shower"+x+" .numTrans");
		h=''
		h+= '<span>'+txNum+'</span>';
		$(h).appendTo("#shower"+x+" .showTxNum");
		
		$.each(decode.outs, function(i,o){

			var addr = '';
			if(o.script.chunks.length==5){
				addr = coinjs.scripthash2address(Crypto.util.bytesToHex(o.script.chunks[2]));
			} else {
				var priv = coinjs.priv;
				coinjs.priv = 0x05;
				addr = coinjs.scripthash2address(Crypto.util.bytesToHex(o.script.chunks[1]));
				coinjs.priv = priv;
			}
			
			h='';
			h += '<tr>';
			h += '<td class="col-xs-1">'+(o.value/100000000).toFixed(8)+'</td>';
			h += '<td><span class="glyphicon glyphicon-arrow-right" style="float:center"></span></td>';
			h += '<td><input class="form-control" type="text" value="'+addr+'" readonly></td>';
			h += '</tr>';
			$(h).appendTo("#shower"+x+" .transactionInfoTable");
		});
	}
	
	/* duplicateShow() code */
	
	function duplicateShow(){
		var original = document.getElementById('shower');
		var clone = original.cloneNode(true); // "deep" clone
	    clone.id = "shower" + x; // there can only be one element with an ID
		original.parentNode.appendChild(clone);
	}
	
	/* signBtn Code */
	var isDupe=false;
	$("#signBtn").click(function(){
		//$("#sign").removeClass("hidden").show();
		$("#skippedSuccessfully").addClass("hidden")
		isDupe=false;
		sign();
	});
	
	/* sign() code */
	var signedArr = [];
	var signedArrWork = [];
	function sign(){
		var wifkey = privkey;
		var script = transScript[x];

		if(coinjs.addressDecode(wifkey)){
			$(wifkey).parent().removeClass('has-error');
		} else {
			$(wifkey).parent().addClass('has-error');
		}

		if(script.match(/^[a-f0-9]+$/ig)){
			$("shower"+x).removeClass('has-error');
		} else {
			$("shower"+x).addClass('has-error');
		}

		if($("#shower"+x+" .has-error").length==0){
			var t;
			//$("#signedDataError").addClass('hidden');
			try {
				var tx = coinjs.transaction();
				t = tx.deserialize(script);
				var signed = t.sign(wifkey);
				signedArr.push(signed);
				$("#signedSuccessfully").removeClass("hidden").fadeIn().fadeOut().fadeIn();
				$("#shower"+x).addClass("hidden");
				x +=1;
				if(x<a){
					show();
				}
				else{
					showAll();
				}
				
			} catch(e) {
				 console.log(e);
			}
		} else {
			$("#shower"+x+" .signingError").removeClass("hidden").show();
			var h='';

			var decode = tx.deserialize(seperateTrans[x]);
			$.each(decode.outs, function(i,o){

				var addr = '';
				if(o.script.chunks.length==5){
					addr = coinjs.scripthash2address(Crypto.util.bytesToHex(o.script.chunks[2]));
				} else {
					var priv = coinjs.priv;
					coinjs.priv = 0x05;
					addr = coinjs.scripthash2address(Crypto.util.bytesToHex(o.script.chunks[1]));
					coinjs.priv = priv;
				}
				signedArrWorked.push("2");
				h ='';
				h += '<tr>';
				h += '<td><input class="form-control" type="text" value="'+addr+'" readonly></td>';
				h += '<td class="col-xs-1">'+(o.value/100000000).toFixed(8)+'</td>';
				h += '</tr>';
				$(h).appendTo("#transaction"+x+" .signedTXBottom");
				h='';
				h += '<textarea class="form-control script center" style="height:160px" readonly>'+script+'</textarea>';
				$(h).appendTo("#transaction"+x+" .signingFailed");
				var size=t.size();
				$(size).appendTo("#transaction"+x+" .txSize");

				
			});
			
				
		}

	}
	
	/* skipBtn Code */
	
	$("#skipBtn").click(function(){
		$("#show").addClass("hidden");
		if(isDupe===false){
			duplicateSkip();
			isDupe=true;
		}
		
		$("#skipInfo").removeClass("hidden").show();
		$("#skippedInfo"+x).removeClass("hidden").show();
		
	});
	
	
	/* duplicateSkip() code */
	function duplicateSkip(){
		var original = document.getElementById('skippedInfo');
		var clone = original.cloneNode(true); // "deep" clone
		clone.id = "skippedInfo" + x; // there can only be one element with an ID
		original.parentNode.appendChild(clone);
		var h='';
		var o=transNums[x];
		h += '<span>'+o+'</span>';
		$(h).appendTo("#skippedInfo"+x+" .outputTx");
		
	}
	
	/* noSkipBtn */
	$("#noSkipBtn").click(function(){
		$("#skipInfo").addClass("hidden");
		$("#skippedInfo"+x).addClass("hidden");
		$("#show").removeClass("hidden").show();
		
	});
	
	/* yesSkipBtn */
	$("#yesSkipBtn").click(function(){
		$("#skipInfo").addClass("hidden");
		$("#skippedInfo"+x).addClass("hidden");
		$("#show").removeClass("hidden").show();
		$("#shower"+x).addClass("hidden");
		$("#signedSuccessfully").addClass("hidden");
		$("#skippedSuccessfully").removeClass("hidden").fadeIn().fadeOut().fadeIn();
		isDupe=false;
		notSignedArr.push(seperateTrans[x]);
		x += 1;
		if(x<a){
			show();
		}
		else{
			showAll();
		}
	});
	
	/* finishBtn Code */
	$("#finishBtn").click(function(){
		$("#show").addClass("hidden");
		$("#finishInfo").removeClass("hidden").show();
	});
	
	/* yesFinishBtn */
	$("#yesFinishBtn").click(function(){
		$("#finishInfo").addClass("hidden");
		$("#signedSuccessfully").addClass("hidden");
		$("#skippedSuccessfully").addClass("hidden");
		for(c=x;x<a;c++){
			notSignedArr.push(seperateTrans[c]);
			x +=1;
		}
		showAll();
	});
	
	/* noFinishBtn */
	$("#noFinishBtn").click(function(){
		$("#finishInfo").addClass("hidden");
		$("#show").removeClass("hidden").show();
	});
	
	
	
	/* showAll() code*/
	
	function showAll(){
		$("#show").addClass("hidden");
		$("#showAll").removeClass("hidden").show();
		if(signedArr.length>0){
			$("#showAllAlert").removeClass("hidden").show();
			var h ='';
			h += '<textarea class="form-control script center" style="height:250px" readonly>'+signedArr.join(",")+'</textarea>';
			$(h).appendTo("#showAllAlert .allSignedHex");
			h='';
			h += '<span>'+signedArr.length+'</span>';
			$(h).appendTo("#showAll .numTransGood");
		}
		else{
			
		}
		if(notSignedArr.length>1){
			var notSignedArrLength = notSignedArr.length-1;
			$("#showAllAlertBad").removeClass("hidden").show();
			var h ='';
			h += '<textarea class="form-control script center" style="height:250px" readonly>'+notSignedArr.join(",")+'</textarea>';
			$(h).appendTo("#showAllAlertBad .allNotSignedHex");
			h='';
			h += '<span>'+notSignedArrLength+'</span>';
			$(h).appendTo("#showAll .numTransFailed");
		}
		else{
			
		}
	}
})
