const mongoose = require('mongoose');

const excelSchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        trim:true,
        required: true
    },
    BusinessUnitName: {
        type: String,
        required: true,
        trim:true,
    },
    ReportingLevel4: {
        type: String,
        required: true,
        trim:true,
    },
    Quantity:{
        type:Number,
        required:true,
        trim:true
    },
    AmountEUR: {
        type:Number,
        required:true,
        trim:true
    },
    PostingYear: {
        type:Number,
        required:true,
        trim:true
    },
    PostingMonth: {
        type:Number,
        required:true,
        trim:true
    },
    ActionType: {
        type:String,
        required:true,
        trim:true
    },
    ActionNumber: {
        type:Number,
        required:true,
        trim:true
    },
    ActionName: {
        type:String,
        required:true,
        trim:true
    },
    Status: {
        type:String,
        required:true,
        trim:true
    }
},{timestamps: true });

module.exports = mongoose.model('excel',excelSchema)