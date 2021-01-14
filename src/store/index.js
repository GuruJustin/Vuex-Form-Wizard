import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    successed: null,
    wizardForm: {
      job : null,
      companyName : null,
      interested: null,
      benefit : null,
      firstName: null, 
      lastName: null, 
      emailAddress: null, 
      phoneNumber: null,
      preferLang: null,
      country: null, 
      state: null, 
      address1: null, 
      address2: null,
      city: null,
      zipCode: null,
      message : null,
      reCaptcha : null,
      receive : null
    },
    isNextable : false,
    currentTab: 0,
    failedCount : 0,
    countries : [
        'United state',
        'United kingdom',
        'German',
        'Italy'
    ],
    abbrCountry: {
        'United state' : 'US',
        'United kingdom' : 'UK' ,
        'German' : 'GM' ,
        'Italy' : 'IT'
    },
    regions : {
        US : ['New York', 'Pensilvenia', "California"],
        UK : ['York', 'Wilton'] ,
        GM : ['Berlin', 'Guitenburg'],
        IT : ['Roma' , 'Maro']
    }
  },
  getters : {
    getSuccessed: state => state.successed,
    getFailedCount: state => state.failedCount,
    getIsNextable : state => state.isNextable,
    getWizardForm : state => state.wizardForm,
    getCountries : state => state.countries,
    getabbrCountry : state => state.abbrCountry,
    getRegions : state => state.regions
  },
  mutations: {
    //set current Step
    SET_WIZARD_FORM (state, payload) {
      state.wizardForm = Object.assign(payload.formData);
    },
    SET_IS_NEXTABLE (state, payload){
      state.isNextable = payload.nextable
    },
    SET_SUCCESSED (state, payload) {
      state.successed = payload.successed
    },
    SET_FAILED_COUNT (state, payload){
      state.failedCount = payload.failedCount
    },
    SET_COUNTRIES (state, payload){
      state.countries = payload.countries
    },
    SET_ABBR_COUNTRIES (state, payload){
      state.abbrCountry = payload.abbrCountry
    },
    SET_REGIONS (state, payload){
      state.regions = payload.regions
    },
  },
  actions: {
    //actions of setting current Step
    setIsNextable (context, payload) {
      context.commit('SET_IS_NEXTABLE', payload)
    },
    setSuccessed(context, payload){
      context.commit('SET_SUCCESSED', payload)
    },
    setFailedCount(context, payload){
      context.commit('SET_FAILED_COUNT', payload)
    },
    setWizardForm (context, payload) {
      context.commit('SET_WIZARD_FORM', payload)
    },
    sendAllData(context, payload) {
      //send to the backend api and get the repsonse
      let response = 201
      // console.log(this.state.wizardForm);
      if(response != 200) {
        context.commit('setFailedCount', {failedCount : this.state.failedCount + 1})
        return 'failed'
      } else {
        context.commit('setSuccessed', {successed : 'success'})
        return 'success'
      }
    },
    setCountries (context, payload){
      context.commit('SET_COUNTRIES', payload)
    },
    setabbrCountry (context, payload){
      context.commit('SET_ABBR_COUNTRIES', payload)
    },

    // This is the function which should be replaced by API call
    getRegionsofCountry (context, payload){
      //you should add some api calling functions this action Method
      return new Promise((resolve, reject) => {
        resolve(this.state.regions[this.state.abbrCountry[payload.country]])
      })
    },
  }
})
export default store;