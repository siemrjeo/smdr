//导航地址
var navigation = {
	index : "http://smdr.willtong.com"
};
// 验证用户，用户通过验证后信息存放在这个对象里面；
var visitor_user;

// 买家参数
var buyerParameter = {
	top_appkey : "",
	top_parameters : "",
	top_session : "",
	type : "",
	top_sign : ""
};

$(document).ready(function() {
	getBuyerParameter();// 获取用户登录参数
	// 设置ajax全局参数
	$.ajaxSetup({
		dataType : "json",
		type : "POST"
	});
});

// 获取get参数。
function GetQueryString(name) {
	$.ajaxSetup({
		accepts : "json"
	});
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return "";
}

// buyer获取参数对象
function getBuyerParameter() {
	for ( var i in buyerParameter) {
		buyerParameter[i] = GetQueryString(i);
	}
	return buyerParameter;
}

// String format function
String.format = function(str) {
	var args = arguments, re = new RegExp("%([1-" + args.length + "])", "g");
	return String(str).replace(re, function($1, $2) {
		return args[$2];
	});
};

// 转跳到错误显示页面
function toErrorPage(errorInfo) {
	store.set("ErrorInfo", errorInfo);
	location.href = "error.html";
}

// --------------------------------记录屏幕点击坐标到本地存储----------------------
$(document).bind("click", recordClickCoord);
function recordClickCoord(event) {
	if (event.button == 0) {// 仅当点击鼠标左键时才记录
		var clickCoord = new Object();
		var histroyClickCoord = store.get("clickCoord");
		if (!$.isEmptyObject(histroyClickCoord)) {
			clickCoord = histroyClickCoord;
		}
		clickCoord[new Date().getTime()] = {
			pathname : location.pathname,
			pageX : event.pageX,
			pageY : event.pageY
		};
		store.set("clickCoord", clickCoord);
	}
}
// -----------------------------------------------------------------------------------

// -------------------------------记录点击商品的id到本地存储------------------------
$(".clickItem").bind("click", {
	iid : "001"
}, recordClickItemId);// 未完成，需要修改
function recordClickItemId(event) {
	if (event.button == 1) {// 仅点击鼠标左键时才记录
		var clickItem = new Object();
		var histroyClickItem = store.get("clickItem");
		if (histroyClickItem != null) {
			clickCoord = $.parseJSON(histroyClickItem);
		}
		clickItem[new Date().getTime()] = {
			iid : event.data.iid
		};
		store.set("clickItem", clickItem);
	}
}
// -----------------------------------------------------------------------------------
// ------------------------提交记录到服务器保存-------------------------------------
$(window).bind("unload", submitRecordToService);
function submitRecordToService(event) {
	var visitor_user = store.get("visitor_user");
	var nick = "未知用户";
	if (!$.isEmptyObject(visitor_user) && !$.isEmptyObject(visitor_user.decodeTopParams) && !$.isEmptyObject(visitor_user.decodeTopParams.visitor_nick)) {
		nick = visitor_user.decodeTopParams.visitor_nick;
	}
	var request = {
		nick : nick,
		clickCoord : store.get("clickCoord"),
		clickItem : store.get("clickItem")
	};
	$.ajax({
		dataType : "json",
		type : "POST",
		url : "buyer/saveRecord",
		async : false,
		data : request,
		success : function(data, textStatus) {
			if (data.is_success) {
			} else {
			}
		},
		complete : function(XMLHttpRequest, textStatus) {
			store.remove("clickCoord");
			store.remove("clickItem");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
// -----------------------------------------------------------------------------------
// 获取集市卖家信誉图片
// 店铺的信用等级总共为20级
// 1-5:1heart-5heart;
// 6-10:1diamond-5diamond;
// 11-15:1crown-5crown;
// 16-20:1goldencrown-5goldencrown
function getSCS(scs) {
	var root = "http://a.tbcdn.cn/sys/common/icon/rank/";
	var path = "b_1_1.gif";
	switch (scs) {
	case 1:
		path = "b_1_1.gif";
		break;
	case 2:
		path = "b_1_2.gif";
		break;
	case 3:
		path = "b_1_3.gif";
		break;
	case 4:
		path = "b_1_4.gif";
		break;
	case 5:
		path = "b_1_5.gif";
		break;
	case 6:
		path = "b_2_1.gif";
		break;
	case 7:
		path = "b_2_2.gif";
		break;
	case 8:
		path = "b_2_3.gif";
		break;
	case 9:
		path = "b_2_4.gif";
		break;
	case 10:
		path = "b_2_5.gif";
		break;
	case 11:
		path = "b_3_1.gif";
		break;
	case 12:
		path = "b_3_2.gif";
		break;
	case 13:
		path = "b_3_3.gif";
		break;
	case 14:
		path = "b_3_4.gif";
		break;
	case 15:
		path = "b_3_5.gif";
		break;
	case 16:
		path = "b_4_1.gif";
		break;
	case 17:
		path = "b_4_2.gif";
		break;
	case 18:
		path = "b_4_3.gif";
		break;
	case 19:
		path = "b_4_4.gif";
		break;
	case 20:
		path = "b_4_5.gif";
		break;
	default:
		path = "b_1_1.gif";
		break;
	}

	return root + path;
}
