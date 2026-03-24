const express = require('express');
const EducationScheme = require('../models/EducationScheme');
const router = express.Router();

// GET /api/education-schemes
router.get('/', async (req, res) => {
  try {
    const { educationLevel, category, state, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };

    if (educationLevel) query.educationLevel = { $in: [educationLevel, 'all'] };
    if (category) query.category = { $in: [category, 'all'] };
    if (state) query.states = { $in: [state.toLowerCase(), 'all'] };

    const schemes = await EducationScheme.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .lean();

    const total = await EducationScheme.countDocuments(query);

    res.json({
      schemes,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching education schemes' });
  }
});

// GET /api/education-schemes/:id
router.get('/:id', async (req, res) => {
  try {
    const scheme = await EducationScheme.findById(req.params.id).lean();
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
