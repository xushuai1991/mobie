/* eslint-disable */
import axios from 'axios'


const state = {
    templateDATA:''
};
const mutations = {
    getTemplateData(state, data){
        state.templateDATA = data
    }
}
const actions = {
    // 正常登录
    // login({ commit, state},parm) {
    //     // console.log(parm);
    //     axios.post('/api/customer/account/login?mobile='+parm.mobile+'&&password='+parm.password,{})
    //     .then(function(response){
    //         commit({
    //             type: 'login',
    //             data: response.data
    //         });
    //     })
    //     .catch(function(response){
    //         console.log(response);
    //     })
    // },
}
export default {
    state,
    mutations,
    actions
}