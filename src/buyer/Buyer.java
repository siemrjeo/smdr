package buyer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;
import base.SmdrBase;

import com.taobao.api.ApiException;
import com.taobao.api.domain.SelectedItem;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.internal.util.TaobaoUtils;
import com.taobao.api.request.ShopGetRequest;
import com.taobao.api.request.TaobaokeItemsConvertRequest;
import com.taobao.api.request.TaobaokeItemsDetailGetRequest;
import com.taobao.api.request.TaobaokeItemsGetRequest;
import com.taobao.api.request.TmallSelectedItemsSearchRequest;
import com.taobao.api.response.ShopGetResponse;
import com.taobao.api.response.TaobaokeItemsConvertResponse;
import com.taobao.api.response.TaobaokeItemsDetailGetResponse;
import com.taobao.api.response.TaobaokeItemsGetResponse;
import com.taobao.api.response.TmallSelectedItemsSearchResponse;

public class Buyer extends SmdrBase {

	public String login() {
		// request = JSONObject.fromObject(getRequestJSON());
		try {
			boolean isVerify = TaobaoUtils.verifyTopResponse(request.getString("top_parameters"),
					request.getString("top_session"), request.getString("top_sign"), request.getString("top_appkey"),
					appSecret);
			Map<String, String> topParams = TaobaoUtils.decodeTopParams(request.getString("top_parameters"));
			response.put("decodeTopParams", topParams);
			if (isVerify) {
				session.put("top_session", request.getString("top_session"));
				// response.put("loginCountry", getLoginCountry());
				// response.put("is_success", isVerify);
			} else {
				response.put("sub_msg", "签名验证失败！");
			}
			response.put("loginCountry", getLoginCountry());
			response.put("is_success", true);
		} catch (IOException e) {
			response.put("sub_msg", e.getMessage());
		}

		return "success";
	}

	// 通过查询item详细信息获取cid
	private long searchCid(List<TaobaokeItem> list) {
		if (list == null) {
			return 0;
		}
		StringBuffer numIids = new StringBuffer();
		for (TaobaokeItem item : list) {
			if (numIids.length() != 0) {
				numIids.append(",");
			}
			numIids.append(item.getNumIid().toString());
		}
		TaobaokeItemsDetailGetRequest tidgRequest = new TaobaokeItemsDetailGetRequest();
		tidgRequest.setFields("cid");
		tidgRequest.setNumIids(numIids.toString());
		tidgRequest.setNick("simerjoe");

		HashMap<Long, Integer> map = new HashMap<Long, Integer>();
		try {
			TaobaokeItemsDetailGetResponse tidgResponse = client.execute(tidgRequest);
			for (TaobaokeItemDetail detail : tidgResponse.getTaobaokeItemDetails()) {
				long cid = detail.getItem().getCid();
				if (map.containsKey(cid)) {
					int value = map.get(cid) + 1;
					map.put(cid, value);
				} else {
					map.put(cid, 0);
				}
			}
		} catch (ApiException e) {
			response.put("sub_msg", "查询cid出错！");
		}
		long rcid = 0;
		int value = 0;
		for (long cid : map.keySet()) {
			int num = map.get(cid);
			if (num >= value) {
				rcid = cid;
			}
		}
		return rcid;
	}

	// 计算平均价格
	private int computeAveragePrice(List<TaobaokeItem> list) {
		if (list == null) {
			return 0;
		}
		double sum = 0;
		for (TaobaokeItem item : list) {
			sum = sum + Double.valueOf(item.getPrice());
		}
		return (int) sum / list.size();
	}

