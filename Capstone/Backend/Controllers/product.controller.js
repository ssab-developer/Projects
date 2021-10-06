const slugify = require('slugify')
const { nanoid } = require('nanoid');
const productModel = require('../Models/product.model');

const addNewProduct = (req, res) => {
    const {
        name,
        prize,
        description,
        quantity,
        category
    } = req.body


    let productImageList = [];
    if (req.files.length > 0) {
        productImageList = req.files.map((file) => {
            return {
                img: file.path
            }
        })
    }
    console.log(productImageList);

    const _product = new productModel({
        name,
        slug: slugify(name),
        prize,
        description,
        quantity,
        category,
        "productPicture": productImageList,
        createdBy: req.user.id
    })
    _product.save((error, product) => {
        if (error) {
            return res.status(500).json({
                error: error,
                success: false,
                message: "Db Error Occurred. Contact your Administrator"
            })
        }
        if (product) {
            return res.status(201).json({
                success: true,
                data: product,
                message: "Product Saved Successfully."
            })
        }
    })
}

const getProduct = async (req, res) => {
    try {
        const product = await productModel.find({})
        return res.json({
            data: product,
            message: "success"
        })
    }
    catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "DB Error Occurred. Contact your Administrator.",
            error: error
        })

    }
}

module.exports = {
    addNewProduct,
    getProduct
}