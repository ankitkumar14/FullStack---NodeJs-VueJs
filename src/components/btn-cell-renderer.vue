<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing v-on:click="edit()">edit</b-button>
    <button v-on:click="del()">delete</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'BtnCellRenderer',
  data(){
    return{
        cellValue:null,
    }
  },
  beforeMount() {
        this.cellValue = this.params.value;
    },
  methods: {
        edit() {
            console.log(this.cellValue);
            this.$store.state.editcon=true;
            this.$store.state.idedit=this.cellValue;
            axios.get('http://localhost:3000/'+this.cellValue).then((res)=>{
                this.$store.state.data=res.data[0];
            })
        },
        del(){
            console.log('delete : ',this.cellValue)
            axios.delete('http://localhost:3000/delete/'+this.cellValue).then((res)=>{
                console.log(res.data)
            })
            axios.get('http://localhost:3000/').then((res)=>{
                this.$store.state.row=res.data;
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>