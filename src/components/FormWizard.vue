<template>
    <div class="container  vue-step-wizard row">
        <div class="col-md-3 step-side">
          <div class = "form-title" >
            <h6 class = "title">Contact Form</h6>
            <div class="break"></div>
          </div>


          <ul v-if="!mobile" class="step-pills">
              <li @click="selectTab(index)" class="step-item" :class="{ 'active': tab.isActive, 'validated': tab.isValidated }" v-for="(tab, index) in tabs" v-bind:key="`tab-${index}`" v-if="tab.title">
                  <a class="step-link" href="#">
                    <span class="tabStatus">{{index+1}} </span> 
                    <span class="tabLabel">{{tab.title}}</span>
                  </a>
              </li>
          </ul>

          <div v-if="mobile" class="mobileSideBar">
            STEP {{currentTab + 1}}/{{totalTabs-1}}
          </div>
        </div>

        <div class="col-md-9 step-body">
          <slot></slot>
          <div class="step-footer" >
            <template v-if="successed == null">
              <button v-if="currentTab!=0" @click="previousTab" :disabled="currentTab === 0" class="step-button step-button-previous">Back</button>
              <button style="visibility:hidden">aa</button>
              <button @click="nextTab" :disabled="!nextable" v-if="currentTab < totalTabs - 1 && currentTab != totalTabs-1" class="step-button step-button-next" v-bind:class="{activeButton : nextable, disabledButton : !nextable}">Next</button>
              <button @click="onSubmit" v-if="currentTab === totalTabs - 1" class="step-button step-button-submit">Send</button>

              <div v-if="warningShow" class="warningSend">
                Submission failed due to error, please try again. 
                <div>
                  <v-icon name="alert-triangle" class = 'icon-failed'></v-icon>
                </div>
              </div>
            </template>
          </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions} from 'vuex'

export default {
    name: 'form-wizard',
    data(){
      return{
        tabs: [],
        totalTabs : 0,
        submitSuccess : false,
        warningShow : false,
        mobile : false,
      }
    },
    computed:{
      ...mapGetters({
        nextable : 'getIsNextable',
        getWizardStep : 'getWizardStep',
        successed : 'getSuccessed',
        failedCount : 'getFailedCount',
        currentTab : 'getCurrentTab'
      }),
    },
    mounted(){
      this.tabs = this.$children;
      this.mobile = this.isMobile()
      console.log(this.mobile)
      this.totalTabs = this.tabs.length;

      this.setCurrentTab({currentTab:this.tabs.findIndex((tab) => tab.isActive === true)})

      //Select first tab if none is marked selected
      if(this.currentTab === -1 && this.totalTabs > 0){
          this.tabs[0].isActive = true;
          this.setCurrentTab({currentTab: 0});
      }
    },

    updated(){
    },

    methods:{
        ...mapActions([
          'setIsNextable', 
          'setWizardStep',
          'setCurrentTab',
          'setFailedCount',
          'setSuccessed',
          'sendAllData'
        ]),
        isMobile() {
          if (screen.width <= 760) {
            return true
          } else {
            return false
          }
        }, 
        previousTab(){
          this._switchTab(this.currentTab - 1)
          this.$emit('onPreviousStep')
        },
        nextTab(){
          this.setSuccessed({successed:null})

          this.setIsNextable({nextable: false})
          if (this.getWizardStep < this.currentTab + 1)
            this.setWizardStep({stepNumber : this.currentTab + 1})
          this._switchTab(this.currentTab + 1);
          this.$emit('onNextStep');
        },
        changeStatus(){
          this.submitSuccess = true;
        },

        selectTab(index){

          this.setSuccessed({successed:null})
          if (this.getWizardStep >= index)
            this._switchTab(index);
        },

        async onSubmit(){
          let response = 'failed'; 
          await this.sendAllData()
            .then(res => {
              response = res
            })
          if (response == 'failed') {
            if (this.failedCount >= 3) {
              this.setSuccessed({successed:'failed'})
            }
            this.warningShow = true;
            console.log(this.failedCount)
          } else {
              this.setSuccessed({successed:'successed'})
            this.$emit('onComplete');
          }
        },

        async _switchTab(index){
            //Disable all tabs
          this.tabs.forEach(tab => {
            tab.isActive = false;
          });

          await this.setCurrentTab({currentTab:index})
          this.tabs[index].isActive = true;
        },
    },
    watch:{
       currentTab(){
          this.setCurrentTab({currentTab : this.currentTab})
       }
    }
    
}
</script>

<style lang = "scss">

  .warningSend {
    position : absolute;
    right : 8px;
    bottom : -15px;
    color : red;
    font-size : 12px;
    display:flex;
    flex-direction : row;
    justify-content : space-between;
    div {
      margin-left : 5px;
      width : 16px;
    }
  }
  .vue-step-wizard{
    margin: 0px !important;
    min-height : 700px;
    max-height : 700px;
  }

  .activeButton {
    background-color: #126fde
  }

  .disabledButton {
    background-color: #126fde;
    opacity: 0.6;
  }

  .step-side {
    background : white;
    .form-title {
      padding : 30px 0px 0px 20px;
      .title {
        font-weight :bold;
        color : blue; 
      }
      .break{
        margin-top : 15px;
        min-height : 2px;
        background : #1e1e1e;
        width : 50px;
      }
    }
  }

  .step-pills{
    margin-top : 60px;
    background-color: white;
    padding : 0px 0px 0px 20px;

    .step-item{
      background-color: #F5F5F5;
      border-radius: 10px;
      list-style-type: none;
      font-size : 12.5px;
      a{
        text-decoration: none;
        color: #ABABAB;
        
        /** Wizard Ends */
        .tabStatus{
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          margin-right: .5rem;
          line-height: 1.5rem;
          color: black;
          text-align: center;
          background: white;
          border-radius: 50%;
          border: 1px solid green;
        }
      }
      margin-bottom : 45px;
    }
    
    .step-item.active{
      a{
        color : #000;
        font-weight : bold;
      }
    }
    .step-item.validated{
      .tabStatus { 
        background : #00eecc;
        border : none;
      }
    }
  }


  .step-body{
    background-color: #EbEbEb;
    margin-left: auto;
    padding: 2rem 5rem 2rem 4rem !important;
    display : flex;
    flex-direction : column;
    justify-content : space-between;

    .step-footer{
      position : relative;
      display :flex;
      flex-direction : row;
      justify-content : space-between;
      align-items : center;

      .step-button{
        font-weight: 700;
        width : 125px;
        line-height: 1;
        text-transform: uppercase;
        position: relative;
        max-width: 30rem;
        text-align: center;
        border: 1px solid;
        color: #22292f;
        color: rgba(34,41,47,var(--text-opacity));
        padding: 0.5rem 1.25rem;
        font-size: .875rem;
        margin: 0.5rem;
        color: #fff;
        outline: none !important;
        box-shadow: none !important;
      }

      .step-button-next{
        background-color: #126fde;
      }

      .step-button-previous{
        background-color: #3deaba;
      }

      .step-button-submit{
        background-color: #4fa203;
      }

      .step-button-reset{
        background-color: #037da2;
      }
    }
  }

  .mobileSideBar {
    display:flex;
    justify-content:center;
    height : 50px;
    align-items: center
  }
    
  @media only screen and  (max-device-width : 760px) {
    .step-body {
      padding : 1rem 2rem !important;
    }
    .form-title {
      display:flex;
      flex-direction:column;
      height : 50px;
      align-items: center;
      .break{
        min-height : 2px;
        background : #1e1e1e;
        width : 50px;
      }
      margin-bottom : 30px;
    }
  }
</style>