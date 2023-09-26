const mongoose=require('mongoose');
//const codePostale=require('./User');
const codePostaleSchema= new mongoose.Schema({
    Gov: {
        type: String,
        required: true,
      },
      Deleg: {
        type: String,
        required: true,
      },
      Cite: {
        type: String,
        required: true,
      },
      Zip: {
        type: Number,
        required: true,
      },
    
    

})
const codePostale = mongoose.model('codePostale', codePostaleSchema);
module.exports=codePostale;
