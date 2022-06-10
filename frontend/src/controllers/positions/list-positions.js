import {auth as authModel} from "../../models/auth";

const listPositions = (router) => {
    return async (req, res, next) => {
        const result = await authModel()
        if (result.ret) {
            next()
            res.render('position')
        } else {
            router.go('/signin')
        }
    }
}

export default listPositions