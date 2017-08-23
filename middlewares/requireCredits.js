module.exports = (req, res, next) => {
    if (req.credits < 1) {
        return res.status(403).send({
            error: 'you have must have 1 credit!'
        })
    }

    next()
}
