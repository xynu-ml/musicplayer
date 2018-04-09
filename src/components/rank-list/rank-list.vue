<template>
	<div class="rank-list">
		<music-list :rank="rankFlag" :songs="songs" :title="rank.topTitle" :bgImg="rank.picUrl"></music-list>
	</div>
</template>

<script>
	import MusicList from '@/components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getTopList} from '@/api/rank'
	import {ERR_OK} from '@/api/config'
	import {createSong} from '@/common/js/song'
	export default{
		data(){
			return{
				songs:[],
				rankFlag:true
			}
		},
		created(){
			this._getTopList()
		},
		computed:{
			...mapGetters(["rank"])
		},
		methods:{
			_getTopList(){
				if(!this.rank.id){
					this.$router.push({
						path:'/rank'
					})
					return 
				}
				getTopList(this.rank.id).then((res)=>{
					this.songs=this._normalizeSongs(res.songlist)
				})
				
				
			},
			_normalizeSongs(list){
				let ret=[];
				list.forEach((musicData)=>{
					musicData=musicData.data
					if (musicData.songid && musicData.albummid) {
			            ret.push(createSong(musicData))
			        }
				})
				return ret
			}
		},
		components:{
			MusicList
		},
	}
</script>

<style>
</style>