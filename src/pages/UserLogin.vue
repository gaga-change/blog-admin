<template>
    <div @click="login">123</div>
</template>
<script>
export default {
    data() {
        return {
            query: this.$route.query
        }
    },
    methods: {
        login() {
            let retpath = decodeURIComponent(this.query.retpath)
            console.log(retpath)
            this.$router.push({name: 'PostCreate'})
        }
    }
}
</script>
