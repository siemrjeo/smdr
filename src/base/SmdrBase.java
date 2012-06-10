package base;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.taobao.api.DefaultTaobaoClient;

public class SmdrBase {
	protected JSONObject request = new JSONObject();
	protected JSONObject response = new JSONObject();
	protected DefaultTaobaoClient client;
	protected Map<String, Object> session = ServletActionContext.getContext()
			.getSession();
	protected String serverUrl = "http://gw.api.taobao.com/router/rest"; // 正式环境
	protected String appKey = "12530804";
	protected String appSecret = "01c9e811ccb701c48a52b692b0e33afe";
	protected String PID = "mm_23868633_0_0";

	public SmdrBase() {
		Map map = ServletActionContext.getRequest().getParameterMap();
		for (Object key : map.keySet()) {
			this.request.put(key, ((String[]) map.get(key))[0]);
		}
		// System.out.println(this.request);
		client = new DefaultTaobaoClient(serverUrl, appKey, appSecret);
		response.put("is_success", false);
		response.put("sub_msg", "");
	}

	public JSONObject getResponse() {
		return response;
	}

	protected String getRemortIP() {
		HttpServletRequest hsRequest = ServletActionContext.getRequest();
		return hsRequest.getHeader("x-forwarded-for") == null ? hsRequest
				.getRemoteAddr() : hsRequest.getHeader("x-forwarded-for");
	}

	protected String getLoginCountry() {
		QQWry w = new QQWry();
		try {
			String patch = ServletActionContext.getServletContext()
					.getRealPath("/") + "qqwry.dat";
			w.setPath(patch);
			w.seek(getRemortIP());
		} catch (Exception e) {
			e.printStackTrace();
		}

		return w.getCountry();
	}
}
