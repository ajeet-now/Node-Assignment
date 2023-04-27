require('dotenv').config();
const jwt = require('jsonwebtoken')
const models = require('../models'); 
const { Op } = require("sequelize");
const Api400Error = require('../error/api400Error')

exports.pre_process_generate = async (req) => {
    return req.body
}

exports.process_generate = async (input) => {
    const { email } = input
    const now = new Date();
    const expiration_date = new Date(now.getTime() + 10 * 60000);
    let otp;
    const [otp_instance , created] = await models.Otp.findOrCreate({
        where: {
            email: email,
            is_verified:false,
            expiration_date: {
                [Op.gt]:now
            }
        },
        defaults: {
            expiration_date: expiration_date,
            otp: otp_generator(),
        }
    });
    otp = otp_instance.otp
    return { otp }
}

exports.post_process_generate = async (data, resp) => {
    const { otp } = data
    console.log("otp : ", otp);
    resp.status(200).send({status:"success",message:"otp sent successfully", data:{otp}})
}

exports.pre_process_verify = async (req) => {
    return req.body
}

exports.process_verify = async (input) => {
    const { email, otp } = input 
    const current_date = new Date();
    const otp_instance = await models.Otp.findOne({
        where:
        {
            otp: otp,
            email: email,
        },
        order: [ [ 'createdAt', 'DESC' ]],
    });
    if (!otp_instance) {
        throw new Api400Error("otp not matched")
    }
    if (otp_instance.expiration_date < current_date) {
        throw new Api400Error("otp exprired")
    }
    if (otp_instance.is_verified) {
        throw new Api400Error("otp already used")
    }

    otp_instance.is_verified = true
    await otp_instance.save();

    const [user, created] = await models.User.findOrCreate({
        where: {
            email: email
        }
    })
    return  jwt.sign(
        {
            user_id: user.id,
        },
        process.env.JWT_SECRET_KEY,
    );
}

exports.post_process_verify = async (token,resp) => {
    resp.status(200).send({ status: "success", message:"otp matched", data: {jwt_token:token} }); 
}

function otp_generator() {
    var digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}