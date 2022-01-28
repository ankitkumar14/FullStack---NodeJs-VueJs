<template>
  <div id="app">

    <b-button v-b-modal.modal-prevent-closing>Add Data</b-button>

  <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name" 
      @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div class="form-group">
        <label for="name">ID = </label>
        <input type="number" v-model="formdata.id" />
      </div>
      <div class="form-group">
        <label for="name">Tag = </label>
        <input type="text" v-model="formdata.tag" />
      </div>
      <div class="form-group">
        <label for="name">Catalogue Name = </label>
        <input type="text" v-model="formdata.catalogue_name" />
      </div>
      <div class="form-group">
        <label for="name">Sku ID = </label>
        <input type="text" v-model="formdata.sku_id" />
      </div>
      <div class="form-group">
        <label for="name">Deal Price = </label>
        <input type="number" v-model="formdata.deal_price" step="any" />
      </div>
      <div class="form-group">
        <label for="name">Moq = </label>
        <input type="number" v-model="formdata.moq" step="any" />
      </div>
      <div class="form-group">
        <label for="name">Commission Percent = </label>
        <input type="number" v-model="formdata.commission_percent" step="any" />
      </div>
      <div class="form-group">
        <label for="name">Coupon Code = </label>
        <input type="text" v-model="formdata.coupon_code" />
      </div>
      <button v-if="editcond" v-on:click="save()" class="btn btn-dark">Save</button>
      <button v-else v-on:click="onSubmit(formdata)" class="btn btn-dark">Submit</button>
      </form>
    </b-modal>

    <br><br>
    <h3>Upload Data via CSV file</h3>
  <input type = "file" @change = "readFile">
  <br><br>
  
    <ag-grid-vue style="width: auto; height: 900px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
        @grid-ready="onGridReady">
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";
import Papa from 'papaparse';
import BtnCellRenderer from "./components/btn-cell-renderer.vue";


export default {
  name: 'App',
  components: {
    AgGridVue,
    btnCellRenderer : BtnCellRenderer
  },
  computed:{
    formdata(){
      return this.$store.state.data;
    },
    editcond(){
      return this.$store.state.editcon;
    },
    editid(){
      return this.$store.state.idedit;
    },
    rowData(){
      return this.$store.state.row;
    }
  },
  data() {
    return {
      datas:{},
      file: '',
      frameworkComponents:null,
      content: [],
      columnDefs: null,
      val:null,
      nulldata:{
        id:null,
        tag:null,
        catalogue_name:null,
        sku_id:null,
        deal_price:null,
        moq:null,
        commission_percent:null,
        coupon_code:null
      }
    };
  },
  async mounted(){
    this.fun()
  },
  beforeMount() {
    this.columnDefs = [
      { field: "id", sortable: true , filter: true },
      { field: "tag"},
      { field: "catalogue_name" },
      { field: "sku_id" },
      { field: "deal_price" },
      { field: "moq" },
      { field: "commission_percent" },
      { field: "coupon_code" },
      { field: "id", cellRenderer: "btnCellRenderer"}
    ];
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer
    };
  },
  methods:{
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      handleSubmit() {
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    fun(){
      axios.get('http://localhost:3000/').then((res)=>{
        this.$store.state.row=res.data;
      })
    },
    edit(id){
      this.editcond=1;
      this.editid=id;
      axios.get('http://localhost:3000/'+id).then((res)=>{
        this.formdata=res.data[0];
      })
    },
    onSubmit(data){
      axios.post('http://localhost:3000/insert',data).then((res)=>{
          console.log(res.data)
          this.$store.state.data= this.nulldata;
          this.fun();
        })
    },
    save(){
      axios.put('http://localhost:3000/insert/'+this.editid,this.formdata).then((res)=>{
        console.log(res)
        this.$store.state.editcon=false;
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
        this.$store.state.data= this.nulldata;
        this.fun();
      })
    },
    del(id){
      axios.delete('http://localhost:3000/delete/'+id).then((res)=>{
        console.log(res.data)
        this.fun();
      })
    },
    readFile(event){
      this.file = event.target.files[0];
      Papa.parse( this.file, {
        header: true,
        skipEmptyLines: true,
        complete: function( results ){
            this.content = results.data;
            this.content.forEach(i=>{
              this.onSubmit(i);
            })
        }.bind(this)
      });
      this.fun()
    }
  }
}
</script>

<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
