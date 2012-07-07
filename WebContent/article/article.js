var articleList = {
	apple : [ {
		title : "苹果公司标志的来历",
		href : "20120509/01.html"
	}, {
		title : "也许你不知道的iPhone使用技巧",
		href : "20120509/02.html"
	}, {
		title : "Mac操作技巧",
		href : "20120509/03.html"
	} ],
	android : [ {
		title : "苹果公司标志的由来3",
		href : "20120509/01.html"
	} ],
	DSTL : [ {
		title : "摄影大师名言",
		href : "20120509/01.html"
	}, {
		title : "给摄影新手的十大建议",
		href : "20120509/02.html"
	} ]
};
function showArticle($appleC, $androidC, $DSTLC) {
	store.set("articleList", articleList);
	var apple = articleList.apple.slice(0, 10);
	var appleRoot = "/article/apple/";
	var more = $("<div></div>");
	more.css("text-align", "right");
	var moreA = $("<a target='_blank'>更多...</a>");
	more.append(moreA);
	for ( var i in apple) {
		var div = $('<span class="appleArticle"></span>');
		var a = $('<a target="_blank"></a>');
		a.attr("href", appleRoot + apple[i].href);
		a.attr("title", apple[i].title);
		a.text(apple[i].title.slice(0, 27));
		div.append(a);
		$appleC.append(div);
	}
	var android = articleList.android.slice(0, 10);
	var androidRoot = "/article/android/";
	for ( var i in android) {
		var div = $('<span class="androidArticle"></span>');
		var a = $('<a target="_blank"></a>');
		a.attr("href", androidRoot + android[i].href);
		a.attr("title", android[i].title);
		a.text(android[i].title.slice(0, 27));
		div.append(a);
		$androidC.append(div);
	}
	var DSTL = articleList.DSTL.slice(0, 10);
	var DSTLRoot = "/article/DSTL/";
	for ( var i in DSTL) {
		var div = $('<span class="DSTLArticle"></span>');
		var a = $('<a target="_blank"></a>');
		a.attr("href", DSTLRoot + DSTL[i].href);
		a.attr("title", DSTL[i].title);
		a.text(DSTL[i].title.slice(0, 27));
		div.append(a);
		$DSTLC.append(div);
	}
	moreA.attr("href", "article/articleList.html?articleClass=apple");
	more.clone().appendTo($appleC);
	moreA.attr("href", "article/articleList.html?articleClass=android");
	more.clone().appendTo($androidC);
	moreA.attr("href", "article/articleList.html?articleClass=DSTL");
	more.clone().appendTo($DSTLC);
}