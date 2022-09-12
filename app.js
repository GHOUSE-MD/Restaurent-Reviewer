const fs=require('fs');
const path=require('path');
const express =require('express');
const app=express();
const uuid=require('uuid')

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/',function(req,res){
    res.render('index');
});



app.get('/restaurants',function(req,res){
    const filePath=path.join(__dirname,'data','restaurants.json');

    const fileData=fs.readFileSync(filePath)
    const storedRestaurant =JSON.parse(fileData);
    res.render('restaurants',{
        numberOfResataurent: storedRestaurant.length,
        restaurants: storedRestaurant},
    );
});
app.get('/restaurants/:id', function(req,res){
    const restaurantId=req.params.id;
    res.render('restaurants-detail',{ rid:restaurantId});
});

app.get('/recommend',function(req,res){
    res.render('recommend');
});

app.post('/recommend',function(req,res){
    const restaurant=req.body;
    restaurant.id =uuid.v4();
    const filePath=path.join(__dirname,'data','restaurants.json');

    const fileData=fs.readFileSync(filePath)
    const storedRestaurant=JSON.parse(fileData);
    storedRestaurant.push(restaurant);
    fs.writeFileSync(filePath,JSON.stringify(storedRestaurant));
    res.redirect('/confirm');
    
});

app.get('/confirm',function(req,res){
    res.render('confirm');
});

app.get('/about',function(req,res){
    res.render('about');
});




app.listen(3000);