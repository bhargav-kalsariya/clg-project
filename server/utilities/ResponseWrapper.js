const Success = (statusCode, result) => {

    return {
        status: 'success',
        statusCode,
        result
    }

};

const Failure = (statusCode, message) => {

    return {
        status: 'error',
        statusCode,
        message
    }

};

module.exports = {

    Success,
    Failure

}