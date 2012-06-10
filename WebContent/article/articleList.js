$(document).ready(function() {
	showArticleList($("#articleList"));
});

function showArticleList($div) {
	var articleList = store.get("articleList");
	var list, root;
	switch (GetQueryString("articleClass")) {
	case "apple":
		list = articleList.apple;
		root = "/article/apple/";
		break;
	case "android":
		list = articleList.android;
		root = "/article/android/";
		break;
	case "DSTL":
		list = articleList.DSTL;
		root = "/article/DSTL/";
		break;

	default:
		list = articleList.apple;
		root = "/article/apple/";
		break;
	}

	for ( var i in list) {
		var div = $('<div></div>');
		var a = $('<a target="_blank"></a>');
		a.attr("href", root + list[i].href);
		a.attr("title", list[i].title);
		a.text(list[i].title.slice(0, 27));
		div.append(a);
		$div.append(div);
	}
}