<template>
	<transition name="slide">
		<music-list :songs="songs" :title="title" :bg-img="bgImg"></music-list>
	</transition>
	
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from '@/api/singer'
	import {ERR_OK} from '@/api/config'
	import musicList from '@/components/music-list/music-list'
	import {createSong} from '@/common/js/song'
	export default{
		data(){
			return {
				songs:[]
			}
		},
		computed:{
			title(){
				return this.singer.name
			},
			bgImg(){
				return this.singer.avatar
			},
			 ...mapGetters(['singer'])
		},
		created(){
			this._getDetail()
		},
		methods:{
			_getDetail(){
				if(!this.singer.singerId){
					this.$router.back()
					return 
				}
				getSingerDetail(this.singer.singerId).then((res) => {
		          if (res.code === ERR_OK) {
		            this.songs = this._normalizeSongs(res.data.list)
		          }
                })
			},
			_normalizeSongs(list){
				let ret=[];
				list.forEach((item)=>{
					let musicData=item.musicData
					if (musicData.songid && musicData.albummid) {
			            ret.push(createSong(musicData))
			        }
				})
				return ret
			}
		},
		components:{
			musicList
		}
	}
</script>

<style lang="scss" scoped="">
@import "../../common/sass/variable.scss";

.slide-enter-active,.slide-leave-active{
	transition: all 0.3s;
}
.slide-enter,.slide-leave-active{
    transform: translate3d(100%, 0, 0);
}
</style>