const Success = (statusCode, result) => {

    return {
        status: 'success',
        statusCode: statusCode,
        result: result
    }

};

const Failure = (statusCode, message) => {

    return {
        status: 'error',
        statusCode: statusCode,
        message: message
    }

};

module.exports = {

    Success,
    Failure

}