<template>
    <scroll class="suggest" ref="suggest":data="result" :pullup="pullup" @scrollToEnd="searchMore" @beforescroll="beforescroll" :beforeScroll="beforeScroll">
		<ul class="suggest-list">
			<li class="suggest-item" v-for="item in result" @click="selectItem(item)">
				<div class="icon">
					<i :class="suggestClass(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="suggestText(item)"></p>
				</div>
			</li>
			<loading v-show="hasMore&&result.length" title="数据加载中"></loading>
		</ul>
		<div v-show="!hasMore && !result.length" class="no-result-wrapper">
	      <no-result ></no-result>
	   </div>
	</scroll>
	
</template>

<script>
	import Scroll from '@/base/scroll/scroll'
	import Loading from '@/base/loading/loading'
	import {getSearch} from '@/api/search'
	import {ERR_OK} from '@/api/config'
	import {createSong} from '@/common/js/song'
	import {mapMutations,mapActions} from 'vuex'
	import Singer from '@/common/js/singer'
	import NoResult from '@/base/no-result/no-result'
	
	const TYPE_SINGER="singer"
	
	const PAGE_SIZE=20
	export default {
		props:{
			query:{
				type:String,
				default:'',
				
			},
			showSinger:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				result:[],
				page:1,
				pullup:true,
				hasMore:true,
				beforeScroll:true
			}
		},
		methods:{
			beforescroll(){
				this.$emit("beforescroll")
			},
			refresh(){
				this.$refs.suggest.refresh()
			},
			selectItem(item){
				if(item.singerid){
					const singer=new Singer({
						id: item.singermid,
                        name: item.singername,
                        singerId:item.singerid
					})
					this.setSinger(singer)
					this.$router.push({
						path:`/search/${item.singerid}`
					})
				}else{
					this.insertSong(item)
				}
				this.$emit("select")
			},
			search(){
				this.hasMore=true
				this.page=1
				this.$refs.suggest.scrollTo(0, 0)
				if(!this.query){
					this.$router.push({
						path:'/search'
					})
					return 
				}
				getSearch(this.query,this.page,this.showSinger).then((res)=>{
					if(res.code===ERR_OK){
						this.result=this._inintal(res.data)
						this._checkMore(res.data)
					}
				})
			},
			searchMore(){
				if(!this.hasMore){
					return 
				}
				this.page++
				getSearch(this.query,this.page,this.showSinger).then((res)=>{
					if(res.code===ERR_OK){
						this.result=this.result.concat(this._normalizeSongs(res.data.song.list))
						this._checkMore(res.data)
					}
				})
			},
			suggestClass(item){
				return item.type===TYPE_SINGER? 'icon-mine':'icon-music'
			},
			suggestText(item){
				return item.type===TYPE_SINGER? item.singername:`${item.name}-${item.singer}`
			},
			_inintal(res){
				let ret=[];
				if(res.zhida.singerid&&res.zhida.singername){
					ret.push({...res.zhida,...{type:TYPE_SINGER}})
				}	
				if(res.song&&res.song.list){
					ret=ret.concat(this._normalizeSongs(res.song.list))
				}
				return ret
			},
			_normalizeSongs(list){
				let ret=[]
				list.forEach((musicData)=>{
					if (musicData.songid && musicData.albummid) {
			            ret.push(createSong(musicData))
			        }
				})
				return ret
			},
			_checkMore(data){
				if(!data.song.list.length ||(data.song.curnum+data.song.curpage*PAGE_SIZE>data.song.totalnum)){
					this.hasMore=false
				}
			},
			...mapMutations({
				setSinger:'SET_SINGER'
			}),
			...mapActions([
				"insertSong"
			])
			
		},
		components:{
			Scroll,
			Loading,
			NoResult
		},
		watch:{
			query(newVal){
				this.search()
			}
		}
	}
</script>

<style lang="scss" scoped="">
	@import "../../common/sass/variable";
	@import "../../common/sass/mixin";
	@import "../../common/sass/icon.css";
	.suggest {
		height: 100%;
		overflow: hidden;
		.suggest-list {
			padding: 0 30px;
			.suggest-item {
				display: flex;
				align-items: center;
				padding-bottom: 20px;
				.icon {
					flex: 0 0 30px;
					width: 30px;
					[class^="icon-"] {
						font-size: 14px;
						color: $color-text-d;
					}
				}
				.name {
					flex: 1;
					font-size: $font-size-medium;
					color: $color-text-d;
					overflow: hidden;
					.text {
						@include no-wrap();
					}
				}
			}
		}
		.loadingContainer,.no-result-wrapper{
			 position: absolute;
		      width: 100%;
		      top: 50%;
		      transform: translateY(-50%);
		}
	}
</style>