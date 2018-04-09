<template>
	<div class="rank" ref="rank">
		<scroll class="toplist" ref="toplist">
			<ul>
				<li class="item" v-for="item in rankList" @click="selectRank(item)">
					<div class="icon">
						<img :src="item.picUrl" alt="" width='100' height='100' />
					</div>
					<ul class="songlist">
						<li class="song" v-for="song in item.songList">
							<span>{{song.songname}}-</span>
							<span>{{song.singername}}</span>
						</li>
					</ul>
				</li>
			</ul>

		</scroll>
		<router-view></router-view>
	</div>

</template>

<script>
	import Scroll from '@/base/scroll/scroll'
	import { getRankList } from '@/api/rank'
	import { ERR_OK } from '@/api/config'
	import { playListMixin } from '@/common/js/mixin'
	import { mapMutations } from 'vuex'
	export default {
		mixins:[playListMixin],
		data() {
			return {
				rankList: []
			}
		},
		computed:{
			
		},
		created() {
			this._getRankList()
		},
		methods: {
			selectRank(item){
				this.$router.push({
					path:`/rank/${item.id}`
				})
				this.setRank(item)
			},
			handleMixin(playList){
				if(playList.length>0){
					const bottom='60px'
					this.$refs.rank.style.bottom=bottom
					this.$refs.toplist.refresh()
					
				}
			},
			_getRankList() {
				getRankList().then((res) => {
					if(res.code === ERR_OK) {
						this.rankList = res.data.topList
					}
				})

			},
			...mapMutations({
				setRank:'SET_RANK'
			})
		},
		components: {
			Scroll
		}
	}
</script>

<style lang="scss" scoped="">
	@import '../../common/sass/variable';
	@import '../../common/sass/mixin';
	.rank {
		position: fixed;
		;
		width: 100%;
		top: 88px;
		bottom: 0;
		.toplist {
			height: 100%;
			overflow: hidden;
			.item {
				display: flex;
				margin: 0 20px;
				padding-top: 20px;
				height: 100px;
				&:last-child {
					padding-bottom: 20px;
				}
				.icon {
					flex: 0 0 100px;
					width: 100px;
					height: 100px;
				}
				.songlist {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 0 20px;
					height: 100px;
					overflow: hidden;
					background: $color-highlight-background;
					color: $color-text-d;
					font-size: $font-size-small;
					.song {
						@include no-wrap();
						line-height: 26px;
					}
				}
			}
		}
		.loading-container {
			position: absolute;
			width: 100%;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>