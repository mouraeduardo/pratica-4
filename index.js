const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded());
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './views');

// LISTA

const Categorias = [{chave: 0, value: 'teste'}, {chave: 2,value: 'teste 2'}]
const Produtos = [{ id: 0, name: 'teste', category: "teste", description: 'apenas um teste', price: 200.00}]

// FIM DA LISTA

// ROTAS DA API

app.get('/categorias', (req, res) => {
  return res.json(Categorias)
});

app.post('/categoria-salvar',(req, res) => {
  const novaCategoria = req.body;

  console.log(req.body);
  Categorias.push(novaCategoria);
  //console.log(categorias);
  
  res.redirect('/categoria');
  });

app.get('/categoria-deletar/:index', (req, res) => {

  const {index} = req.params;

  for (let i = 0; i < Categorias.length; i++) {
    const element = Categorias[i];
    if(element.chave == index){
      Categorias.splice(i, 1);
    }
  }
  
  res.redirect('/categoria');
});

app.post('/produto-salvar',(req, res) => {
  const index = Produtos.length;

  const produtoNew = {
    id: index,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price
  }

  Produtos.push(produtoNew);
  
  res.redirect('/produtos');
  });

  app.post('/produto-editar/:index',(req, res) => {

    const {index} = req.params;

    const produtoNew = {
      id: index,
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price
    }

    Produtos[index] = produtoNew;
    
    res.redirect('/produtos');
    });

// FIM ROTAS DA API

// ROTAS DEAS VIEWS 
app.get('/home', (req, res) => {
  res.render('../views/home')
});

app.get('/categoria', (req, res) => {
  res.render('../views/categoria', {Categories: Categorias})
});

app.get('/produto-editar', (req, res) => {
  const index = req.query.id;
  console.log(index);
  console.log(Produtos[index]);
  res.render('../views/editarProduto', {product: Produtos[index], Categories: Categorias})
});

app.get('/produto-salvar', (req, res) => {
  res.render('../views/cadastrarProduto', {Products: Produtos, Categories: Categorias})
});

app.get('/produtos', (req, res) => {
  res.render('../views/produto', {Products: Produtos, Categories: Categorias})
});

// FIM DAS ROTAS DAS VIEWS


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  