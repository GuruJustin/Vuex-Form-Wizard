<template>
    <form-wizard ref="formwizard" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset">
        <tab-content title="YOUR REQUIREMENTS" :selected="true">
            <requirement></requirement>
        </tab-content>
        <tab-content title="ABOUT YOU">
            <personal-information></personal-information>
        </tab-content>
        <tab-content title="ADDITIONAL INFORMATION">
        </tab-content>
    </form-wizard>
</template>

<script>
import FormWizard from '../components/FormWizard.vue';
import TabContent from '../components/TabContent.vue';
import Requirement from './steps/requirement.vue'
import PersonalInformation from './steps/per_information.vue'

const checked = (value) => value === true;

import { mapGetters} from 'vuex'

export default {
    name: 'WizardStepper',
    components: {
        FormWizard, TabContent, Requirement,PersonalInformation
    },
    computed:{
        ...mapGetters({
            formData: 'getWizardForm'
        }),
    },
    data(){
        return {
        }
    },
    mounted() {
    },
    methods:{
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