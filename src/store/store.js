import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        data:{
            id:null,
            tag:null,
            catalogue_name:null,
            sku_id:null,
            deal_price:null,
            moq:null,
            commission_percent:null,
            coupon_code:null
        },
        editcon:false,
        idedit:null,
        row:[]
    }
})