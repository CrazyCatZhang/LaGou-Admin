import positionsTpl from '../../views/positions.art'
import positionsListTpl from '../../views/positions-list.art'

import pagination from '../../components/pagination'

import {auth as authModel} from "../../models/auth";
import addPositions from "./add-positions";

const listPositions = (router) => {
    return async (req, res, next) => {
        const result = await authModel()
        if (result.ret) {
            next()
            res.render(positionsTpl({}))
            addPositions()
        } else {
            router.go('/signin')
        }
    }
}

export default listPositions