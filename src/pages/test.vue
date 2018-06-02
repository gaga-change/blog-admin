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
		// console.log(SimpleMDE)
		// const simplemde = new Simplemde({ element:  })
		var simplemde = new SimpleMDE({ element: this.$refs['markdown'] });
	}
}
</script>
