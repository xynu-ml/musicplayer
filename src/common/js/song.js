import {getSongWord} from '@/api/song'
import {ERR_OK} from "@/api/config"
import {Base64} from "js-base64"
export default class Song {
	
	constructor({
		id,
		mid,
		singer,
		name,
		album,
		duration,
		image,
		url
	}) {
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
	}
	getSongWord(){
		if(this.lyric){
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve,reject)=>{
			getSongWord(this.id).then((res) => {
			if(res.code === ERR_OK) {
				resolve(res.lyric);
		
			}else{
				reject(" no lyric")
			}
		})
		})
	    
				
	}
}








export function createSong(musicData){
	return new Song({
		id: musicData.songid,
	    mid: musicData.songmid,
	    singer: filterSinger(musicData.singer),
	    name: musicData.songname,
	    album: musicData.albumname,
	    duration: musicData.interval,
	    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
	    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=3039583610&vkey=5F445F64D3FAC53BA7620D920C7E35E6AF463EAA2642EA664BBFC0C1211FDCE9FD71BCA080E54B0BAB1AE22F38A323CEE35894B0D8CE9893&uin=0&fromtag=38`
	})
}
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
