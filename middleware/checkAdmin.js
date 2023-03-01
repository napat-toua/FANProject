module.exports.isAdmin = ( req, res, next ) => {
    const { role } = req.user

    if ( role === 'admin' ){
        next()
    }
    else{
        return res.status(403).json({
            message: 'Error: You do not have permission, reserve for Admin only'
        })
    }
}