	// 按销量降序
	public String searchCommissionNum_desc() {
		// request = JSONObject.fromObject(getRequestJSON());
		TaobaokeItemsGetRequest tigRequest = new TaobaokeItemsGetRequest();
		tigRequest.setNick("simerjoe");// 设置淘宝客帐号
		if (request.get("cid") != null && request.getLong("cid") != 0) {
			tigRequest.setCid(request.getLong("cid"));
		}
		if (request.get("keyword") != null && !request.getString("keyword").equals("")) {
			tigRequest.setKeyword(request.getString("keyword"));
		}
		tigRequest
				.setFields("num_iid,title,nick,pic_url,price,click_url,commission_num,seller_credit_score,item_location,volume");
		tigRequest.setSort("commissionNum_desc");
		tigRequest.setPageNo(1L);
		tigRequest.setPageSize(6L);
		try {
			TaobaokeItemsGetResponse tigResponse = client.execute(tigRequest);
			if (tigRequest.getCid() == null || tigRequest.getCid() == 0) {
				response.put("CommissionNum_desc_cid", searchCid(tigResponse.getTaobaokeItems()));
			}
			response.put("averagePrice", computeAveragePrice(tigResponse.getTaobaokeItems()));
			// response.put("CommissionNum_desc",
			// JSONObject.fromObject(tigResponse.getBody()));
			response.putAll(JSONObject.fromObject(tigResponse.getBody()));
			response.put("is_success", true);
		} catch (ApiException e) {
			response.put("sub_msg", e.getMessage());
		}

		return "success";
	}

	// 按卖家信誉降序
	public String searchCredit_desc() {
		// request = JSONObject.fromObject(getRequestJSON());
		TaobaokeItemsGetRequest tigRequest = new TaobaokeItemsGetRequest();
		tigRequest.setNick("simerjoe");// 设置淘宝客帐号
		if (request.get("cid") != null && request.getLong("cid") != 0) {
			tigRequest.setCid(request.getLong("cid"));
		}
		if (request.get("keyword") != null && !request.getString("keyword").equals("")) {
			tigRequest.setKeyword(request.getString("keyword"));
		}
		tigRequest
				.setFields("num_iid,title,nick,pic_url,price,click_url,commission_num,seller_credit_score,item_location,volume");
		tigRequest.setSort("credit_desc");
		tigRequest.setPageNo(1L);
		tigRequest.setPageSize(6L);
		try {
			TaobaokeItemsGetResponse tigResponse = client.execute(tigRequest);
			// response.put("Credit_desc", tigResponse.getBody());
			response.putAll(JSONObject.fromObject(tigResponse.getBody()));
			response.put("is_success", true);
		} catch (ApiException e) {
			response.put("sub_msg", e.getMessage());
		}

		return "success";
	}

	// 搜索同城卖家，区域信息不能为空
	public String searchArea() {
		// request = JSONObject.fromObject(getRequestJSON());
		if (request.get("area") == null) {// 无区域信息，返回
			response.put("sub_msg", "无区域信息！");
			return "success";
		}
		TaobaokeItemsGetRequest tigRequest = new TaobaokeItemsGetRequest();
		tigRequest.setNick("simerjoe");// 设置淘宝客帐号
		if (request.get("cid") != null && request.getLong("cid") != 0) {
			tigRequest.setCid(request.getLong("cid"));
		}
		if (request.get("keyword") != null && !request.getString("keyword").equals("")) {
			tigRequest.setKeyword(request.getString("keyword"));
		}
		tigRequest
				.setFields("num_iid,title,nick,pic_url,price,click_url,commission_num,seller_credit_score,item_location,volume");
		tigRequest.setSort("commissionNum_desc");
		tigRequest.setArea(request.getString("area"));
		tigRequest.setPageNo(1L);
		tigRequest.setPageSize(6L);
		try {
			TaobaokeItemsGetResponse tigResponse = client.execute(tigRequest);
			// response.put("Area", tigResponse.getBody());
			response.putAll(JSONObject.fromObject(tigResponse.getBody()));
			response.put("is_success", true);
		} catch (ApiException e) {
			response.put("sub_msg", e.getMessage());
		}
		return "success";
	}

