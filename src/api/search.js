import jsonp from "@/common/js/jsonp"
import { commonParams, options } from "@/api/config"
import axios from 'axios'

export function getHotSearch() {
	const url = '/api/hotSearch'

	const data = Object.assign({}, commonParams, {
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		_: 1522638506970
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}


export function getSearch(query,page,zhida) {
	const url = '/api/search'

	const data = Object.assign({}, commonParams, {
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		w: query,
		zhidaqu: 1,
		catZhida: zhida?1:0,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		perpage: 20,
		n: 20,
		p: page,
		remoteplace: 'txt.mqq.all',
		_: 1522638506970
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

