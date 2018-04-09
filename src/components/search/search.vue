<template>
	<div class="search">
		<div class="search-box-wrapper">
			<search-box ref="searchBox" @query="onQueryChange"></search-box>
		</div>
		<scroll class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper" :data="shortCut">
			<div class="shortcut">
				<div class="hot-key">
					<h1 class="title">热门搜索</h1>
					<ul>
						<li v-for="item in hotSearch" class="item" @click="addQuery(item.k)">
							<span>{{item.k}}</span>
						</li>
					</ul>
				</div>
				<div class="search-history" v-show="searchHistory.length">
		            <h1 class="title">
		              <span class="text">搜索历史</span>
		              <span class="clear" @click="clear">
		                <i class="icon-clear" ></i>
		              </span>
		            </h1>
		            <search-list :searches="searchHistory" @delete="deleteSearchHistory" @select="addQuery"></search-list>
	            </div>
			</div>
		</scroll>
		<div class="search-result" v-show="query" ref="searchResult">
			<suggest :query="query" :showSinger="showSinger" ref="suggest" @beforescroll="scrollStart" @select="save"></suggest>
		</div>
		<confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
		<router-view></router-view>
	</div>
</template>

<script>
	import Scroll from '@/base/scroll/scroll'
	import SearchBox from '@/base/search-box/search-box'
	import { getHotSearch } from '@/api/search'
	import { ERR_OK } from '@/api/config'
	import Suggest from '@/components/suggest/suggest'
	import {playListMixin,searchMixin} from '@/common/js/mixin'
	import {mapActions,mapGetters} from 'vuex'
	import SearchList from '@/base/search-list/search-list'
	import Confirm from '@/base/confirm/confirm'
	import storage from 'good-storage'

	export default {
		mixins:[playListMixin,searchMixin],
		data() {
			return {
				hotSearch: [],
				query: '',
				showSinger:true
			}
		},
		created() {
			this._getHotSearch()
		},
		computed:{
			shortCut(){
				return this.hotSearch.concat(this.searchHistory)
			},
			...mapGetters(['searchHistory'])
		},
		methods: {
			
			clear(){
				this.$refs.confirm.show()
			},
			clearSearchHistory(){
				this.clearSearchHistory()
				
			},
			handleMixin(playList){
				const bottom=playList.length>0?'60px':''
				this.$refs.searchResult.style.bottom=bottom
				this.$refs.suggest.refresh()
				
				this.$refs.shortcutWrapper.$el.style.bottom=bottom
				this.$refs.shortcutWrapper.refresh()
				
			},
			
			_getHotSearch() {
				getHotSearch().then((res) => {
					if(res.code === ERR_OK) {
						this.hotSearch = res.data.hotkey.length > 10 ? res.data.hotkey.slice(0, 10) : res.data.hotkey
					}
				})
			},
			...mapActions([
				"clearSearchHistory"
				
			])
		},
		watch:{
			query(newVal){
				if(!newVal){
					setTimeout(()=>{
						this.$refs.shortcutWrapper.refresh()
					},20)
					
				}
			}
		},
		components: {
			SearchBox,
			Suggest,
			SearchList,
			Confirm,
			Scroll
		}
	}
</script>

<style lang="scss" scoped="">
	@import '../../common/sass/variable';
	@import '../../common/sass/mixin';
	@import '../../common/sass/icon.css';
	.search {
		.search-box-wrapper {
			margin: 20px
		}
		.shortcut-wrapper {
			position: fixed;
			top: 178px;
			bottom: 0;
			width: 100%;
			overflow:hidden;
			.shortcut {
				overflow: hidden;
				.hot-key {
					margin: 0 20px 20px 20px;
					.title {
						margin-bottom: 20px;
						font-size: $font-size-medium;
						color: $color-text-l;
					}
					.item {
						display: inline-block;
						padding: 5px 10px;
						margin: 0 20px 10px 0;
						border-radius: 6px;
						background: $color-highlight-background;
						font-size: $font-size-medium;
						color: $color-text-d;
					}
				}
				.search-history {
					position: relative;
					margin: 0 20px;
					.title {
						display: flex;
						align-items: center;
						height: 40px;
						font-size: $font-size-medium;
						color: $color-text-l;
						.text {
							flex: 1;
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
			}
		}
		.search-result {
			position: fixed;
			width: 100%;
			top: 178px;
			bottom: 0;
		}
	}
</style>