	// 按价格升序，相似价位推荐,必须要cid参数,keyword,和价位参数
	public String searchPrice_asc() {
		String startPrice = "0.00", endPrice = "0.00";
		if (request.get("averagePrice") == null || request.getDouble("averagePrice") == 0) {// 无价格信息，返回
			response.put("sub_msg", "无价格范围信息！");
			return "success";
		} else {
			double averagePrice = request.getDouble("averagePrice");
			startPrice = String.valueOf((int) (averagePrice * 0.8));
			endPrice = String.valueOf((int) (averagePrice * 1.2));
		}
		if (request.get("cid") == null || request.getLong("cid") == 0) {// 无宝贝类别信息，返回
			response.put("sub_msg", "无cid！");
			return "success";
		}
		TaobaokeItemsGetRequest tigRequest = new TaobaokeItemsGetRequest();
		tigRequest.setNick("simerjoe");// 设置淘宝客帐号
		tigRequest.setCid(request.getLong("cid"));
		if (request.get("keyword") == null || request.getString("keyword").equals("")) {
			response.put("sub_msg", "keyword为空，无法按价格降序！");
			return "success";
		} else {
			tigRequest.setKeyword(request.getString("keyword"));
		}
		tigRequest
				.setFields("num_iid,title,nick,pic_url,price,click_url,commission_num,seller_credit_score,item_location,volume");
		tigRequest.setSort("price_asc");
		tigRequest.setStartPrice(startPrice);
		tigRequest.setEndPrice(endPrice);
		tigRequest.setPageNo(1L);
		tigRequest.setPageSize(6L);
		try {
			TaobaokeItemsGetResponse tigResponse = client.execute(tigRequest);
			response.putAll(JSONObject.fromObject(tigResponse.getBody()));
			response.put("is_success", true);
		} catch (ApiException e) {
			response.put("sub_msg", e.getMessage());
		}
		return "success";
	}

	// 同类商品，相似价位推荐,必须要cid参数和价位参数
	public String searchPrice_range() {
		// request = JSONObject.fromObject(getRequestJSON());
		String startPrice = "0.00", endPrice = "0.00";
		if (request.get("averagePrice") == null || request.getDouble("averagePrice") == 0) {// 无价格信息，返回
			response.put("sub_msg", "无价格范围信息！");
			return "success";
		} else {
			double averagePrice = request.getDouble("averagePrice");
			startPrice = String.valueOf((int) (averagePrice * 0.8));
			endPrice = String.valueOf((int) (averagePrice * 1.2));
		}
		if (request.get("cid") == null || request.getLong("cid") == 0) {// 无宝贝类别信息，返回
			response.put("sub_msg", "无cid！");
			return "success";
		}
		TaobaokeItemsGetRequest tigRequest = new TaobaokeItemsGetRequest();
		tigRequest.setNick("simerjoe");// 设置淘宝客帐号
		tigRequest.setCid(request.getLong("cid"));
		tigRequest
				.setFields("num_iid,title,nick,pic_url,price,click_url,commission_num,seller_credit_score,item_location,volume");
		tigRequest.setSort("commissionNum_desc");
		tigRequest.setStartPrice(startPrice);
		tigRequest.setEndPrice(endPrice);
		tigRequest.setPageNo(1L);
		tigRequest.setPageSize(6L);
		try {
			TaobaokeItemsGetResponse tigResponse = client.execute(tigRequest);
			// response.put("Price_range", tigResponse.getBody());
			response.putAll(JSONObject.fromObject(tigResponse.getBody()));
			response.put("is_success", true);
		} catch (ApiException e) {
			response.put("sub_msg", e.getMessage());
		}
		return "success";
	}

