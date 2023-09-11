const Address = require('../models/addressModel')

// @desc    Get all addresses
// @route   GET /api/addresses
// @access  Public
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({})
    res.status(200).json(addresses)
  } catch (error) {
    res.status(400).json({ message: 'Invalid address data.' })
  }
}

// @desc    Add an address
// @route   POST /api/addresses
// @access  Public
const addAddress = async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    return res.status(400).json({ message: 'Please enter all fields.' })
  }

  try {
    const address = await Address.create({
      title,
      description,
    })

    res.status(201).json({
      _id: address._id,
      title: address.title,
      description: address.description,
    })
  } catch (error) {
    res.status(400).json({ message: 'Invalid address data.' })
  }
}

// @desc   Delete an address
// @route  DELETE /api/addresses/:id
// @access Public
const deleteAddress = async (req, res) => {
  const address = await Address.findById(req.params.id)

  try {
    await address.deleteOne()
    res.status(200).json({ message: 'Address removed' })
  } catch (error) {
    res.status(404).json({ message: 'Address not found' })
  }
}

// @desc Edit an address
// @route PUT /api/addresses/:id
// @access Public
const editAddress = async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    return res.status(400).json({ message: 'Please enter all fields.' })
  }

  try {
    const address = await Address.findById(req.params.id)

    address.title = title
    address.description = description

    await address.save()

    res.status(201).json({
      _id: address._id,
      title: address.title,
      description: address.description,
    })
  } catch (error) {
    res.status(400).json({ message: 'Invalid address data.' })
  }
}

module.exports = { getAddresses, addAddress, deleteAddress, editAddress }
