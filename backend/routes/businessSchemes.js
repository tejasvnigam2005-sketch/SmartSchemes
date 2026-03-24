const express = require('express');
const BusinessScheme = require('../models/BusinessScheme');
const router = express.Router();

// GET /api/business-schemes
router.get('/', async (req, res) => {
  try {
    const { businessType, state, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };

    if (businessType) query.businessType = { $in: [businessType, 'all'] };
    if (state) query.states = { $in: [state.toLowerCase(), 'all'] };

    const schemes = await BusinessScheme.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .lean();

    const total = await BusinessScheme.countDocuments(query);

    res.json({
      schemes,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching business schemes' });
  }
});

// GET /api/business-schemes/:id
router.get('/:id', async (req, res) => {
  try {
    const scheme = await BusinessScheme.findById(req.params.id).lean();
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
