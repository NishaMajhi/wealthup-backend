const errorHanlder = async (err, req, res, next) => {

    const statusCode = res.statusCode === 500 ? 500 : res.statusCode

    res.status(statusCode).json({
        status: false,
        message: err.message
    })
}

export {
    errorHanlder
}