const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/test', (req, res) => {
  res.render('testView', {
    data: {},
    errors: [],
    errorMap: {},
    csrfToken: req.csrfToken()
  })
})

router.post('/test', [
  check('message')
    .isLength({ min: 1 })
    .withMessage('Message is required')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('That email doesn‘t look right')
    .trim()
    .normalizeEmail()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('testView', {
      data: req.body,
      errors: errors.array(),
      errorMap: errors.mapped(),
      csrfToken: req.csrfToken()
    })
  }

  const data = matchedData(req)
  console.log('Sanitized: ', data)
  // Homework: send sanitized data in an email or persist in a db

  req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/')
})

module.exports = router