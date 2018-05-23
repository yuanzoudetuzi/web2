<template>
  <div class="command">
    <form id="commandForm" class="form-horizontal">
      <div style="margin-top: 16px" class="control-group">
        <label class="control-label" for="nodeId">Node ID</label>
        <div class="controls">
          <input type="text" id="nodeId" name="nodeId" placeholder="Node Id">
        </div>
      </div>
      <div style="margin-top: 16px" class="control-group">
        <label class="control-label" for="commandType">Command Type</label>
        <div class="controls">
          <select id="commandType" name="commandType" @click="setCommandType()">
            <option value="Light Up" selected="selected">Light Up</option>
            <option value="Inquire Electronic">Inquire Electronic</option>
            <option value="Inquire Water">Inquire Water</option>
            <option value="Close Valve">Close Valve</option>
            <option value="Open Valve">Open Valve</option>
            <option value="A to C">Change Class A to Class C</option>
            <option value="RXParamSetupReq">RXParamSetupReq</option>
            <option value="NewChannelReq">NewChannelReq</option>
            <option value="DlChannelReq">DlChannelReq</option>
            <option value="RxTimingSetupReq">RxTimingSetupReq</option>
          </select>
         <!-- <input type="text" id="commandType" name="commandType" placeholder="Command Type" list="commandSelect">
          <datalist id="commandSelect">
            <option value="Light Up"></option>
            <option value="Inquire Electronic"></option>
            <option value="Inquire Water"></option>
            <option value="Close Valve"></option>
            <option value="Open Valve"></option>
            <option value="RXParamSetupReq"></option>
          </datalist>-->
        </div>
        <div v-if="commandType == 'RXParamSetupReq'">
          <input style="margin-top: 16px" type="text"  name="RX1DROffset" placeholder="第一接收窗口速率偏移"/>
          <input style="margin-top: 16px" type="text"  name="RX2DateRate" placeholder="第二接收窗口速率" list="RX2DateRateSelect"/>
          <datalist id="RX2DateRateSelect">
            <option value="DR0"></option>
            <option value="DR1"></option>
            <option value="DR2"></option>
            <option value="DR3"></option>
            <option value="DR4"></option>
            <option value="DR5"></option>
          </datalist>
          <input style="margin-top: 16px" type="text"  name="Frequency" placeholder="接收窗口频率/HZ"/>
        </div>

        <div v-if="commandType == 'NewChannelReq'">
          <input style="margin-top: 16px" type="text"  name="ChIndex" placeholder="信道下标"/>
          <input style="margin-top: 16px" type="text"  name="Frequency" placeholder="信道频率/HZ"/>
          <input style="margin-top: 16px" type="text"  name="MaxDR" placeholder="最大速率" list="MaxDRSelect"/>
          <datalist id="MaxDRSelect">
            <option value="DR0"></option>
            <option value="DR1"></option>
            <option value="DR2"></option>
            <option value="DR3"></option>
            <option value="DR4"></option>
            <option value="DR5"></option>
          </datalist>
          <input style="margin-top: 16px" type="text"  name="MinDR" placeholder="最小速率" list="MinDRSelect"/>
          <datalist id="MinDRSelect">
            <option value="DR0"></option>
            <option value="DR1"></option>
            <option value="DR2"></option>
            <option value="DR3"></option>
            <option value="DR4"></option>
            <option value="DR5"></option>
          </datalist>
        </div>

        <div v-if="commandType == 'DlChannelReq'">
          <input style="margin-top: 16px" type="text"  name="ChIndex" placeholder="信道下标"/>
          <input style="margin-top: 16px" type="text"  name="Frequency" placeholder="信道频率/HZ"/>
        </div>

        <div v-if="commandType == 'RxTimingSetupReq'">
          <input style="margin-top: 16px" type="text"  name="ChIndex" placeholder="信道下标"/>
          <input style="margin-top: 16px" type="text"  name="Delay" placeholder="第一接收窗口延迟/s"/>
        </div>


      </div>
      <div id="ACK_BOX">
        <h5 id="ACK"></h5>
      </div>
      <div class="row" style="text-align:right; margin-right: 20px; margin-top: 16px">
        <button type="button" class="btn btn-primary" @click="sendCommand()">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  export default {
    name: 'command',
    data () {
      return {
        commandType: '',
        command: {}
      }
    },
    methods: {
      setCommandType: function () {
        if($('#commandType').val()==="") {
           this.commandType = $("#commandType option[index='0']");
        } else {
           this.commandType = $('#commandType').val();
        }
      },
      getValueById:function (id) {
        let item = $("#"+id);
         if(item.val()==="") {
            item.focus()
         } else {
           return item.val()
         }

      },
      getValueByName:function (name,defaultVal) {
         let item = $("input[name="+name+"]")[0]
         if(typeof item === "undefined" || item.val()==="") {
            return defaultVal
         } else {
           return item.val()
         }
      },
      sendCommand: function () {
        this.setCommandType()
        this.command['nodeId'] = this.getValueById("nodeId")
        this.command['commandType'] = this.commandType
        let RX1DROffset = this.getValueByName("RX1DROffset",0)
        let RX2DateRate = this.getValueByName("RX1DROffset",'DR0')
        let Frequency = this.getValueByName("RX1DROffset",123)
        let ChIndex = this.getValueByName("RX1DROffset",0)
        let MaxDR = this.getValueByName("RX1DROffset",'DR5')
        let MinDR = this.getValueByName("RX1DROffset",'DR0')
        let Delay = this.getValueByName("RX1DROffset",2)
        switch (this.commandType) {
          case 'RXParamSetupReq':
            this.command['commandContent'] = {
              RX1DROffset: RX1DROffset,
              RX2DateRate:RX2DateRate,
              Frequency:Frequency
            }
            break
          case 'NewChannelReq':
            this.command['commandContent'] = {
              ChIndex:ChIndex,
              Frequency:Frequency,
              MaxDR: MaxDR,
              MinDR:MinDR
            }
            break
          case 'DlChannelReq':
            this.command['commandContent'] = {
              ChIndex:ChIndex,
              Frequency:Frequency
            }
            break
          case 'RxTimingSetupReq':
            this.command['commandContent'] =  {
              ChIndex:ChIndex,
              Delay:Delay
            }
            break
          default:
            break
        }
        console.log('this.command.nodeId ' + this.command.nodeId)
        console.log(' this.command.commandType ' + this.command.commandType)
        console.log(' this.command.commandContent ' + this.command.commandContent)
//        console.log('this.command  = ' + JSON.stringify(this.command))
        console.log('this.command111  = ')
        console.log(this.command)
        let that = this
        Vue.http.post('command/sendCommand', that.command).then(function (response) {
          $('#ACK_BOX').css('display','block')
          if(!response.body.err) {

              if (response.body.data["ACKType"] === 'OK') {
                $('#ACK_BOX').css('background', 'aquamarine')
              }
              if (response.body.data["ACKType"] === 'Fail') {
                $('#ACK_BOX').css('background', 'lightcoral')
              }
              let ACKContent = response.body.data["ACKContent"] || " "
              $('#ACK').html(response.body.data["ACKType"] + '!    '+ACKContent)
              console.log('response = ' + response.body.data["ACKType"] + '!  '+ACKContent)
          } else {
            $('#ACK_BOX').css('background', 'lightcoral')
            $('#ACK').html(response.body.err + '!')
          }

        })
      }
    }
  }

</script>

<style scoped>
  .command {
    margin-top: 50px;
    margin-left: 20%;
  }

  select {
     height: 26px;
     width: 203px;
     background-color: white;
     outline: medium;
  }

  #ACK_BOX {
    margin:20px 100px 0px 0px;
    border: 1px solid whitesmoke;
    height: 30px;
    width: 200px;
    text-align: center;
    border-radius: 5px;
    line-height: 30px;
    display: none;
  }
</style>
