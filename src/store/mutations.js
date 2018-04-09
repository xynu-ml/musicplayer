import * as types from './mutation-types'

const mutations = {
	[types.SET_SINGER](state, singer) {
		state.singer = singer;
	},
	[types.SET_PLAYING](state, flag) {
		state.playing = flag;
	},
	[types.SET_FULLSCREEN](state, flag) {
		state.fullScreen = flag;
	},
	[types.SET_PLAYLIST](state, list) {
		state.playList = list;
	},
	[types.SET_SEQUENCELIST](state, list) {
		state.sequenceList = list;
	},
	[types.SET_PLAY_MODE](state, mode) {
	    state.mode = mode
	},
	[types.SET_CURRENT_INDEX](state, index) {
		state.currentIndex = index;
	},
	[types.SET_DISIC](state, disic) {
		state.disic = disic;
	},
	[types.SET_RANK](state, rank) {
		state.rank = rank;
	},
	[types.SET_SEARCH_HISTORY](state,history) {
		state.searchHistory =history;
	},
	[types.SET_PLAY_HISTORY](state,history) {
		state.playHistory =history;
	}
}

export default mutations