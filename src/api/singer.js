import jsonp from "@/common/js/jsonp"
import { commonParams, options } from "@/api/config"
import axios from 'axios'

export function getSingerList() {
	const url = '/api/getSingerList'

	const data = Object.assign({}, commonParams, {
		channel: "singer",
		page: "list",
		key: "all_all_all",
		pagesize: 100,
		pagenum: 1,
		loginUin: 0,
		hostUin: 0,
		platform: "yqq",
		needNewCode: 0
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function getSingerDetail(singerId) {
	const url = '/api/getSingerDetail'

	const data = Object.assign({}, commonParams, {
		singerid:singerId,
		uin: 0,
		platform: "h5page",
		needNewCode: 1,
		order: "listen",
		from: "h5",
		num: 100,
		begin: 0,
		_: 1521787899219
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}


export function getSongWord(songId) {
	const url = '/api/getSongWord'

	const data = Object.assign({}, commonParams, {
		nobase64: 1,
		musicid:songId,
		loginUin: 0,
		hostUin: 0,
		platform: 'yqq',
		needNewCode: 0
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}