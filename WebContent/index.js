$(document).ready(function() {
	$.ajax({
		url : "buyer/login",
		data : buyerParameter,
		success : function(data, textStatus) {
			visitor_user = data;
			if (visitor_user.is_success) {
				if (visitor_user.loginCountry = "本机地址") {
					visitor_user.loginCountry = "湖南省 长沙市";
				}
				store.set("visitor_user", visitor_user);
			} else {
				toErrorPage(visitor_user.sub_msg);
			}
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toErrorPage("服务器错误：" + errorThrown);
		}
	});
	$(document).bind("keydown", function(event) {
		if (event.keyCode == 13) {
			document.getElementById("searchButton").click();
			return false;
		}
	});

	bindMap();
	showAD($("#tableMain > tbody > tr:eq(3) > td:eq(1)"), $("#tableMain > tbody > tr:eq(6) > td:eq(1)"), $("#tableMain > tbody > tr:eq(9) > td:eq(1)"));
	showAcc($("#appleAcc"), $("#androidAcc"), $("#DSTLAcc"));
	// showArticle($("#tableMain > tbody > tr:eq(4) > td:eq(0)"), $("#tableMain
	// > tbody > tr:eq(7) > td:eq(0)"), $("#tableMain > tbody > tr:eq(10) >
	// td:eq(0)"));
	showArticle($("#appleArticle"), $("#androidArticle"), $("#DSTLArticle"));
});

function search(cid, keyword) {
	var search = {};
	if (arguments.length == 0) {
		if ($.isEmptyObject($("#keyword").val())) {
			return true;
		}
		search = {
			keyword : $("#keyword").val(),
			cid : 0
		};
	} else if (arguments.length == 2) {
		if ($.isEmptyObject(cid) || $.isEmptyObject(keyword)) {
			return true;
		}
		search = {
			keyword : keyword,
			cid : cid
		};
	}

	store.set("search", search);
	// location.href = "search.html";
	window.open("search.html", "_blank");
}

function toS8() {// 转跳到搜吧
	var q = $("#keyword").val();
	var href = String.format("http://s8.taobao.com/search?q=%1&pid=mm_23868633_0_0&unid=smdrsearch&taoke_type=1", q);
	window.open(encodeURI(href), target = 'blank');
}

function bindMap() {
	$(".rslides").responsiveSlides({
		pager : true
	});
	$("#appleDiv").slideshow();
	$("#androidDiv").slideshow();
	$("#DSRLDiv").slideshow();
}