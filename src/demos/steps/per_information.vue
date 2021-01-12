<template>
    <div class = "row form-container">
        <div class="col-md-12">
            <h4>Personal Information</h4>
            <p>Tell me more about your in order to be contacted</p>
        </div>

        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="firstName">First Name*</label>
                <input type="text" class="form-control" :class="hasError('firstName') ? 'is-invalid' : ''" placeholder="First Name" v-model="formData.firstName" @change="changeState()">
                <div class="invalid-feedback"  style="display:block">
                    <div class="error" v-if="!$v.formData.firstName.required">Please provide a valid name.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="lastName">Last Name*</label>
                <input type="text" class="form-control" :class="hasError('lastName') ? 'is-invalid' : ''" placeholder="First Name" v-model="formData.lastName" @change="changeState()">
                <div class="invalid-feedback"  style="display:block">
                    <div class="error" v-if="!$v.formData.lastName.required">Please provide a valid name.</div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="form-group">
                <label for="emailAddress">Email*</label>
                <input type="email" class="form-control" :class="hasError('emailAddress') ? 'is-invalid' : ''" placeholder="First Name" v-model="formData.emailAddress" @change="changeState()">
                <div class="invalid-feedback"  style="display:block">
                    <div class="error" v-if="!$v.formData.emailAddress.required">Please provide a email.</div>
                    <div class="error" v-if="!$v.formData.emailAddress.email">Please provide a valid email.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="emailConfirmation">Email Confirmation*</label>
                <input type="email" class="form-control" :class="hasError('emailConfirmation') ? 'is-invalid' : ''" placeholder="First Name" v-model="formData.emailConfirmation" @change="changeState()">
                <div class="invalid-feedback"  style="display:block">
                    <div class="error" v-if="!$v.formData.emailConfirmation.sameAsEmailAddress">Please provide the equal email.</div>
                </div>
            </div>
        </div>
        
        
        <div class="col-md-6">
            <div class="form-group">
                <label for="phoneNumber">Phone Number*</label>
                <vue-tel-input v-model="formData.phoneNumber" :class="hasError('phoneNumber') ? 'is-invalid' : ''" @change="changeState()"></vue-tel-input>
                <div class="invalid-feedback"  style="display:block">
                    <div class="error" v-if="!$v.formData.phoneNumber.require">Please provide the valid phone number.</div>
                </div>
            </div>
        </div>

        <div class ="col-md-6"></div>
        
        <div class="col-md-6  langArea">
            <div class="form-group">
                <label for="preferLang">Prefered Language*</label>
                    <v-select 
                        v-model="formData.preferLang"
                        label="countryName"
                        :options="languages"
                        @change="changeState()"
                        class="style-chooser"/>
                <div class="invalid-feedback" style="display:block">
                    <div class="error" v-if="!$v.formData.preferLang.required">Please select on of the fields.</div>
                </div>
            </div>
            <div class="langInfo">
                <v-icon name="alert-circle"
                    v-tooltip="'Prefered Language is the defualt language Guardian will use to contact you'"
                ></v-icon>
            </div>
        </div>
    
    </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { VueTelInput } from 'vue-tel-input'
import VTooltip from 'v-tooltip'

import Vuelidate from 'vuelidate'
import { validationMixin } from 'vuelidate'
import { required, email, sameAs, alphaNum } from 'vuelidate/lib/validators'


import * as types from '../../store/mutations/types'
import { mapGetters, mapActions} from 'vuex'

export default {
    name : "PersonalInformation",
    mixins: [validationMixin],
    components: {
        vSelect,
        VueTelInput,
        VTooltip
    },
    computed:{
        ...mapGetters({
            formData: 'getWizardForm',
        }),
    },
    data () {
        return {
            languages : ['English','Chinese','German', 'Spanish', 'Korean']
        }
    },
    validations:{
        formData : {
            firstName: {required}, 
            lastName: {required}, 
            emailAddress: {required, email}, 
            emailConfirmation: { sameAsEmailAddress : sameAs('emailAddress') },
            phoneNumber: {required,alphaNum},
            preferLang: {required},
        }
    },
    methods : {
        ...mapActions(['setIsNextable']),
        hasError(fieldName){
            // return this.$v.fieldName.$error
            return this.$v.formData[fieldName].$invalid;
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

.langArea {
    position : relative;
    .langInfo {
        position : absolute;
        right : -15px;
        bottom : 50px;
        height : 20px;
        width : 20px;
        color : green
    }
}
</style>