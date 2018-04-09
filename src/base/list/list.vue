<template>
	<scroll class="list" :singerList="singerList" ref="list" :probe-type="probeType" :listenScroll="listenScroll" @scroll="scroll">
		<ul>
			<li v-for="item in singerList" class="item item-hook" ref="listWrapper">
				<h3 class="title">{{item.title}}</h3>
				<ul>
					<li v-for="singer in item.items" class="singer" @click="selectItem(singer)">
						<img v-lazy="singer.avatar" alt="" class="singer-img" />
						<span class="name">{{singer.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortCut" @touchstart.stop.prevent="onshortCutTouchStart" @touchmove.stop.prevent="onshortCutTouchMove" refs="shortCut">
			<ul>
				<li v-for="(item,index) in shortList" class="code" :data-index="index" :class="{current:index===currentIndex}">{{item}}</li>
			</ul>
		</div>
		<div ref="fixed" class="list-fixed" v-show="fixedTitle">{{fixedTitle}}</div>
		<div class="loading-container" v-if="!singerList.length">
			<loading title="歌手列表加载中..."></loading>
		</div>
	</scroll>
</template>

<script>
	import Scroll from "@/base/scroll/scroll"
	import Loading from "@/base/loading/loading"
	import {getData} from "@/common/js/dom"
	
	const ANCHOR_HEIGHT =18
	export default{
		props:{
			singerList:{
				type:Array,
				default:[]
			}
		},
		data(){
			return {
				scrollY: -1,
                currentIndex: 0,
                diff: -1
			}
		},
		created(){
			this.touch={}
			this.heightList=[]
			this.listenScroll=true
			this.probeType=3
		},
		computed:{
			shortList(){
				return this.singerList.map((list)=>{
					return list.title.substr(0,1)
				})
			},
			fixedTitle(){
				if(this.scrollY>0){
					return ""
				}
				return this.singerList[this.currentIndex]?this.singerList[this.currentIndex].title:""
			}
			
		},
		methods:{
			selectItem(item){
				this.$emit('select', item)
			},
			refresh(){
				this.$refs.list.refresh()
			},
			_caculateHieght(){
				let height=0
				let singerEl=document.getElementsByClassName("item-hook");
				this.heightList.push(height);
				for(let i=0;i<singerEl.length;i++){
					height+=singerEl[i].clientHeight;
					this.heightList.push(height);
				}
			},
			onshortCutTouchStart(e){
				let anchorIndex=getData(e.target,"index")
				let firstTouch=e.touches[0]
				this.touch.y1=firstTouch.pageY
				this.touch.anchorIndex=anchorIndex
				this._scrollTo(anchorIndex)
				
			},
			onshortCutTouchMove(e){
				let firstTouch=e.touches[0]
				this.touch.y2=firstTouch.pageY
				let topMux=Math.floor((this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT )
				let anchorIndex=parseInt(this.touch.anchorIndex)+topMux
				this._scrollTo(anchorIndex)
			},
			scroll(pos){
				
				this.scrollY=pos.y
			},
			_scrollTo(index){
				if (!index && index !== 0) {
		          return
		        }
				if (index < 0) {
		          index = 0
		        } else if (index > this.heightList.length - 2) {
		          index = this.heightList.length - 2
		        }
				this.scrollY = -this.heightList[index]
				this.$refs.list.scrollToElement(this.$refs.listWrapper[index],0)
			}
			
		},
		components:{
			Scroll,
			Loading
		},
		watch:{
			singerList(){
				setTimeout(()=>{
					this._caculateHieght()
				},20)
				
			},
			scrollY(newY){
				const listHeight = this.heightList
				//当滚动到顶部
				if(newY>0){
					this.currentIndex =0
					return 
				}
				//中间滚动
				for(let i=0;i<listHeight.length-1;i++){
					let height1=listHeight[i]
					let height2=listHeight[i+1]
					if(-newY>=height1&&-newY<height2){
						this.currentIndex = i
						this.diff=height2+newY
						return 
					}
				}
				//当滚动到底部，且-newY大于最后一个元素的上限
				this.currentIndex =listHeight-2
			},
			diff(newVal){
				let fixedTop=(newVal>0&&newVal<30)? newVal-30:0
				if(this.fixedTop===fixedTop){
					return
				}
				this.fixedTop=fixedTop
				this.$refs.fixed.style.transform=`translate3d(0,${this.fixedTop}px,0)`
				
			}
		}
	}
</script>

<style lang="scss" scoped="">
@import "../../common/sass/variable";
.list{
	position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .item{
    	padding-bottom: 30px;
    	.title{
    		height: 30px;
	        line-height: 30px;
	        padding-left: 20px;
	        font-size: $font-size-small;
	        color: $color-text-l;
	        background: $color-highlight-background;
    	}
    	.singer{
    		display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            .singer-img{
            	width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name{
            	margin-left: 20px;
		        color: $color-text-l;
		        font-size: $font-size-medium;
            }
    	}
    }
    .list-shortCut{
    	position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;
      .code{
      	padding: 3px;
        line-height: 1;
        color: $color-text-l;
        font-size: $font-size-small;
        &.current{
        	 color: $color-theme;
        }
         
      }
    }
    .list-fixed{
    	position:absolute;
    	top:0;
    	left:0;
    	width:100%;
    	height: 30px;
	    line-height: 30px;
	    padding-left: 20px;
	    font-size: $font-size-small;
	    color: $color-text-l;
	    background: $color-highlight-background;
    }
    .loading-container{
    	position: absolute;
	    width: 100%;
	    top: 50%;
	    transform: translateY(-50%);
    }
}
   
</style>