import { UserModel } from '../models/BuyMe'

exports.GetUserAccount = async (req, res) => {
    const user_id = req.query.user_id
    let user = await UserModel.findOne({ user_id });
    if(!user) throw new Error('userID not found!');
    res.send({data: user});

}

exports.EditUserAccount = async (req, res) => {
    
    let item = req.body.item;
    let newValue = req.body.newValue;
    
    const existing = await UserModel.findOne({user_id: req.body.user_id}); 

    if(existing){
        // Update UserModel
        try {
            res.json({message: `Updating ${item} to ${req.body.newValue}!`});
            if(item === 'name'){
            return UserModel.findOneAndUpdate(
                {
                    user_id: req.body.user_id
                },
                {
                    name: newValue
                }
            )}else if(item === 'bankaccount'){
            return UserModel.findOneAndUpdate(
                {
                    user_id: req.body.user_id
                },
                {
                    bankaccount: newValue
                }
            )}
            
        } catch (e) { 
            throw new Error("Account updating error: " + e); }
    }else{
        res.json({message: `Account doesn't exist!`});
        
    }

}

exports.ChangePassword = async (req, res) => {
    const user_id = req.body.user_id
    const password =  req.body.newPasswordEncrypted
    const existing = await UserModel.findOne({user_id}); 
    if(existing){
        try {
            res.json({message: `Updating ${user_id}'s password!`});
            return UserModel.findOneAndUpdate({
                        user_id
                    },{
                        password
                    })
        
        }catch(e){
            throw new Error("Password updating error: " + e); }
    }else{
        res.json({message: `Account doesn't exist!`});
    }


}