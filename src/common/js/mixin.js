import {mapGetters,mapMutations,mapActions} from 'vuex'
import { playMode } from '@/common/js/config'
import { randomSort } from '@/common/js/util'
export const playListMixin={
	computed:{
		...mapGetters(['playList'])
	},
	mounted(){
		this.handleMixin(this.playList)
	},
	activated(){
		this.handleMixin(this.playList)
	},
	methods:{
		handleMixin(playList){
			throw new Error('component must implement handlePlaylist method')
		}
	},
	watch:{
		playList(newVla){
			this.handleMixin(this.playList)
		},
		...mapGetters([
				'fullScreen',
				'playList',
				'currentSong',
				'playing',
				'currentIndex',
				'mode',
				'sequenceList'
			])
	}
}

export const playerMixin={
	computed:{
		getMode() {
			return this.mode === playMode.sequence ? "icon-sequence" : this.mode === playMode.loop ? "icon-loop" : "icon-random"
		},
		...mapGetters([
			'fullScreen',
			'playList',
			'currentSong',
			'playing',
			'currentIndex',
			'mode',
			'sequenceList'
		])
	},
	methods:{
		changeMode() {
			const mode = (this.mode + 1) % 3
			this.setPlayMode(mode)
			let list = null
			if(this.mode === playMode.random) {
				list = randomSort(this.sequenceList)
			} else {
				list = this.sequenceList
			}
			this.resetCurrentIndex(list)
			this.setPlayList(list)
		},
		resetCurrentIndex(list) {
			let index = list.findIndex((item) => {
				return this.currentSong.id === item.id
			})
			this.setCurrentIndex(index)
		},
		...mapMutations({
			setFullScreen: 'SET_FULLSCREEN',
			setPlaying: 'SET_PLAYING',
			setCurrentIndex: 'SET_CURRENT_INDEX',
			setPlayMode: 'SET_PLAY_MODE',
			setPlayList: 'SET_PLAYLIST',
			
		})
		
	}
}

export const searchMixin={
	methods:{
		addQuery(query) {
			this.$refs.searchBox.setQuery(query)
		},
		onQueryChange(query) {
			this.query = query
		},
		save(){
			this.saveSearch(this.query)
		},
		scrollStart(){
			this.$refs.searchBox.blur()
		},
		...mapActions([
			"deleteSearchHistory",
			"saveSearch"
			
		])
	}
}



