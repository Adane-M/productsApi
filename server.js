const express = require('express');
// const bp = require('body-parser');
const {products} = require('./modules/products.js');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.listen(3001, () => {
  console.log('running on 3001');
})

// api/products - GET - all products
// CRUD - READ - GET
app.get('/api/products' , (req,res)=>{
  res.json(products)
})

// /api/products/:id GET - search for a products by product id
// CRUD - READ - GET
app.get('/api/products/:id', (req,res)=>{
  const id = req.params.id;
  const product = products.find(item => item.id == id);
  if(!product) {
    return res.status(404).json({message:'Product not found'})
  }
  res.json(product);
})

// /api/search?name= GET - search for a products by name
// CRUD - READ - GET
app.get('/api/search',(req,res)=>{
  const product_name = req.query.name;
  const products_result = products.filter(item => {
    return item.name.toLowerCase().includes(product_name.toLowerCase())
  })
  if(products_result.length === 0){
    return res.status(200).json({msg:'No Products matched your search'})
  }
  res.json(products_result)
})

// /api/products POST - to create a new products
// CRUD - CREATE - POST
app.post('/api/products' ,(req,res)=>{
   console.log(req.body);
   const new_product = {
     id: products.length + 1,
     name: req.body.name,
     price: req.body.price
   }
   products.push(new_product);
   res.status(201).json(products)
})


// CRUD - DELETE - DELETE
app.delete('/api/products/:id', (req,res)=>{
  const id = req.params.id;
  const index = products.findIndex(item => item.id == id);
  if(index === -1) {
    return res.status(404).json({msg:'Not Found'})
  }
  products.splice(index,1);
  res.status(200).json(products)
})

// /api/products/:id PUT - update a product info
// CRUD - UPDATE -PUT
app.put('/api/products/:id', (req,res)=>{
  const id = req.params.id;
  const index = products.findIndex(item => item.id == id);
  if(index === -1) {
    return res.status(404).json({msg:'Not Found'})
  }

  products[index] = {...products[index], name:req.body.name, price:req.body.price}
  res.status(200).json(products)
})
