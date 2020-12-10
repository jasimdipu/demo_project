module.exports = app => {
     const demo = require("../controllers/demo.controller");

     let router = require("express").Router();

     router.post('/', demo.create);

     router.get('/', demo.findAll);

     router.get('/findone/:id', demo.findOne);

     router.put('/update/:id', demo.update);

     router.delete('/delete/:id', demo.delete);

     router.get('/findall', demo.findAllDemo);

     app.use('/api/demo', router);
};