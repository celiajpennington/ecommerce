const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
router.get('/', async (req, res) => {
  try {
    // be sure to include its associated Products
    const categoryData = await Category.findAll({ include: [Product] });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find one category by its `id` value
// be sure to include its associated Product
router.get('/:id', async (req, res) => {
  try {
    await Category.findOne({
      where: { id: req.params.id },
      include: [Product]
    }).then(response => res.json(response));
  //  res.status(200).json(categoryData),
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Category.update({
      where: { id: req.params.id },
    }).then(response => res.json(response));
  //  res.status(200).json(categoryData),
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({
      where: { id: req.params.id },
    }).then(response => res.json(response));
  //  res.status(200).json(categoryData),
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
