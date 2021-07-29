const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all Tags
router.get('/', async (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(500).json(err));
});
// find one id by its `id` value
// be sure to include its associated Product
router.get('/:id', async (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

//create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    await Tag.update({
      where: { id: req.params.id },
    }).then(response => res.json(response));
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy({
      where: { id: req.params.id },
    }).then(response => res.json(response));
    //  res.status(200).json(categoryData),
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
