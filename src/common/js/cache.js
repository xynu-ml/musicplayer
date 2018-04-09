import storage from 'good-storage' 
 const SEARCH_KEY="_search_"
 const SEARCH_MAX_LEN=15
 
 const PLAY_KEY="_play_"
 const PLAY_MAX_LEN=50
 
function insertHistoty(arr,val,compare,max){
	let index=arr.findIndex(compare)
	if(index===0){
		return 
	}
	if(index>0){
		arr.splice(index,1)
	}
	arr.unshift(val)
	if(max&&arr.length>max){
		arr.pop()
	}
}

function deleteStorage(arr,compare){
	const index=arr.findIndex(compare)
	if(index>-1){
		arr.splice(index,1)
	}
	
}


export function searchHistory(query){
	let searchArr=storage.get(SEARCH_KEY,[]) 
	insertHistoty(searchArr,query,(item)=>{
		return  item===query
	},SEARCH_MAX_LEN)
	storage.set(SEARCH_KEY,searchArr)
	return searchArr
}


export function loadSearch(){
	return storage.get(SEARCH_KEY,[])
}

export  function deleteSearch(query){
    let searchArr=storage.get(SEARCH_KEY,[]) 
	deleteStorage(searchArr,(item)=>{
		return item===query
	})
	storage.set(SEARCH_KEY,searchArr)
	return searchArr
	
}

export function clearSearch(){
	storage.remove(SEARCH_KEY)
	return []
}

export function  playHistory(song){
	let songs=storage.get(PLAY_KEY,[]) 
	insertHistoty(songs,song,(item)=>{
		return  item.id===song.id
	},PLAY_MAX_LEN)
	storage.set(PLAY_KEY,songs)
	return songs
}

export function loadPlay(){
	return storage.get(PLAY_KEY,[])
}
