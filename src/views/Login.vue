<template>
    <div id="login">
        <div class="content">
            <div class="menu">
                <h2>登录</h2>
                <div class="column">
                     <!-- :value="tel" @input="$emit('update:tel', $event.target.value)" -->
                    <input type="text" v-model="tel" placeholder="账号">
                </div>
                <div class="column">
                     <!-- :value="password" @input="$emit('update:password', $event.target.value)" -->
                    <input type="password" v-model="password" placeholder="密码">
                </div>
                <div class="column">
                    <div class="btn" @click="login">登录</div>
                </div>
                <p>没有账号？
                    <router-link to="/register">立马注册</router-link>
                </p>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent,ref } from 'vue'
import { useRouter } from "vue-router";
import { loginFun } from '../api/interface/login'
import { Toast } from 'vant'
import { setStroage } from '../utils/regular'

export default defineComponent({
    setup() {
        var tel = ref<string>('18281911054')
        var password = ref<string>('19960905ainichia')

        const router = useRouter()
        
        async function login(){
            const res = await loginFun({phone:tel.value,password:password.value})
            let data = res.data
            if(data.code != 200){
                if(data.code == 400){
                    Toast('数据错误，请查看手机格式是否正确')
                }else{
                    Toast(data.msg)
                }
            }else{
                data.profile['token'] = data.token
                data.profile['loginType'] = data.loginType
                data.profile['cookie'] = data.cookie
                setStroage('user',JSON.stringify(data.profile))
                router.push('/')
            }
        }

        return {
            login,
            tel,
            password
        }
    },
})
</script>


<style lang="scss" scope>
@import "../assets/css/scss/mixin.scss";
html,body{
    width: 100%;
    height: 100%;
}
#login{
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
