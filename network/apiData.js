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

//模块管理

//// 查询模块
export function getModuleList() {
	return request({
		url: 'admin/findModule'
	})
}

////添加模块
export function addModule(name) {
	return request({
		url: 'admin/addModule',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		data: {
			name
		}
	})
}
////删除模块
export function deleteModule(id) {
	return request({
		// header: {'content-type': 'application/json'},
		method: "DELETE",
		url: 'admin/delModuleById/{id}',
		data: {
			id
		}
	})
}
//修改模块
export function modifyModule(id, name) {
	return request({
		url: 'admin/updModuleById/{id}',
		data: {
			id,
			name
		}
	})
}
