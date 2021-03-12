import request from './request.js';

// 查询全部证书
export function getAllList() {
	return request({
		url: 'tourist/listCertificate'
	})
}
// 验证登录
export function getLogin(userName, passWord) {
	return request({
		url: 'admin/login',
		data: {
			userName,
			passWord
		}
	})
}
// 查询模块
export function getModuleList() {
	return request({
		url: 'admin/findModule'
	})
}
