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
// 按条件查询证书
export function getSearch(name) {
	return request({
		url: 'tourist/listCertificateByName',
		data: {
			name
		}
	})
}
export function getSelect(name) {
	return request({
		url: 'tourist/listCertificateBySelect ',
		data: {
			name
		}
	})
}
//证书详情
export function getCertificateDetail(id) {
	return request({
		url: 'tourist/getCertificateById/' + id,

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
		url: 'admin/delModuleById/' + id,
		method: 'DELETE',
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		data: {
			id
		},
	})
}
//修改模块
export function modifyModule(id, name) {
	return request({
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		url: 'admin/updModuleById/' + id,
		method: 'PUT',
		data: {
			id,
			name
		}
	})
}

//添加证书
export function addCertificate(detail) {
	return request({
		url: 'admin/addCertificate',
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		method: 'POST',
		data: {
			...detail
			// awards,//奖项string
			// fraction,//分值number
			// levelld,//级别number
			// moduled,//模块（id）number
			// name,//string
			// picture,//图片地址
			// reason,//原因（驳回状态）
			// status,//状态（true/false）
			// file//图片
		}
	})
}
