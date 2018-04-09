<template>
	<transition name="list-fade">
		<div class="playlist" v-show="flag" @click="hide">
			<div class="list-wrapper" @click.stop>
				<div class="list-header">
					<h1 class="title">
					<i class="icon" :class="getMode" @click="changeMode"></i>
					<span class="text" v-html="getModeText"></span>
					<span class="clear" @click="clearList"><i class="icon-clear" ></i></span>
				</h1>
				</div>
				<scroll class="list-content" :data="sequenceList" ref="listContent">
					<transition-group ref="list" name="list" tag="ul">
						<li class="item" :key="item.id" v-for="(item,index) in sequenceList" ref="listItem">
							<i class="current" :class="getCurrentIcon(item)"></i>
							<span class="text" @click="selectItem(item,index)">{{item.name}}</span>
							<span class="like">
							    <i class="icon-not-favorite"></i>
						    </span>
							<span class="delete" @click.stop="deleteOne(item)">
							<i class="icon-delete" ></i>
						</span>
						</li>
					</transition-group>
				</scroll>
				<div class="list-operate">
					<div class="add" @click="add">
						<i class="icon-add"></i>
						<span class="text">添加歌曲到队列</span>
					</div>
				</div>
				<div class="list-close" @click="hide">
					<span>关闭</span>
				</div>
			</div>
			<add-song ref="addSong"></add-song>
		</div>
	</transition>
</template>

<script>
	import Scroll from "@/base/scroll/scroll"
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	import {playMode} from '@/common/js/config'
	import {playerMixin} from '@/common/js/mixin'
	import AddSong from '@/components/add-song/add-song'
	
	
	export default {
		mixins:[playerMixin],
		data(){
			return {
				flag:false
			}
		},
		computed:{
			getModeText(){
				let text
				if(this.mode===playMode.sequence){
					text="顺序播放"
				}else if(this.mode===playMode.loop){
					text="单曲循环"
				}else{
					text="随机播放"
				}
				return text
			}
		},
		methods:{
			show(){
				this.flag=true
				setTimeout(()=>{
					this.$refs.listContent.refresh()
				},20)
			},
			hide(){
				this.flag=false
			},
			selectItem(item,index){
				if(this.mode===playMode.random){
					index=this.playList.findIndex((song)=>{
						return item.id===song.id
					})
				}
				const playing=true
				this.setCurrentIndex(index)
				this.setPlaying(playing)
			},
			getCurrentIcon(item){
				if(item.id===this.currentSong.id){
					return "icon-play"
				}
			},
			scrollToCurrent(current){
				const index = this.sequenceList.findIndex((song) => {
		          return current.id === song.id
		       })
				this.$refs.listContent.scrollToElement(this.$refs.listItem[index],300)
			},
			deleteOne(item){
				this.deleSong(item)
				if(!this.playList.length){
					this.flag=false
				}
				
			},
			clearList(){
				this.deleteSongList()
				this.flag=false
			},
			add(){
				this.$refs.addSong.show()
			},
			...mapActions([
				"deleSong",
				"deleteSongList"
			])
		},
		components:{
			Scroll,
			AddSong
		},
		watch:{
			currentSong(newSong,oldSong){
				if(!this.flag||newSong.id===oldSong.id||!newSong.id){
					return 
				}
				setTimeout(()=>{
					this.scrollToCurrent(newSong)
				},20)
				
			}
		}
		

	}
</script>

<style lang="scss" scoped="">
	@import "../../common/sass/variable";
	@import "../../common/sass/mixin";
	@import "../../common/sass/icon.css";
	.playlist {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 200;
		background-color: $color-background-d;
		&.list-fade-enter-active,
		&.list-fade-leave-active {
			transition: opacity 0.3s;
			.list-wrapper {
				transition: all 0.3s
			}
		}
		&.list-fade-enter,
		&.list-fade-leave-to {
			opacity: 0;
			.list-wrapper {
				transform: translate3d(0, 100%, 0);
			}
		}
		.list-wrapper {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: $color-highlight-background;
			.list-header {
				position: relative;
				padding: 20px 30px 10px 20px;
				.title {
					display: flex;
					align-items: center;
					.icon {
						margin-right: 10px;
						font-size: 30px;
						color: $color-theme-d;
					}
					.text {
						flex: 1;
						font-size: $font-size-medium;
						color: $color-text-l;
					}
					.clear {
						@include extend-click();
						.icon-clear {
							font-size: $font-size-medium;
							color: $color-text-d;
						}
					}
				}
			}
			.list-content {
				max-height: 240px;
				overflow: hidden;
				.item {
					display: flex;
					align-items: center;
					height: 40px;
					padding: 0 30px 0 20px;
					overflow: hidden;
					&.list-enter-active,
					&.list-leave-active {
						transition: all 0.1s;
					}
					&.list-enter,
					&.list-leave-to {
						height: 0;
					}
					.current {
						flex: 0 0 20px;
						width: 20px;
						font-size: $font-size-small;
						color: $color-theme-d;
					}
					.text {
						flex: 1;
						@include no-wrap();
						font-size: $font-size-medium;
						color: $color-text-d;
					}
					.like {
						@include extend-click();
						margin-right: 15px;
						font-size: $font-size-small;
						color: $color-theme;
						.icon-favorite {
							color: $color-sub-theme;
						}
					}
					.delete {
						@include extend-click();
						font-size: $font-size-small;
						color: $color-theme;
					}
				}
			}
			.list-operate {
				width: 140px;
				margin: 20px auto 30px auto;
				.add {
					display: flex;
					align-items: center;
					padding: 8px 16px;
					border: 1px solid $color-text-l;
					border-radius: 100px;
					color: $color-text-l;
					.icon-add {
						margin-right: 5px;
						font-size: $font-size-small-s;
					}
					.text {
						font-size: $font-size-small;
					}
				}
			}
			.list-close {
				text-align: center;
				line-height: 50px;
				background: $color-background;
				font-size: $font-size-medium-x;
				color: $color-text-l;
			}
		}
	}
</style>