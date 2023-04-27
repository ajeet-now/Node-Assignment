const user_manager = require('../managers/user_manager')

exports.get_user = async (req, resp) => {
    try {
        const input_response = await user_manager.pre_process_get_user(req)
        const processed_response = await user_manager.process_get_user(input_response)
        await user_manager.post_process_get_user(processed_response, resp)
    } catch (e) {
        const status_code = e.statusCode ? e.statusCode : 500
        return resp.status(status_code).send({ status: "failure", message: e.name, data:{} })
    }
}

exports.update_user = async (req, resp) => {
    try {
        const input_response = await user_manager.pre_process_update_user(req)
        const  processed_response =  await user_manager.process_update_user(input_response,req)
        await user_manager.post_process_update_user(processed_response, resp)
    } catch (e) {
        const status_code = e.statusCode ? e.statusCode : 500
        return resp.status(status_code).send({ status: "failure", message: e.name, data: {} })
    }
}
    
exports.upload_profile_pic = async (req, resp) => {
    try {
        const input_response = await user_manager.pre_process_upload_profile_pic(req)
        const processed_response = await user_manager.process_upload_profile_pic(input_response)
        await user_manager.post_process_upload_profile_pic(processed_response,resp)
    } catch (e) {
        const status_code = e.statusCode ? e.statusCode : 500
        return resp.status(status_code).send({ status: "failure", message: e.name,data:{}})
    }
}



