<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing v-on:click="edit()">Edit</b-button>
    <b-button v-b-modal.modal @click="del">Delete</b-button>
    <!-- <button v-on:click="del()">delete</button> -->
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
            this.$store.state.editcon=true;
            this.$store.state.idedit=this.cellValue;
            axios.get('http://localhost:3000/'+this.cellValue).then((res)=>{
                this.$store.state.data=res.data[0];
            })
        },
        del(){
            this.$store.state.delid=this.cellValue;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>