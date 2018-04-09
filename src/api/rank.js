import jsonp from "@/common/js/jsonp"
import { commonParams, options } from "@/api/config"
import axios from 'axios'

//获取排行榜列表
export function getRankList() {
	const url = '/api/getRankList'

	const data = Object.assign({}, commonParams, {
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		_: 1522389895212
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

//获取排行榜详情列表
export function getTopList(topid) {
	const url = '/api/getTopList'

	const data = Object.assign({}, commonParams, {
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		tpl: 3,
		page: 'detail',
		type: 'top',
		topid,
		_: 1522394220003
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

