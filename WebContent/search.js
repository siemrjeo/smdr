$(document).ready(function() {
	var search = store.get("search");
	var cid = search.cid, keyword = search.keyword;
	var visitor_user = store.get("visitor_user");
	var area = visitor_user.loginCountry;
	var dParam = searchCommissionNum_desc(keyword, cid);
	searchPrice_asc(keyword, dParam.CommissionNum_desc_cid, dParam.averagePrice);
	searchCredit_desc(keyword, dParam.CommissionNum_desc_cid);
	searchArea(keyword, dParam.CommissionNum_desc_cid, area);
	searchPrice_range(dParam.CommissionNum_desc_cid, dParam.averagePrice);
	setTip();
});

function searchCommissionNum_desc(keyword, cid) {
	// console.log(keyword);
	// console.log(cid);
	var dParam = {
		CommissionNum_desc_cid : cid,
		averagePrice : 0
	};
	$.ajax({
		async : false,
		url : "buyer/searchCommissionNum_desc",
		data : {
			"keyword" : keyword,
			"cid" : cid
		},
		success : function(data, textStatus) {
			// console.log(data.is_success);
			if (data.is_success) {
				dParam.averagePrice = data.averagePrice;
				if (cid == 0) {
					dParam.CommissionNum_desc_cid = data.CommissionNum_desc_cid;
				}
			} else {
				toErrorPage(data.sub_msg);
			}
		},
		complete : function(event, XMLHttpRequest, ajaxOptions) {
			showItemDiv($.parseJSON(event.responseText), 1, 6);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toErrorPage("服务器错误：" + errorThrown);
		}
	});
	return dParam;
}

function searchCredit_desc(keyword, cid) {
	$.ajax({
		url : "buyer/searchCredit_desc",
		data : {
			"keyword" : keyword,
			"cid" : cid
		},
		success : function(data, textStatus) {
			if (data.is_success) {
			} else {
				toErrorPage(data.sub_msg);
			}
		},
		complete : function(event, XMLHttpRequest, textStatus) {
			showItemDiv($.parseJSON(event.responseText), 19, 24);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toErrorPage("服务器错误：" + errorThrown);
		}
	});
}

function searchArea(keyword, cid, area) {
	$.ajax({
		url : "buyer/searchArea",
		data : {
			"keyword" : keyword,
			"cid" : cid,
			"area" : area
		},
		success : function(data, textStatus) {
			if (data.is_success) {
			} else {
				toErrorPage(data.sub_msg);
			}
		},
		complete : function(event, XMLHttpRequest, textStatus) {
			showItemDiv($.parseJSON(event.responseText), 25, 30);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toErrorPage("服务器错误：" + errorThrown);
		}
	});
}

function searchPrice_range(cid, averagePrice) {
	$.ajax({
		url : "buyer/searchPrice_range",
		data : {
			"cid" : cid,
			"averagePrice" : averagePrice
		},
		success : function(data, textStatus) {
			if (data.is_success) {
				// console.log(data);
			} else {
				toErrorPage(data.sub_msg);
			}
		},
		complete : function(event, XMLHttpRequest, textStatus) {
			showItemDiv($.parseJSON(event.responseText), 13, 18);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toErrorPage("服务器错误：" + errorThrown);
		}
	});
}

function searchPrice_asc(keyword, cid, averagePrice) {
	$.ajax({
		url : "buyer/searchPrice_asc",
		data : {
			"keyword" : keyword,
			"cid" : cid,
			"averagePrice" : averagePrice
		},
		success : function(data, textStatus) {
			if (data.is_success) {
			} else {
				toErrorPage(data.sub_msg);
			}
		},
		complete : function(event, XMLHttpRequest, textStatus) {
			showItemDiv($.parseJSON(event.responseText), 7, 12);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toErrorPage("服务器错误：" + errorThrown);
		}
	});
}

function drawItemDiv(div) {
	var $div = $(div);
	var item = $div.data("itemInfo");
	// console.log(item);
	$div.find("img:eq(0)").attr("src", item.pic_url_160x160);
	$div.find("img:eq(1)").attr("src", item.scs);
	$div.find("span:eq(0)").text(item.volume);
	$div.find("a:eq(1)").attr("title", item.title);
	$div.find("a:eq(1)").html(item.title);
	$div.find(".priceDiv").text("￥" + item.price);
	$div.find("a").attr("href", item.click_url);
}