	// 以下2个方法调取次数较多，需优化
	// 获取店铺动态评分，需要sellerNick
	public String getShopInfo() {
		ShopGetRequest sgRequest = new ShopGetRequest();
		sgRequest.setNick(request.getString("sellerNick"));
		sgRequest.setFields("nick,title,created,shop_score");

		try {
			ShopGetResponse sgResponse = client.execute(sgRequest);
			response.putAll(JSONObject.fromObject(sgResponse.getBody()));
			response.put("is_success", true);
		} catch (ApiException e) {
			response.put("sub_msg", e.getMessage());
		}

		return "success";
	}

	// 获取用户评价，需要item iid,sellerNick
	// taobao.traderates.search6月6日作废，等待后续aobao.traderates.get接口
	public String getTraderates() {
		// TraderatesSearchRequest tsRequest = new TraderatesSearchRequest();
		// tsRequest.setNumIid(request.getLong("num_iid"));
		// tsRequest.setSellerNick(request.getString("sellerNick"));
		// tsRequest.setPageNo(1L);
		// tsRequest.setPageSize(10L);
		// try {
		// TraderatesSearchResponse tsResponse = client.execute(tsRequest);
		// response.putAll(TaobaoUtils.parseJson(tsResponse.getBody()));//
		// 注意：评论有特殊字符，用淘宝sdk自带类转换
		// response.put("is_success", true);
		// } catch (ApiException e) {
		// response.put("sub_msg", e.getMessage());
		// }
		return "success";
	}

	// 保存点击记录（未完成）
	public String saveRecord() {
		// request = JSONObject.fromObject(getRequestJSON());
		System.out.println(request);
		response.put("is_success", true);
		return "success";
	}

	public String dynamicAD() {
		// 专业单反50003773,手机1512，平板电脑50019780，台式机50018222
		if (application.get("adUpdateDate") == null
				|| !application.get("adUpdateDate").equals(Calendar.getInstance().get(Calendar.DAY_OF_MONTH))) {
			getTmallData(50003773l);
			getTmallData(1512L);
			getTmallData(50019780L);
			getTmallData(50018222L);
		}
		response.put("50003773", application.get("50003773"));
		response.put("1512", application.get("1512"));
		response.put("50019780", application.get("50019780"));
		response.put("50018222", application.get("50018222"));
		response.put("is_success", true);
		return "success";
	}

	private void getTmallData(long cid) {
		TmallSelectedItemsSearchRequest tsisRequest = new TmallSelectedItemsSearchRequest();
		tsisRequest.setCid(cid);
		try {
			// 获取天猫精选
			TmallSelectedItemsSearchResponse tsisResponse = client.execute(tsisRequest);
			List<String> cidList = new ArrayList<String>();
			for (SelectedItem item : tsisResponse.getItemList().subList(0, 40)) {
				cidList.add(item.getNumIid().toString());
			}
			String iids = cidList.toString().replace('[', ' ').replace(']', ' ');

			// 获取天猫特价--待开放
			// 淘宝客店铺转换
			// TaobaokeShopsConvertRequest tscRequest = new
			// TaobaokeShopsConvertRequest();
			// tscRequest.setNick("simerjoe");
			// tscRequest.setFields("");
			// tscRequest.setSids("");//最大10个
			// TaobaokeShopsConvertResponse tscResponse =
			// client.execute(tscRequest);
			// 淘宝客商品转换
			TaobaokeItemsConvertRequest ticRequest = new TaobaokeItemsConvertRequest();
			ticRequest.setNick("simerjoe");
			ticRequest.setFields("nick,title,price,click_url,shop_click_url,pic_url,commission_rate,volume");
			ticRequest.setNumIids(iids);// 最大40个
			TaobaokeItemsConvertResponse ticResponse = client.execute(ticRequest);
			application.put(String.valueOf(cid), ticResponse.getTaobaokeItems());
			application.put("adUpdateDate", Calendar.getInstance().get(Calendar.DAY_OF_MONTH));
			System.out.println("application add");
		} catch (ApiException e) {
			response.put("sub_msg", e.getMessage());
		}

	}
}
