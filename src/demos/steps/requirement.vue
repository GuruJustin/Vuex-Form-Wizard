<template>
    <div class = "row form-container">
        <div class="col-md-12">
            <h4>Your requirements</h4>
            <p>Explain us who you are and the reason of your request</p>
        </div>

        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="job">I work as*</label>
                <v-select 
                    v-model="formData.job"
                    label="countryName"
                    :options="jobs"
                    class="style-chooser"
                    :on-change="changeState()"
                    />
                <div class="invalid-feedback" style="display:block">
                    <div class="error" v-if="!$v.formData.job.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="companyName">Your Company Name</label>
                <input type="text" class="form-control" :class="hasError('companyName') ? 'is-invalid' : ''" placeholder="Company Name" v-model="formData.companyName" @change="changeState()">
                <div class="invalid-feedback"  style="display:block">
                    <div class="error" v-if="!$v.formData.companyName.required">Please provide a valid company name.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="interested">Interested in glass for*</label>
                <v-select 
                    v-model="formData.interested"
                    label="countryName"
                    :options="interests"
                    @change="changeState()"
                    class="style-chooser"/>
                <div class="invalid-feedback" style="display:block">
                    <div class="error" v-if="!$v.formData.interested.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="benefit">With benefits such as*</label>
                <v-select 
                    v-model="formData.benefit"
                    label="benefit"
                    :options="benefits"
                    @change="changeState()"
                    class="style-chooser"/>
                <div class="invalid-feedback" style="display:block">
                    <div class="error" v-if="!$v.formData.benefit.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';


import Vuelidate from 'vuelidate'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators';

import * as types from '../../store/mutations/types'
import { mapGetters, mapActions} from 'vuex'

export default {
    name : "Requirement",
    mixins: [validationMixin],
    components: {
        vSelect
    },
    computed:{
        ...mapGetters({
            formData: 'getWizardForm',
        }),
    },
    data () {
        return {
            jobs : [
                'architect', 'barber', 'cook', 'developer'
            ],
            interests : [
                'Facades', 'Gacades', 'Hacades'
            ],
            benefits : [
                'Solar Protection', 'Wind Force', 'Heat'
            ],
        }
    },
    validations:{
        formData : {
            job: {required}, 
            companyName: {required}, 
            interested: {required}, 
            benefit: {required}
        }
    },
    methods : {
        ...mapActions(['setIsNextable']),
        hasError(fieldName){
            // return this.$v.fieldName.$error
            return this.$v.formData[fieldName].$error;
        },
        async changeState() {
            if (this.$v.formData.$invalid) {
                await this.setIsNextable({nextable:false})
                return;
            }
            await this.setIsNextable({nextable:true})
        }
    }
}
</script>

<style scoped lang="scss">
.form-container {
    padding-top : 50px;
}
// .style-chooser{
//     // background: white !important;
//     // height : calc(1.5em + .75rem + 2px) !important;
// }
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
    background: white;
    height : calc(1.5em + .75rem + 2px) !important;
}
</style>