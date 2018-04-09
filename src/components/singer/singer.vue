<template>
	<div class="singer" ref="singer">
		<list-view :singerList="singerList" @select="selectSinger" ref="list"></list-view>
		<router-view></router-view>
	</div>
	
</template>

<script>
	import store from '@/store'
	import {getSingerList} from "@/api/singer"
	import {ERR_OK} from "@/api/config"
	import Singer from "@/common/js/singer"
	import listView from "@/base/list/list"
	import {mapMutations} from 'vuex'
    import {playListMixin} from '@/common/js/mixin'
	
	
	const HOT_SINGER_LEN = 10
    const HOT_NAME = '热门'
	export default{
	    mixins:[playListMixin],
		data(){
			return {
				singerList:[]
			}
		},
		created(){
			this._getSingerList()
		},
		methods:{
			selectSinger(item) {
		        this.$router.push({
		          path: `/singer/${item.id}`
		        })
		        this.setSinger(item)
		    },
		    handleMixin(playList){
		    	const bottom=playList.length>0?'60px':''
				this.$refs.singer.style.bottom=bottom
                this.$refs.list.refresh()
				
		    },
			_getSingerList(){
				getSingerList().then((res) => {
					if(res.code === ERR_OK) {
						this.singerList=this._normalizeSinger(res.data.list);
				
					}
				})
			},
			_normalizeSinger(list){
				let map={
					hot:{
						title:"热门",
						items:[]
					}
				}
				list.forEach((item,index)=>{
					if(index<HOT_SINGER_LEN){
						map.hot.items.push(new Singer({
							id:item.Fsinger_mid,
							name:item.Fsinger_name,
							singerId:item.Fsinger_id
						}))
					}
					const key=item.Findex
					if(!map[key]){
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push(new Singer({
						id:item.Fsinger_mid,
						name:item.Fsinger_name,
						singerId:item.Fsinger_id
					}))
				})
				//为了得到有序列表，我们需要处理map
				let ret=[];
				let hot=[];
				for(let key in map){
					if(map[key].title.match(/[a-zA-Z]/)){
						ret.push(map[key])
					}else if(map[key].title===HOT_NAME){
						hot.push(map[key])
						
					}
				}
				ret.sort((a,b)=>{
					return a.title.charCodeAt(0)-b.title.charCodeAt(0)
					
				})
				return hot.concat(ret)
			},
			...mapMutations({
		        setSinger: 'SET_SINGER'
		      })
		},
		
		components:{
			listView
		}
	}
</script>

<style lang="scss" scoped="">
.singer{
	position:fixed;
	top:88px;
	bottom:0;
	width:100%;
	overflow: hidden;
}
</style>