import memberRepository from "../repositories/member.repository.js";
import ServerError from "../helpers/error.helper.js";

const memberMiddleware = (roles) => {
    return async (req, res, next) => {
        const member_id = req.params.member_id;
        const member_selected = await memberRepository.getById(member_id);
        if (!member_selected) {
            throw new ServerError("You are not a member of this workspace", 404);
        }
        req.member_selected = member_selected;
        next();
    }
}

export default memberMiddleware;
