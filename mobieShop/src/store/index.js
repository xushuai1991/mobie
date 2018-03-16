import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import userinfo from './modules/userinfo.js'
import templateData from './template/templateData.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userinfo,
    templateData
  }
})