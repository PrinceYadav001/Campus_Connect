const Problem = require("./models/problem.js");
const { problemSchema } = require("./schema.js");
const { solutionSchema } = require("./schema.js");
const Solution = require("./models/solution.js");
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a problem!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    let { id } = req.params;
    let problem = await Problem.findById(id);
    if (!problem.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this problem");
        return res.redirect(`/problems/${id}`);
    }
    next();
};

module.exports.validateProblem = (req, res, next) => {
    const { error } = problemSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateSolution = (req, res, next) => {
    const { error } = solutionSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isSolutionAuthor = async (req, res, next) => {
    let { solutionId, id } = req.params;
    let solution = await Solution.findById(solutionId);
    if (!solution) {
        req.flash("error", "Solution does not exist");
        return res.redirect(`/problems/${id}`);
    }
    if (!solution.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not allowed to delete this solution");
        return res.redirect(`/problems/${id}`);
    }
    next();
};