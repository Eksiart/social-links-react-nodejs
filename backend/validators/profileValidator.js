const { validationResult, check } = require('express-validator')

module.exports.changeProfile = [
  check('login')
    .optional()
    .trim()
    .isAlphanumeric()
    .withMessage('invalid login')
    .bail()
    .isString()
    .withMessage('login string type is required')
    .bail()
    .isLength({ max: 20 })
    .withMessage('login max length 20')
    .bail()
    .isLength({ min: 1 })
    .withMessage('login min length 1'),
  check('status')
    .optional()
    .trim()
    .isString()
    .withMessage('status string type is required')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next()
    }
  }
]

module.exports.deleteProvider = [
  check('provider')
    .trim()
    .isIn(["google", "fb", "vk"])
    .withMessage('provider is required: google, fb,  vk'),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next()
    }
  }
]