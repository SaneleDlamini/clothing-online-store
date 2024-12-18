const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const auth = require('../middleware/authMiddleware');
const path = require('path');
const multer = require('multer');


//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    const { searchTerm, gender, category, page = 1, limit = 10 } = req.query;
    try {
        let query = {}

        if (searchTerm) {
            query.$or = [
                { title: { $regex: searchTerm, $options: 'i' } }, 
                { description: { $regex: searchTerm, $options: 'i' } },
            ];
        }

        if (gender) {
            query.gender = gender;
        }

        if (category) {
            query.category = category;
        }

        const skip = (page - 1) * limit;

        const products = await Product.find(query).limit(parseInt(limit))
        .skip(skip);

        // Get total count for pagination metadata
        const totalItems = await Product.countDocuments(query);

        if (products.length < 1) {
            return res.status(404).json({ message: "No products found" })
        }
        return res.status(200).json({ products, totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: parseInt(page), });
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message })
    }
});

router.get('/popular', async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true }).limit(10);
        if (products.length < 1) {
            return res.status(404).json({ message: "No popular products found" })
        }
        return res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message })
    }
});

router.get('/sale', async (req, res) => {
    try {
        const products = await Product.find({ onSale: true });
        if (products.length < 1) {
            return res.status(404).json({ message: "No on sale products found" })
        }
        return res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ error: "The product not found" });
        }
        return res.status(200).json({ product })
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message })
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file);
    try {
        const image = req.file.filename;
        const { title, price, description, salePrice, onSale, discount,
            quantity, category, subCateGory, gender, totalInStock, isFeatured } = req.body;

        const product = await new Product({
            title, price, description, salePrice, onSale, discount,
            quantity, category, subCateGory, gender, totalInStock, isFeatured, image
        });

        if (!image) {
            return res.status(400).send('Image upload failed');
        }
        console.log(req.file);

        if (!product) {
            return res.status(400).json({ error: "Failed to create a product" })
        }
        console.log(req.file);
        await product.save();
        return res.status(200).json({ message: "Product created successfully!", product })
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message })
    }
});

router.put('/:id', async (req, res) => {
    const { title, price, description, onSale, salePrice, discount, quantity, image, category, subCategory, gender, size, color, totalInStock, isFeatured } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            title, price, description, onSale, salePrice, discount, quantity, image, category, subCategory, gender, size, color, totalInStock, isFeatured
        });

        if (!product) {
            return res.status(400).json({ error: "Product to be updated not found" })
        }
        return res.status(200).json({ message: "Product updated successfrully", product })
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(400).json({ error: "The product to be deleted not found" })
        }
        return res.status(200).json({ message: "Product deleted successfully!", product })
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message })
    }
});

module.exports = router;