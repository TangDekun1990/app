<template>
	<div>
		<div  class="sub-comment" v-for="subComment in item">
            <p>
                <div data-v-f3bf5228="" class="v-tooltip-container" style="z-index: 0;">
                    <div class="v-tooltip-content">
                        <a href="/u/becfd1bf1231" target="_blank" v-html="subComment.us_name"></a>：</div>
                </div>
                <span v-html="subComment.rev_content">

               	</span>
            </p>
            <div class="sub-tool-group">
                <span v-html="subComment.rev_time"></span>
                <a class="">
                    <i class="iconfont ic-comment"></i>
                    <span></span>
                </a>
                <a class="report">
                    <span>举报</span>
                </a>
            </div>
        </div>
		
	</div>
</template>

<script>
	
	export default{
		data(){
			return{
				item : []
			}
		}
	}
</script>