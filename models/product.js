const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    spec: {
        type: {
            fabric: String,
            pattern: String,
            fit: String,
            neck: String,
            sleeve: String,
            style: String,
        }
    },
    colors: {
        type: Array,
        required: true
    },
    price: {
        type: Array,
        required: true
    },
    Avatar: {
        type: Array,
        required: false
    },
    rating: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

// Create text index on the title field
productSchema.index({ title: 'text' });

const ProductModel = mongoose.model('ProductModel', productSchema);

ProductModel.createIndexes();

module.exports = ProductModel;