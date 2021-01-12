<template>
    <form-wizard ref="formwizard" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset">
        <tab-content title="YOUR REQUIREMENTS" :selected="true">
            <requirement></requirement>
        </tab-content>
        <tab-content title="ABOUT YOU">
            <div class="form-group">
                <label for="companyName">Your Company Name</label>
                <input type="text" class="form-control" :class="hasError('companyName') ? 'is-invalid' : ''" placeholder="Enter your Company / Organization name" v-model="formData.companyName">
                <div v-if="hasError('companyName')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.companyName.required">Please provide a valid company name.</div>
                </div>
            </div>
            <div class="form-group">
                <label for="numberOfEmployees">Number of Employees</label>
                <input type="text" class="form-control" :class="hasError('numberOfEmployees') ? 'is-invalid' : ''" placeholder="Enter    Number of Employees" v-model="formData.numberOfEmployees">
                <div v-if="hasError('numberOfEmployees')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.numberOfEmployees.required">Please provide number of employees in your company.</div>
                    <div class="error" v-if="!$v.formData.numberOfEmployees.numeric">Should be a valid value.</div>
                </div>
            </div>
        </tab-content>
        <tab-content title="ADDITIONAL INFORMATION">
            <div class="form-group">
                <label for="referral">From Where did you hear about us</label>
                <select :class="hasError('referral') ? 'is-invalid' : ''" class="form-control" v-model="formData.referral">
                    <option>Newspaper</option>
                    <option>Online Ad</option>
                    <option>Friend</option>
                    <option>Other</option>
                </select>
                <div v-if="hasError('referral')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.referral.required">Please select on of the fields.</div>
                </div>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" :class="hasError('terms') ? 'is-invalid' : ''" class="form-check-input" v-model="formData.terms">
                <label class="form-check-label">I accpet terms & conditions</label>
                <div v-if="hasError('terms')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.terms.required">Please select terms and conditions.</div>
                </div>
            </div>
        </tab-content>
    </form-wizard>
</template>

<script>
import FormWizard from '../components/FormWizard.vue';
import TabContent from '../components/TabContent.vue';
import ValidationHelper from '../components/ValidationHelper.vue';
import { required } from 'vuelidate/lib/validators';
import { email } from 'vuelidate/lib/validators';
import { numeric } from 'vuelidate/lib/validators';
const checked = (value) => value === true;


//Vuex
import store from '../store/index'
import * as types from '../store/mutations/types'
import { mapGetters} from 'vuex'

//StepComponents
import Requirement from './steps/requirement.vue'


export default {
    name: 'WizardStepper',
    computed:{
        ...mapGetters({
            count: 'getCount'
        }),
    },
    components: {
        FormWizard, TabContent, Requirement
    },
    mixins: [ValidationHelper],
    data(){
        return {
            formData:{
                fullName: '',
                email: null,
                companyName: null,
                numberOfEmployees: null,
                referral: null,
                terms: false,
            },
            validationRules:[
                {fullName: {required}, email: {required, email} },
                {companyName: {required}, numberOfEmployees: {required, numeric} },
                {referral: {required}, terms: {checked} }
            ],
        }
    },
    methods:{
        addCount() {
            store.dispatch({
                type : types.Increment,
                amount : 20
            })
        },
        onComplete(){
            alert("Submitting Form ! Rock On");
            this.$refs.formwizard.changeStatus();
        },

        reset(){
            for(let field in this.formData){
                this.formData[field] = null;
            }
        },

        nextStep(){
            //alert("On Next Step");
        },

        previousStep(){
            //alert("On Previous Step");
        }
    }
}
</script>