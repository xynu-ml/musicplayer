import jsonp from "@/common/js/jsonp"
import { commonParams, options } from "@/api/config"
import axios from 'axios'


//获取歌词
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