const models = require('../models')
const Api400Error = require('../error/api400Error')

exports.pre_process_get_user = async (req) => {
    return req.user;
}

exports.process_get_user = async (input_data) => {
    const { user_id} = input_data
    const user = await models.User.findByPk(user_id)
    if (!user) {
        throw new Api400Error("bad request")
    }
    return user;
}

exports.post_process_get_user = async (user, resp) => {
    resp.status(200).send({status:"success",message:"user retrieved successfully",data:user})
}


exports.pre_process_update_user = async (req) => {
    return {user_id: req.user.user_id , data:req.body}
}

exports.process_update_user = async (input_data) => {
    const { user_id, data } = input_data
    await models.User.update(data, {
        where: {
          id:user_id
        },
        options: { returning: true }
    })
    return await models.User.findByPk(user_id)
}

exports.post_process_update_user = async (data, resp) => {
    resp.status(200).send({status:"success",message:"user updated successfully", data:data})
}


exports.pre_process_upload_profile_pic = async (req) => {
    return {user_id:req.user.user_id,image:req.files.image }
}

exports.process_upload_profile_pic = async (input_data) => {
    const { user_id, image } = input_data
    const image_size = image.size / 1024 / 1024
    if (image_size > 5) {
      throw new Api400Error("Profile picture size should not exceed 5MB")
    }
    await models.User.update({ photo: image }, {
        where: {
            id:user_id
        }
    })
    return await models.User.findByPk(user_id)
}

exports.post_process_upload_profile_pic = async (data,resp) => {
    resp.status(200).send({status:"success",message:"profile pic updated successfully ", data:data})
}