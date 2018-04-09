<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" class="recommend-content" :data="recommendLists">
			<div>
				<div class="slider-wrapper" v-if="recommends.length">
					<slider>
						<div v-for="recommend in recommends" >
							<a :href="recommend.linkUrl">
								<img class="needsclick" :src="recommend.picUrl" @load="loadImg" alt="" width="100%"/>
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-tilte">热门歌单推荐</h1>
					<ul>
						<li @click="selectItem(item)" class="list-item" v-for="item in recommendLists">
							<img class="item-img" v-lazy="item.imgurl" alt="" />
							<div class="item-detail">
								<span class="name">{{item.creator.name}}</span>
								<p class="text">{{item.dissname}}</p>
							</div>
						</li>
					</ul>
					
			    </div>
			    
			</div>
			<div class="loading-container">
				<loading title="推荐列表加载中..." v-if="!recommendLists.length"></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
	
</template>

<script>
	import { getRecommend, getDiscList } from "@/api/recommend";
	import { ERR_OK } from "@/api/config";
	import Slider from "@/base/slider/slider";
	import Scroll from "@/base/scroll/scroll";
	import Loading from "@/base/loading/loading";
    import {playListMixin} from '@/common/js/mixin'
    import {mapMutations} from 'vuex'
    
	export default {
		mixins:[playListMixin],
		data() {
			return {
				recommends: [],
				recommendLists: []
			}
		},
		created() {
			this._getRecommend();
			setTimeout(()=>{
				this._getLists();
			},1000)
			
		},
		methods: {
			handleMixin(playList){
				const bottom=playList.length>0?'60px':''
				this.$refs.recommend.style.bottom=bottom
				this.$refs.scroll.refresh()
				
			},
			selectItem(item){
				this.$router.push({
					path:`/recommend/${item.dissid}`
				})
				this.setDisic(item)
			},
			loadImg() {
		        if (!this.checkloaded) {
		          this.checkloaded = true
		          this.$refs.scroll.refresh()
		        }
		   },
			_getRecommend() {
				getRecommend().then((res) => {
					if(res.code === ERR_OK) {
						this.recommends = res.data.slider;
					}
				})
			},
			_getLists() {
				getDiscList().then((res) => {
					if(res.code === ERR_OK) {
						this.recommendLists = res.data.list;
					}
				})
			},
			
		   ...mapMutations({
		   	 setDisic:'SET_DISIC'
		   })
		},
		components: {
			Slider,
			Scroll,
			Loading
		}
	};
</script>

<style lang="scss" scoped="">
	@import "../../common/sass/variable";
	.recommend {
		position: fixed;
		top: 88px;
		bottom: 0;
		width: 100%;
		.recommend-content {
			width: 100%;
			height: 100%;
			overflow: hidden;
			.slider-wrapper {
				position: relative;
				width: 100%;
				overflow: hidden;
			}
		}
		.recommend-list {
			.list-tilte {
				height: 65px;
				line-height: 65px;
				text-align: center;
				font-size: $font-size-medium;
				color: $color-theme;
			}
			.list-item {
				display: flex;
				box-sizing: border-box;
                align-items: center;
                padding: 0 20px 20px 20px;
				.item-img {
					flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
				}
				.item-detail {
					color: #fff;
					.name {
						display: block;
						margin: 5px 0 12px 0;
						font-size: 12px;
					}
					.text {
						color: #666;
					}
				}
			}
		}
		.loading-container{
			position:absolute;
			width:100%;
			top:50%;
			transform: translateY(-50%);
		}
	}
</style>