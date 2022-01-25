<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <form>
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
  <br><br>
  <h3>Upload Data via CSV file</h3>
  <input type = "file" @change = "readFile">
  <br><br>
  <table>
    <tr>
      <th>Id</th>
      <th>Tag</th>
      <th>Catalogue Name</th>
      <th>Sku ID</th>
      <th>Deal Price</th>
      <th>Moq</th>
      <th>Commission Percent</th>
      <th>Coupon Code</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
    <tr v-for='data in datas' :key='data.id'>
      <td>{{data.id}}</td>
      <td>{{data.tag}}</td>
      <td>{{data.catalogue_name}}</td>
      <td>{{data.sku_id}}</td>
      <td>{{data.deal_price}}</td>
      <td>{{data.moq}}</td>
      <td>{{data.commission_percent}}</td>
      <td>{{data.coupon_code}}</td>
      <th><button v-on:click="edit(data.id)">Edit</button></th>
      <th><button v-on:click="del(data.id)">Delete</button></th>
    </tr>
  </table>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Papa from 'papaparse';
import axios from "axios";
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      datas:{},
      file: '',
      content: [],
      formdata:{
        id:null,
        tag:null,
        catalogue_name:null,
        sku_id:null,
        deal_price:null,
        moq:null,
        commission_percent:null,
        coupon_code:null
      },
      editcond:0,
      editid:null
    }
  },
  async mounted(){
    this.fun()
  },
  methods:{
    fun(){
      axios.get('http://localhost:3000/').then((res)=>{
        this.datas=res.data;
      })
    },
    onSubmit(data){
      axios.post('http://localhost:3000/insert',data).then((res)=>{
        console.log(res.data)
        this.fun();
      })
    },
    edit(id){
      this.editcond=1;
      this.editid=id;
      axios.get('http://localhost:3000/'+id).then((res)=>{
        this.formdata=res.data[0];
      })
    },
    save(){
      axios.put('http://localhost:3000/insert/'+this.editid,this.formdata).then((res)=>{
        console.log(res)
        this.editcond=0;
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
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
