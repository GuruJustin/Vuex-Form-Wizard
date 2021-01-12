<template>
    <div class="container  vue-step-wizard row">
        <div class="col-md-3 step-side">
          <div class = "form-title">
            <h6 class = "title">Contact Form</h6>
            <div class="break"></div>
          </div>

          <ul class="step-pills">
              <li @click.prevent.stop="selectTab(index)" class="step-item" :class="{ 'active': tab.isActive, 'validated': tab.isValidated }" v-for="(tab, index) in tabs" v-bind:key="`tab-${index}`">
                  <a class="step-link" href="#">
                    <span class="tabStatus">{{index+1}} </span> 
                    <span class="tabLabel">{{tab.title}}</span>
                  </a>
              </li>
          </ul>
        </div>

        <div class="col-md-9 step-body">
          <form>
              <slot></slot>
          </form>
  
          <div class="step-footer">

            <template v-if="!submitSuccess">
              <button v-if="currentTab!=0" @click="previousTab" :disabled="currentTab === 0" class="step-button step-button-previous">Back</button>
              <button style="visibility:hidden">aa</button>
              <!-- <button @click="nextTab" :disabled="!nextable" v-if="currentTab < totalTabs - 1 && currentTab != totalTabs-1" class="step-button step-button-next" v-bind:class="{activeButton : nextable, disabledButton : !nextable}">Next</button> -->
              <button @click="onSubmit" v-if="currentTab === totalTabs - 1" class="step-button step-button-submit">Send</button>
            </template>

            <template v-else>
              <button @click="reset" class="step-button step-button-reset">Reset</button>
            </template>

          </div>
        </div>
    </div>
</template>
<script>
import { store } from "./store.js";
import { mapGetters, mapActions} from 'vuex'

export default {
    name: 'form-wizard',
    data(){
        return{
            tabs: [],
            currentTab : 0,
            totalTabs : 0,
            storeState: store.state,
            submitSuccess : false,
        }
    },
    computed:{
        ...mapGetters({
            nextable : 'getIsNextable'
        }),
    },
    mounted(){
      this.tabs = this.$children;
      this.totalTabs = this.tabs.length;
      this.currentTab = this.tabs.findIndex((tab) => tab.isActive === true);

      //Select first tab if none is marked selected
      if(this.currentTab === -1 && this.totalTabs > 0){
          this.tabs[0].isActive = true;
          this.currentTab = 0;
      }
    },

    updated(){
    },

    methods:{
        ...mapActions([
          'setIsNextable'
        ]),
        previousTab(){
            this._switchTab(this.currentTab - 1);
            this.$emit('onPreviousStep'); 
        },
        nextTab(){
            this._switchTab(this.currentTab + 1);    
            this.$emit('onNextStep');
        },

        reset(){
           this.tabs.forEach(tab => {
             tab.isActive = false;
             tab.isValidated = false;
           });

           this._switchTab(0);
           this.submitSuccess = false;
           this.storeState.v.$reset();

           this.$emit('onReset');
        },

        changeStatus(){
            this.submitSuccess = true;
        },

        selectTab(index){
            if(index < this.currentTab){
              this._switchTab(index);
            }

            this._switchTab(index);
        },


        onSubmit(){
            this.$emit('onComplete');
        },

        _switchTab(index){
            //Disable all tabs
            this.tabs.forEach(tab => {
              tab.isActive = false;
            });

            this.currentTab = index;
            this.tabs[index].isActive = true;
        },
    },
    watch:{
       currentTab(){
          store.setCurrentTab(this.currentTab);
       }
    }
    
}
</script>

<style lang = "scss">
  .vue-step-wizard{
    margin: 0px !important;
    min-height : 600px;
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

  
  @media only screen and  (max-device-width : 480px) {
    .step-body {
      padding : 1rem 2rem !important;
    }
  }
</style>