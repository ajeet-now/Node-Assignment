const otp_manager = require('../managers/otp_manager')

exports.generate = async (req, resp) => {
    try {
        const input_response = await otp_manager.pre_process_generate(req)
        const process_response = await otp_manager.process_generate(input_response)
        await otp_manager.post_process_generate(process_response, resp)
    } catch (e) {
        const status_code = e.statusCode ? e.statusCode : 500
        return resp.status(status_code).send({ status: "failure", message: e.name, data:{}})
    }
}

exports.verify = async (req, resp) => {
    try {
        const input_response = await otp_manager.pre_process_verify(req)
        const process_response = await otp_manager.process_verify(input_response)
        await otp_manager.post_process_verify(process_response, resp)
    } catch (e) {
        const status_code = e.statusCode ? e.statusCode : 500
        return resp.status(status_code).send({ status: "failure", message: e.name, data : {} })
    }
}