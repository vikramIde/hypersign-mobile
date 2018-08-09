<template>
<q-layout>
  <div class="error-page window-height window-width column items-center custom_login">  
    <div class="items-center justify-center" style="height:100%;width:100%;padding:50px;background-color: #027be3 !important;background-size:cover;" >
      <div class="content_main" style="position:absolute; top:40%;left:40px;right:40px;">
        <div class="row">
          <div class="width-1of1" style="text-align:center;margin-bottom: 20px;">
            <img src="../assets/hypersign.png" alt="" style="width:70%;">
            <div style="clear:both;"></div>
          </div>
        </div>
      </div>
      <div class="content_main" style="position:absolute; bottom:2%;left:40px;right:40px;">
        <div class="row">
          <div class="width-1of1" style="text-align:center;margin-bottom: 20px;">
            <img src="../assets/hypersign-foot.png" alt="" style="width:30%;">
            <div style="clear:both;"></div>
          </div>
        </div>
      </div>

    </div>
    <div>
    </div>
  </div>
  </q-layout>
</template>
<style>
    input:not(.no-style):focus, textarea:not(.no-style):focus, .textfield:not(.no-style):focus, input:not(.no-style):hover, textarea:not(.no-style):hover, .textfield:not(.no-style):hover, input:not(.no-style) .active, textarea:not(.no-style) .active, .textfield:not(.no-style) .active{
      border-color: #fff!important;
    }
  </style>
<style lang="stylus">
.logo
  width 40%
.error-page
  .error-code
    height 50vh
    width 100%
    padding-top 4vh
    font-size 21vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    margin-top -25px
    width 90vw
    max-width 600px
    padding 50px
    i
      font-size 5rem
</style>