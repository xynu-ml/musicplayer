<template>
	<transition name="slide">
		 <music-list :songs="songs" :title="disic.dissname" :bgImg="disic.imgurl"> </music-list>
	</transition>
	  
	</div>
</template>

<script>
	import MusicList from '@/components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getDiscDetail} from '@/api/recommend'
	import {ERR_OK} from '@/api/config'
	import {createSong} from '@/common/js/song'
	
	export default{
		data(){
			return{
				songs:[]
			}
		},
		computed:{
			...mapGetters(['disic'])
		},
		mounted(){
			this._getDiscDetail()
		},
		methods:{
			_getDiscDetail(){
				if(!this.disic.dissid){
					this.$router.push({
						path:'/recommend'
					})
					return 
				}
				getDiscDetail(this.disic.dissid).then((res) => {
		          if (res.code === ERR_OK) {
		            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
		          }
		        })
			},
			_normalizeSongs(list){
				let ret=[];
				list.forEach((musicData)=>{
					if (musicData.songid && musicData.albummid) {
			            ret.push(createSong(musicData))
			        }
				})
				return ret
			}
		},
		components:{
			MusicList
		}
	}
</script>

<style lang="scss" scoped="">
.slide-enter-active, .slide-leave-active{
	transition: all 0.3s;
}
.slide-enter, .slide-leave-to{
  	transform: translate3d(100%, 0, 0);
}
	   
</style>