import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
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
    wizardStep : 0,
  },
  getters : {
    getCurrentTab: state => state.currentTab,
    getSuccessed: state => state.successed,
    getFailedCount: state => state.failedCount,
    getIsNextable : state => state.isNextable,
    getWizardStep : state => state.wizardStep,
    getWizardForm : state => state.wizardForm
  },
  mutations: {
    //set current Step
    setWizardStep (state, payload) {
      state.wizardStep = payload.stepNumber;
    },
    setWizardForm (state, payload) {
      state.wizardForm = Object.assigned(payload.formData);
    },
    setIsNextable (state, payload){
      state.isNextable = payload.nextable
    },

    setCurrentTab (state, payload) {
      state.currentTab = payload.currentTab;
    },
    setSuccessed (state, payload) {
      state.successed = payload.successed
    },
    setFailedCount (state, payload){
      state.failedCount = payload.failedCount
    },
  },
  actions: {
    //actions of setting current Step
    setWizardStep(context, payload) {
      context.commit("setWizardStep", payload)
    },
    increment (context, payload) {
      context.commit('setWizardForm', payload)
    },
    setIsNextable (context, payload) {
      context.commit('setIsNextable', payload)
    },
    setCurrentTab(context, payload){
      context.commit('setCurrentTab', payload)
    },
    setSuccessed(context, payload){
      context.commit('setSuccessed', payload)
    },
    setFailedCount(context, payload){
      context.commit('setFailedCount', payload)
    },

    sendAllData(context, payload) {
      //send to the backend api and get the repsonse
      let response = 201
      console.log(this.state.wizardForm);
      if(response != 200) {
        context.commit('setFailedCount', {failedCount : this.state.failedCount + 1})
        return 'failed'
      } else {
        context.commit('setSuccessed', {successed : 'success'})
        return 'success'
      }
    }
  }
})
export default store;