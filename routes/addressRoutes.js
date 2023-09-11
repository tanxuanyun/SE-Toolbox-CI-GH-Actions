const express = require('express')
const router = express.Router()

const {
  getAddresses,
  addAddress,
  deleteAddress,
  editAddress,
} = require('../controllers/addressController')

router.route('/').get(getAddresses).post(addAddress)
router.route('/:id').delete(deleteAddress).put(editAddress)

module.exports = router
