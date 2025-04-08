import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    model:{
        type:String,
        enum:['Mountain' , 'Road' , 'Hybrid' , 'BMX' , 'Electric'],
        required:true
    },
    description :{
        type:String,
        required:true
    },
    image:[String],
    quantity:{
        type:Number,
        required:true
    },
    inStock:{
        type:Boolean,
        required:true
    }
})

const Product = model("Product",productSchema)

export default Product