import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    currentStep : 0,
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
    isNextable : false
  },
  getters : {
    getIsNextable : state => {
        return state.isNextable;
    },
    getCurrentStep : state => {
      return state.currentStep
    },
    getWizardForm : state => {
      return state.wizardForm
    }
  },
  mutations: {
    //set current Step
    setWizardStep(state, payload) {
      state.currentStep = payload.stepNumber ? payload.stepNumber : state.currentStep + 1;
    },
    setWizardForm(state, payload) {
      state.wizardForm = Object.assigned(payload.formData);
    },
    setIsNextable (state, payload){
        state.isNextable = payload.nextable
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
    }
  }
})
export default store;