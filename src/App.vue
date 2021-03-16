<template>
    <div id="app">
        <lin-header />
        <router-view></router-view>
        <lin-footer />
    </div>
</template>

<script>

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import axios from 'axios';
import { 
    ValidationProvider, 
    ValidationObserver ,
    extend,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import zh from 'vee-validate/dist/locale/zh_CN';

for (const rule in rules) {
    extend(rule, {
        ...rules[rule],
        message: zh.messages[rule]
    })    
}


export default {
    name: 'app',
    data(){
        return {
            captcha: '', // 图形验证码
            name: '',
            password: '', 
            code: '',
        }
    },
    components: {
        ValidationProvider,
        ValidationObserver,
        'lin-header': Header, 
        'lin-footer':Footer
    },
    mounted(){
        // 获取验证码
        this.hanleClickGetCaptcha();
    }, 
    methods: {
        async hanleClickGetCaptcha(){
            const res = await axios.get('http://localhost:3000/getCaptcha');
            console.log(res)
            if(res.status===200){
                const { code, data } = res.data;
                if(code === 200) this.captcha = data;
            }
        }
    }
}
</script>

<style lang="scss">
@import 'assets/layui/css/layui.css';
@import 'assets/css/global.css';
@import 'assets/layui/css/modules/layer/default/layer.css'
</style>
