<template>
	<div >
		<textarea ref="markdown"></textarea>
	</div>
</template>
<script>
import SimpleMDE from 'simplemde'
export default {
	data() {
		return {

		}
	},
	mounted() {
		
		var simplemde = new SimpleMDE({ element: this.$refs['markdown'] });
	}
}
</script>
<style lang="less">
.editor-toolbar.fullscreen {
	z-index: 1600;
}
.CodeMirror-fullscreen {
	z-index: 1600;
}
</style>

