const slugify = require('slugify')

const productModel = require('../Models/product.model');

const addNewProduct = (req, res) =>{
    const {
        name,
        prize,
        description,
        quantity,
        category
    } = req.body

    const _product = new productModel({
        name,
        slug: slugify(name),
        prize,
        description,
        quantity,
        category,
        createdBy: req.user.id
    })
    _product.save((error,product)=>{
        if(error)
        {
            return res.status(500).json({
                error: error,
                success: false,
                message: "Db Error Occurred. Contact your Administrator"
            })
        }
        if(product){
            return res.status(201).json({
                success: true,
                data: product,
                message: "Product Saved Successfully."
            })
        }
    })
}

module.exports = {
    addNewProduct
}