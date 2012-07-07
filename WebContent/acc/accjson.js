var acc = {
	apple : [ {
		title : "车载充电器",
		tkurl : "http://s.click.taobao.com/t_8?e=7HZ6jHSTbIQ9rMlPIwsLSHwQXTGGPCWIcJVls4bguEUnSg%3D%3D&p=mm_23868633_0_0"
	}, {
		title : "iPad支架保护套",
		tkurl : "http://s.click.taobao.com/t_8?e=7HZ6jHSTbIKhl2TI1Mj5gB5NALStAjC54C89v8H83BaOHA%3D%3D&p=mm_23868633_0_0"
	}, {
		title : "iPhone4s珍珠保护套",
		tkurl : "http://s.click.taobao.com/t_8?e=7HZ6jHSTbIQ2T3xs7O7Dklk9Wh8Hzq4nc8SccOq2vRwXSg%3D%3D&p=mm_23868633_0_0"
	}, {
		title : "iPad带键盘保护套",
		tkurl : "http://s.click.taobao.com/t_8?e=7HZ6jHSTbIKrMylpCSwSwneOB3KoRZ6sIeIDtKCR9t14XQ%3D%3D&p=mm_23868633_0_0"
	}, {
		title : "MacBook绚彩贴膜",
		tkurl : "http://s.click.taobao.com/t_8?e=7HZ6jHSTbIQ0ENmL5dERFFkmSebMBPNsha3AfEmT0T31&p=mm_23868633_0_0"
	}, {
		title : "MacBook高透屏幕膜",
		tkurl : "http://s.click.taobao.com/t_8?e=7HZ6jHSTbIQwYXx%2F7gwoBlaf0logJlRAMgmyhj2TJy5BqQ%3D%3D&p=mm_23868633_0_0"
	}, {
		title : "",
		tkurl : ""
	}, {
		title : "",
		tkurl : ""
	}, {
		title : "",
		tkurl : ""
	} ],
	android : [ {
		title : "baidu",
		tkurl : "http://www.baidu.com"
	} ],
	DSTL : [ {
		title : "163",
		tkurl : "http://www.163.com"
	} ]
};

function showAcc($appleC, $androidC, $DSTLC) {
	console.log($appleC.html());
	var apple = acc.apple;
	var android = acc.android;
	var DSTL = acc.DSTL;
	for ( var i in apple) {
		var a = $('<a target="_blank"></a>');
		a.attr("href", apple[i].tkurl);
		a.attr("title", apple[i].title);
		a.text(apple[i].title);
		$appleC.append(a);
	}
	for ( var i in android) {
		var a = $('<a target="_blank"></a>');
		a.attr("href", android[i].tkurl);
		a.attr("title", android[i].title);
		a.text(android[i].title);
		$androidC.append(a);
	}
	for ( var i in DSTL) {
		var a = $('<a target="_blank"></a>');
		a.attr("href", DSTL[i].tkurl);
		a.attr("title", DSTL[i].title);
		a.text(DSTL[i].title);
		$DSTLC.append(a);
	}
}