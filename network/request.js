const baseURL = 'http://47.106.192.202:1030/';

export default function request(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header:options.header || {},
			success: resolve,
			fail: reject
		})
	})
}
