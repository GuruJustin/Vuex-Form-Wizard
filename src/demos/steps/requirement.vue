<template>
    <div class = "row form-container">
        <div class="col-md-12">
            <h4>Your requirements</h4>
            <p>Explain us who you are and the reason of your request</p>
        </div>

        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="jobs">I work as*</label>
                <v-select 
                    v-model="formData.job"
                    label="countryName"
                    :options="jobs"
                    class="style-chooser"/>
                <div v-if="hasError('jobs')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.jobs.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="companyName">Your Company Name</label>
                <input type="text" class="form-control" :class="hasError('companyName') ? 'is-invalid' : ''" placeholder="Compnay Name" v-model="formData.companyName">
                <div v-if="hasError('companyName')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.companyName.required">Please provide a valid company name.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="interested">Interested in glass for*</label>
                <v-select 
                    v-model="formData.interest"
                    label="interested"
                    :options="interests"
                    class="style-chooser"/>
                <div v-if="hasError('interests')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.interests.required">Please select on of the fields.</div>
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
                    class="style-chooser"/>
                <div v-if="hasError('benefit')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.benefit.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import ValidationHelper from '../../components/ValidationHelper.vue';
import { required } from 'vuelidate/lib/validators';
// import { email } from 'vuelidate/lib/validators';
// import { numeric } from 'vuelidate/lib/validators';

export default {
    name : "Requirement",
    components: {
        vSelect
    },
    mixins: [ValidationHelper],
    data () {
        return {
            formData:{
                job: null,
                companyName: null,
                interest: null,
                benefit: null,
            },
            validationRules:[
                {job: {required}},
                {companyName: {required}},
                {interested: {required}},
                {benefit: {required}},
            ],
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