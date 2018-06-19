<template>
    <div>
        <div class="top-header">
            <router-link to="/">喜欢JS的无名小站</router-link>
            <el-button class="logout" type="text" @click="logout">退出</el-button>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        logout() {
            this.$API.logout().then(() => {
                this.$router.replace({name: 'UserLogin'})
            })
        }
    }
}
</script>

<style lang="less">
.top-header {
    text-align: left;
    a {
        display: inline-block;
        color: #333;
        text-decoration: none;
        &:hover {
            color: #409eff;
        }
    }
}
.logout {
    height: 60px;
    float: right;
}
</style>
