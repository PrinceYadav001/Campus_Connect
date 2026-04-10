const joi = require("joi");

module.exports.problemSchema = joi.object({
  problem: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    category: joi.string().valid("CSE", "ECE", "IT", "MBA", "Other").required(),
    type: joi.string().valid(
      "Homework", "Project", "Exam", "Placement", "Campus",
      "Case Study", "Presentation", "Research", "Lab"
    ).required(),
    difficulty: joi.string().valid("easy", "medium", "hard").required(),
    deadline: joi.string().allow('', null).optional(),
    tags: joi.alternatives().try(
      joi.array().items(joi.string().allow('')),
      joi.string().allow('', null)
    ).optional().allow(null, ''),
    status: joi.string().valid("open", "solved").optional(),
    image: joi.object({
      filename: joi.string().allow("", null),
      url: joi.string().uri().allow("", null)
    }).optional()
  }).required()
});

module.exports.solutionSchema = joi.object({
  solution: joi.object({
    comment: joi.string().required(),
    rating: joi.number().min(1).max(5).optional()
  }).required(),
  approach: joi.string().allow('', null).optional()
});