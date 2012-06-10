var tmallicon = "/ad/level_20.gif";
var ad = {
	apple : [ {
		title : "友通华盛数码专营店",
		url : "http://ythssm.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "古古美美旗舰店",
		url : "http://ggmm.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "skinat旗舰店",
		url : "http://skinat.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "鲸拓旗舰店",
		url : "http://kto.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "一佰手机配件专营店",
		url : "http://yibai.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "蓝古数码专营店",
		url : "http://langusm.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "果珈数码专营店",
		url : "http://gjsm.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "银地数码专营店",
		url : "http://yindism.tmall.com/",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "诺基亚8800专营",
		url : "http://91pg.taobao.com/",
		iconurl : "http://pics.taobaocdn.com/newrank/s_cap_2.gif",
		tkurl : ""
	}, {
		title : "翔云数码商城",
		url : "http://shop57955715.taobao.com/",
		iconurl : "http://pics.taobaocdn.com/newrank/s_blue_4.gif",
		tkurl : ""
	}, {
		title : "荐昆数码专营店",
		url : "http://jiankun.tmall.com/",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "蓝悦数码",
		url : "http://shixu702.taobao.com/",
		iconurl : "http://pics.taobaocdn.com/newrank/s_blue_2.gif",
		tkurl : ""
	}, {
		title : "连骏数码专营店",
		url : "http://lianjunsm.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "苹果数码旗舰店",
		url : "http://hongdakejitongxun.taobao.com/",
		iconurl : "http://pics.taobaocdn.com/newrank/s_blue_5.gif",
		tkurl : ""
	}, {
		title : "叮当数码港",
		url : "http://shop35060648.taobao.com/",
		iconurl : "http://pics.taobaocdn.com/newrank/s_cap_3.gif",
		tkurl : ""
	}, {
		title : "misssjoyce数码潮流",
		url : "http://shop59186638.taobao.com/",
		iconurl : "http://pics.taobaocdn.com/newrank/s_cap_5.gif",
		tkurl : ""
	}, {
		title : "爱尚数码旗舰店",
		url : "http://shop35560706.taobao.com/",
		iconurl : "http://pics.taobaocdn.com/newrank/s_cap_3.gif",
		tkurl : ""
	}, {
		title : "色色数码",
		url : "http://gosese.taobao.com/",
		iconurl : "http://pics.taobaocdn.com/newrank/s_cap_2.gif",
		tkurl : ""
	} ],
	android : [ {
		title : "卓越数码城",
		url : "http://shop60706723.taobao.com",
		iconurl : getSCS(12),
		tkurl : ""
	}, {
		title : "当当话机",
		url : "http://shop35944540.taobao.com",
		iconurl : getSCS(12),
		tkurl : ""
	}, {
		title : "仁信数码专营店 ",
		url : "http://renxinsm.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	}, {
		title : "索旭数码专营店",
		url : "http://suoxusm.tmall.com",
		iconurl : tmallicon,
		tkurl : ""
	} ],
	DSTL : [ {
		title : "新颖数码街",
		url : "http://shop34494287.taobao.com/",
		iconurl : getSCS(12),
		tkurl : ""
	}, {
		title : "曙光数码商城",
		url : "http://shop57539045.taobao.com/",
		iconurl : getSCS(11),
		tkurl : ""
	}, {
		title : "北京新天地数码城",
		url : "http://shop62102347.taobao.com/",
		iconurl : getSCS(10),
		tkurl : ""
	}, {
		title : "沃尔卡数码摄影器材专卖店",
		url : "http://shop1144588.taobao.com/",
		iconurl : getSCS(11),
		tkurl : ""
	}, {
		title : "南京丹光数码产品中心",
		url : "http://shop67704025.taobao.com/",
		iconurl : getSCS(8),
		tkurl : ""
	} ]
};

function showAD($appleC, $androidC, $DSTLC) {
	var apple = ad.apple;
	for ( var i in apple) {
		var div = $('<div class="appleAdvert"></div>');
		var a = $('<a target="_blank"></a>');
		a.attr("href", $.isEmptyObject(apple[i].tkurl) ? apple[i].url : apple[i].tkurl);
		a.attr("title", apple[i].title);
		var img = $("<img>");
		img.attr("src", apple[i].iconurl);
		var span = $("<span></span>");
		span.text(apple[i].title);
		a.append(img);
		a.append(span);
		div.append(a);
		$appleC.append(div);
	}
	var android = ad.android;
	for ( var i in android) {
		var div = $('<div class="androidAdvert"></div>');
		var a = $('<a target="_blank"></a>');
		a.attr("href", $.isEmptyObject(android[i].tkurl) ? android[i].url : android[i].tkurl);
		a.attr("title", android[i].title);
		var img = $("<img>");
		img.attr("src", android[i].iconurl);
		var span = $("<span></span>");
		span.text(android[i].title);
		a.append(img);
		a.append(span);
		div.append(a);
		$androidC.append(div);
	}
	var DSTL = ad.DSTL;
	for ( var i in DSTL) {
		var div = $('<div class="DSTLAdvert"></div>');
		var a = $('<a target="_blank"></a>');
		a.attr("href", $.isEmptyObject(DSTL[i].tkurl) ? DSTL[i].url : DSTL[i].tkurl);
		a.attr("title", DSTL[i].title);
		var img = $("<img>");
		img.attr("src", DSTL[i].iconurl);
		var span = $("<span></span>");
		span.text(DSTL[i].title);
		a.append(img);
		a.append(span);
		div.append(a);
		$DSTLC.append(div);
	}
}