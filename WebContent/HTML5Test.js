function save1() {
	// baiduStorage.setItem({key:"a",value:$("#text1").val()});
	store.set("a", $("#text1").val());
	var testUndefinde = {
		a : {
			aa : "真",
			bb : "对象"
		},
		b : "b"
	};
	alert($.isEmptyObject(testUndefinde.b));
}

function save2() {
	// baiduStorage.setItem({key:"b",value:{"json":"他妈的json呢！","奶奶的boolean呢":true}});
	var b = {
		"json" : "他妈的json呢！",
		"奶奶的boolean呢" : true
	};
	store.set("b", b);
}

function read1() {
	// alert(baiduStorage.getItem({key:"a"}));
	alert(store.get("a"));
}

function read2() {
	// alert(baiduStorage.getItem({key:"b"}));
	alert(store.get("b"));
	// alert(store.getall());
}