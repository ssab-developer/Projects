const slugify = require('slugify')
const categoryModel = require('../Models/category.model')


const addNewCategory = (req, res) => {
    const categoryInput = {
        name: req.body.name,
        slug: slugify(req.body.name, {
            lower: true
        })
    };
    categoryInput.createBy = req.user.id;
    console.log(categoryInput);

    if (req.body.parentId) {
        categoryInput.parentId = req.body.parentId;
    }

    const _category = new categoryModel(categoryInput);

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

const getCategory = async (req, res) => {

    // categoryModel.find({}, "name parentId").exec((error, category) => {
    //     if (error) {
    //         console.log(error)
    //         return res.status(500).json({
    //             success: false,
    //             message: "DB Error occurred. Contact your Administrator",
    //             error: error
    //         })
    //     }
    //     if (category) {
    //         return res.json({
    //             category
    //         })
    //     }
    // });

    try {
        const category = await categoryModel.find({}, "name parentId");
        return res.json({
            data: category,
            message: "success"
        });
    }
    catch (error) {
        return res.json({
            message: error
        })
    }
}

module.exports = {
    getCategory,
    addNewCategory
}