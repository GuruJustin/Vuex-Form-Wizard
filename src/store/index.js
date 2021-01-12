import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    currentStep : 0,
    wizardForm: {},
  },
  getters : {
    getCount : state => {
        return state.count;
    },
    getCurrentStep : state => {
      return state.currentStep
    }
  },
  mutations: {
    //set current Step
    setWizardStep(state, payload) {
      state.currentStep = payload.stepNumber ? payload.stepNumber : state.currentStep + 1;
    },
    increment (state, payload){
        state.count += payload.amount
    }
  },
  actions: {
    //actions of setting current Step
    setWizardStep(context, payload) {
      context.commit("wizardNextStep", payload)
    },
    increment (context, payload) {
      context.commit('increment', payload)
    }
  }
})
export default store;