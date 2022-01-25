const express = require('express')
const app =express();
var cors = require('cors')
const db =require('./db');

app.use(cors())
app.use(express.json());

async function fun(){
    const res = await db.query("SELECT * FROM tag_wise_price_drops3;")
}

app.listen(3000,()=>{
    console.log('server is listening at 3000');
})

app.get('/',async function (req, res) {
    const data = await db.query(`SELECT * FROM tag_wise_price_drops3;`)
    res.send(data.rows);
})

app.get('/:id',async function (req, res) {
    const id=req.params.id;
    const data = await db.query(`SELECT * FROM tag_wise_price_drops3 WHERE id=$1;`,[id])
    res.send(data.rows);
})

app.post("/insert",async function(req, res) {
    const input=req.body;
    const data = await db.query(`INSERT INTO tag_wise_price_drops3(id,tag,catalogue_name,sku_id,deal_price,moq,commission_percent,coupon_code)VALUES($1,$2,$3,$4,$5,$6,$7,$8);`,[input.id,input.tag,input.catalogue_name,input.sku_id,input.deal_price,input.moq,input.commission_percent,input.coupon_code]);
    res.send("Inserted");
});

app.put("/insert/:id",async function(req, res) {
    const id=req.params.id;
    const input=req.body;
    const data = await db.query(`UPDATE tag_wise_price_drops3 SET id=$1,tag=$2,catalogue_name=$3,sku_id=$4,deal_price=$5,moq=$6,commission_percent=$7,coupon_code=$8 WHERE id=$9;`,[input.id,input.tag,input.catalogue_name,input.sku_id,input.deal_price,input.moq,input.commission_percent,input.coupon_code,id])
    res.send("Updated");
});

app.delete("/delete/:id",async function(req, res) {
    const id=req.params.id;
    const data = await db.query(`DELETE FROM tag_wise_price_drops3 WHERE id=$1;`,[id])
    res.send("Deleted");
});
