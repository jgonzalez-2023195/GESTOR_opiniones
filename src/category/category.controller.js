import Category from './category.model.js'

export const newCat = async(req, res)=> {
    const data = req.body
    try {
        let category = new Category(data)
        category.categoryPicture = req.file.filename ?? null
        await category.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Category successfully added to the system'
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when add category for system',
                e
            }
        )
    }
}

export const listCat = async(req, res)=> {
    const {limit, skip} = req.query
    try {
        let category = await Category.find().skip(skip).limit(limit).populate(
            {
                path: 'parentCategory',
                select: 'name -_id'
            }
        )
        if(!category.lenth === 0) return res.status(404).send({message: 'Cateographies not found'})
            return res.status(200).send({message: 'Categories found: ', category})
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error cannot see categories in the system',
                e
            }
        )
    }
}

export const updateCat = async(req, res)=> {
    try {
        let id = req.params.id
        let data = req.body
        const { filename } = req.file

        if (filename) {
            data.categoryPicture = filename;
        }

        let category = await Category.findByIdAndUpdate(id, data, {new: true})
        if(!category) return res.status(404).send(
            {
                success: false,
                message: 'Category not found, category not update'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Category updated succesfully',
                category
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updated category',
                e
            }
        )       
    }
}

export const deleteCat = async(req, res)=> {
    try {
        let id = req.params.id
        let category = await Category.findByIdAndDelete(id)
        if(!category) return res.status(404).send(
            {
                success: false,
                message: 'Category not found, category not delete'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Category deleted to system',
                category
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleted category',
                e
            }
        )
    }
}