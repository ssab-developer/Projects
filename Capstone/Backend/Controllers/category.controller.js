const categoryModel = require('../Models/category.model')
const slugify = require('slugify')


addNewCategory = (req, res) => {
    const categoryInput = {
        name: req.body.name,
        slug: slugify(req.body.name, {
            lower: true
        })
    };
    
    console.log(categoryInput);

    if (req.body.parentId) {
        categoryInput.parentId = req.body.parentId;
    }

    const _category = new categoryModel(categoryInput)

    _category.save((error, category) => {

        if (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "DB error occurred. Contact your administrator"
            })
        }
        if (category) {
            return res.json({
                success: true,
                message: "Category Saved Successfully",
                data: category
            })
        }
    })
}

getCategory = (req, res) => { }

module.exports = {
    getCategory,
    addNewCategory
}