<template>
    <div id="register">
        <div class="content">
            <div class="menu">
                <h2>注册</h2>
                <div class="column">
                    <input type="text" placeholder="账号">
                </div>
                <div class="column">
                    <input type="password" placeholder="密码">
                </div>
                <div class="column">
                    <div class="btn">注册</div>
                </div>
                <p>已有账号？
                    <router-link to="/login">前往登录</router-link>
                </p>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>


<style lang="scss" scope>
@import "../assets/css/scss/mixin.scss";
html,body{
    width: 100%;
    height: 100%;
}
#register{
    width: 100%;
    height: 100%;
    background: url(../../static/image/07104711.png);
    background-size: 100% 100%;
    .content{
        width: 100%;
        height: 100%;
        background: rgba(85,10,142, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        // 10,14,142
        .menu{
            width: 80%;
            height: 16rem;
            padding: .853rem ;
            background: rgba(255,255,355, 0.3);
            border-radius: .213rem;
            box-shadow: 0 0 20px #fff;
            h2{
                color: #d2d2d2;
                text-align: center;
                margin-bottom: 2rem;
                font-size: $font_big_s;
                letter-spacing: 2px;
            }
            .column{
                margin-bottom: .853rem;
                input{
                    height: 1.7rem;
                    border-radius: 1.7rem;
                    border: none;
                    background: none;
                    box-shadow: 0 0 2px #fff;
                    font-size: $font_little;
                    padding: 0 .853rem;
                    width: calc(100% - .853rem*2);
                    color: #999;
                }
                ::-webkit-input-placeholder {
                    color: #999;
                }
                .btn{
                    color: rgb(49, 49, 49);
                    background: #fff;
                    padding: .2rem .8rem;
                    border-radius: 1rem;
                    display: inline-block;
                    font-size: $font_little;
                }
            }
            p{
                font-size: $font_little;
                color: #d0d0d0;
                a{
                    color: #d0d0d0;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
