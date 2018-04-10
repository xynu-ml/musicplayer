var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

// 获得推荐歌单
apiRoutes.get('/getDiscList', function(req, res) {
	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
	axios.get(url, {
		headers: {
			referer: 'https://c.y.qq.com/',
			host: 'c.y.qq.com'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data);
	}).catch((e) => {
		console.log(e);
	});
});
// 获取歌单详情
apiRoutes.get('/getDiscDetail', function(req, res) {
	const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
	axios.get(url, {
		headers: {
			referer: 'https://c.y.qq.com/',
			host: 'c.y.qq.com'
		},
		params: req.query
	}).then((response) => {
		let ret = response.data;
		if(typeof ret === 'string') {
			const reg = /^\w+\(({.+})\)$/;
			const matches = ret.match(reg);
			if(matches) {
				ret = JSON.parse(matches[1]);
			}
		}
		res.json(ret);
	}).catch((e) => {
		console.log(e);
	});
});
//获取歌手列表
apiRoutes.get('/getSingerList', function(req, res) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/portal/singer_list.html'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data);
	}).catch((e) => {
		console.log(e);
	});
});
//获取歌手歌单
apiRoutes.get('/getSingerDetail', function(req, res) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
	axios.get(url, {
		headers: {
			origin: 'https://y.qq.com',
			referer: 'https://y.qq.com/w/singer.html?ADTAG=newyqq.singer&source=ydetail&singerId=5062'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data);
	}).catch((e) => {
		console.log(e);
	});
});

// 获得歌词
apiRoutes.get('/getSongWord', function(req, res) {
	const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg';
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/n/yqq/song/003v4UL61IYlTY.html'
		},
		params: req.query
	}).then((response) => {
		var ret = response.data
		if(typeof ret === 'string') {
			var reg = /^\w+\(({[^()]+})\)$/
			var matches = ret.match(reg)
			if(matches) {
				ret = JSON.parse(matches[1])
			}
		}
		res.json(ret);
	}).catch((e) => {
		console.log(e);
	});
});

//获取排行榜列表
apiRoutes.get('/getRankList', function(req, res) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
	axios.get(url, {
		headers: {
			origin: 'https://y.qq.com',
			referer: 'https://m.y.qq.com/'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data);
	}).catch((e) => {
		console.log(e);
	});
});

//获取排行榜列表详情列表
apiRoutes.get('/getTopList', function(req, res) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
	axios.get(url, {
		headers: {
			origin: 'https://y.qq.com',
			referer: 'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=4&type=top'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data);
	}).catch((e) => {
		console.log(e);
	});
});
//获取热门搜索
apiRoutes.get('/hotSearch', function(req, res) {
	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
	axios.get(url, {
		headers: {
			origin: 'https://m.y.qq.com',
			referer: 'https://m.y.qq.com/'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data);
	}).catch((e) => {
		console.log(e);
	});
});

//搜索列表
apiRoutes.get('/search', function(req, res) {
	const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
	axios.get(url, {
		headers: {
			origin: 'https://m.y.qq.com',
			referer: 'https://m.y.qq.com/'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data);
	}).catch((e) => {
		console.log(e);
	});
});

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
	if(err) {
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
})