function showItemDiv(data, beginDivIndex, endDivIndex) {
	if (data.is_success == true && !$.isEmptyObject(data.taobaoke_items_get_response)) {
		var cndData = data.taobaoke_items_get_response.taobaoke_items.taobaoke_item;
		var gt = beginDivIndex - 2, lt = endDivIndex;
		var selector = gt == -1 ? String.format(":lt(%1)", lt) : String.format(":lt(%1):gt(%2)", lt, gt);
		// console.log(".itemDiv" + selector);
		$(".itemDiv" + selector).each(function(index) {
			// console.log(index);
			var item = cndData[index];
			if ($.isEmptyObject(item)) {
				return false;
			}
			item.pic_url_160x160 = getPicUrl160x160(item.pic_url);
			item.scs = getSCS(item.seller_credit_score);
			$(this).data("itemInfo", item);
			drawItemDiv(this);
		});
	} else {

	}
}

function setTip() {
	$(".itemDiv").on("mouseenter", function(event) {
		var item = $(this).data("itemInfo");
		if ($.isEmptyObject(item)) {
			return true;
		}
		var shopScore = item.shopScore;
		// var traderates = item.traderates;
		// console.log(shopScore);
		// console.log(traderates);
		if ($.isEmptyObject(shopScore)) {
			$.ajax({
				url : "buyer/getShopInfo",
				async : false,
				data : {
					sellerNick : item.nick
				},
				success : function(data, textStatus) {
					// console.log($.toJSON(data));
					if (data.is_success) {
						item.shopScore = data;
						shopScore = data;
					} else {
						return true;
					}
				},
				complete : function(event, XMLHttpRequest, textStatus) {
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					return true;
				}
			});
		}
		// if ($.isEmptyObject(traderates)) {
		// $.ajax({
		// url : "buyer/getTraderates",
		// async : false,
		// data : {
		// num_iid : item.num_iid,
		// sellerNick : item.nick
		// },
		// success : function(data, textStatus) {
		// // console.log($.toJSON(data));
		// if (data.is_success) {
		// item.traderates = data;
		// traderates = data;
		// } else {
		// return true;
		// }
		// },
		// complete : function(event, XMLHttpRequest, textStatus) {
		// },
		// error : function(XMLHttpRequest, textStatus, errorThrown) {
		// return true;
		// }
		// });
		// }
		var score = item.shopScore.shop_get_response.shop;
		$("#tipDiv .shop-rate em:eq(0)").text(score.shop_score.item_score);
		$("#tipDiv .shop-rate em:eq(1)").text(score.shop_score.service_score);
		$("#tipDiv .shop-rate em:eq(2)").text(score.shop_score.delivery_score);
		$("#tipDiv .shop-rate strong:eq(1)").text(score.nick);
		$("#tipDiv .shop-rate div:eq(0) span").text(score.created);
		$("#tipDiv .shop-rate div:eq(1) span").text(item.item_location);
		// if ($.isEmptyObject(item.traderates.traderates_search_response) ||
		// item.traderates.traderates_search_response.total_results == 0) {
		// $("#tipDiv .traderates-info li").attr("title", "");
		// $("#tipDiv .traderates-info li .bn").text("暂无评论");
		// $("#tipDiv .traderates-info li .content").text("");
		// } else {
		// var traderates =
		// item.traderates.traderates_search_response.trade_rates.trade_rate;//
		// 这是一个json数组。
		// for (i in traderates) {
		// var traderate = traderates[i];
		// $(String.format("#tipDiv .traderates-info li:eq(%1)",
		// i)).attr("title", traderate.created);
		// $(String.format("#tipDiv .traderates-info li:eq(%1) .bn",
		// i)).text(traderate.nick + ": ");
		// $(String.format("#tipDiv .traderates-info li:eq(%1) .content",
		// i)).text(traderate.content);
		// }
		// }
		$(this).qtip({
			content : {
				text : $("#tipDiv").html(),
				title : {
					text : "^—^",
					button : true
				}
			},
			position : {
				my : "left top",
				at : "right top",
				viewport : true,
				adjust : {
					x : -20,
					y : 5
				}
			},
			show : {
				event : "mousemove",
				solo : true
			},
			hide : 'unfocus',
			style : {
				classes : "ui-tooltip-light ui-tooltip-shadow ui-tooltip-rounded",
				width : 280
			}
		});
	});
}

function getPicUrl160x160(url) {
	return url + "_160x160.jpg";
}