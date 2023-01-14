const db = require('../config/connection');
const collection = require('../config/collections');
const objectId = require('mongodb-legacy').ObjectId;

module.exports={
    addProduct:(product,callback)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
            callback(data.insertedId);
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
            resolve(products);
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
                // console.log(response);
                resolve(response);
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            // console.log(proId);
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product);
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},
            {$set:{
                name: proDetails.name, 
                description: proDetails.description, 
                price: proDetails.price
            }}).then((response)=>{
                resolve(response);
            })
        })
    }
}