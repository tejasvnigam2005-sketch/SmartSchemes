const express = require('express');
const BusinessScheme = require('../models/BusinessScheme');
const EducationScheme = require('../models/EducationScheme');
const { getRequiredDocuments } = require('../utils/documentHelper');
const router = express.Router();

// ─── Relevance Scoring Engine ───────────────────────────────────────
function computeBusinessRelevance(scheme, filters) {
  let score = 0;
  const maxScore = 100;

  // Age match (20 points)
  if (filters.age >= scheme.minAge && filters.age <= scheme.maxAge) {
    score += 20;
  }

  // Income match (25 points)
  if (filters.income >= scheme.minIncome && filters.income <= scheme.maxIncome) {
    score += 25;
    const midIncome = (scheme.minIncome + Math.min(scheme.maxIncome, 10000000)) / 2;
    const distanceRatio = 1 - Math.abs(filters.income - midIncome) / Math.max(midIncome, 1);
    score += Math.max(0, distanceRatio * 5);
  }

  // Business type match (25 points)
  if (scheme.businessType.includes('all') || scheme.businessType.includes(filters.businessType)) {
    score += 25;
  }

  // Investment range match (15 points)
  if (filters.investment >= scheme.minInvestment && filters.investment <= scheme.maxInvestment) {
    score += 15;
  }

  // State match (15 points)
  if (scheme.states.includes('all') || scheme.states.includes(filters.state?.toLowerCase())) {
    score += 15;
  }

  // Keyword bonus (up to 5 extra points)
  if (filters.keywords && scheme.tags) {
    const keywords = filters.keywords.toLowerCase().split(/\s+/);
    const tagMatches = keywords.filter(kw => scheme.tags.some(tag => tag.toLowerCase().includes(kw)));
    score += Math.min(tagMatches.length * 2, 5);
  }

  return Math.min(Math.round(score), maxScore);
}

function computeEducationRelevance(scheme, filters) {
  let score = 0;
  const maxScore = 100;

  if (filters.age >= scheme.minAge && filters.age <= scheme.maxAge) score += 15;

  if (scheme.educationLevel.includes('all') || scheme.educationLevel.includes(filters.educationLevel)) score += 25;

  if (scheme.category.includes('all') || scheme.category.includes(filters.category)) score += 25;

  if (filters.income >= scheme.minIncome && filters.income <= scheme.maxIncome) {
    score += 20;
    const midIncome = (scheme.minIncome + Math.min(scheme.maxIncome, 10000000)) / 2;
    const distanceRatio = 1 - Math.abs(filters.income - midIncome) / Math.max(midIncome, 1);
    score += Math.max(0, distanceRatio * 5);
  }

  if (scheme.fieldOfStudy.includes('all') || scheme.fieldOfStudy.includes(filters.fieldOfStudy?.toLowerCase())) score += 10;

  if (scheme.states.includes('all') || scheme.states.includes(filters.state?.toLowerCase())) score += 10;

  return Math.min(Math.round(score), maxScore);
}

// ─── POST /api/recommend ────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { category, filters } = req.body;

    if (!category || !filters) {
      return res.status(400).json({ message: 'Category and filters are required' });
    }

    let schemes = [];
    let scoredSchemes = [];

    if (category === 'business') {
      const query = {};
      if (filters.businessType) {
        query.businessType = { $in: [filters.businessType, 'all'] };
      }
      if (filters.income) {
        query.minIncome = { $lte: Number(filters.income) };
        query.maxIncome = { $gte: Number(filters.income) };
      }

      schemes = await BusinessScheme.find(query).lean();
      scoredSchemes = schemes.map(scheme => ({
        ...scheme,
        relevanceScore: computeBusinessRelevance(scheme, filters)
      }));
    } else if (category === 'education') {
      const query = {};
      if (filters.educationLevel) {
        query.educationLevel = { $in: [filters.educationLevel, 'all'] };
      }
      if (filters.category) {
        query.category = { $in: [filters.category, 'all'] };
      }
      if (filters.income) {
        query.minIncome = { $lte: Number(filters.income) };
        query.maxIncome = { $gte: Number(filters.income) };
      }

      schemes = await EducationScheme.find(query).lean();
      scoredSchemes = schemes.map(scheme => ({
        ...scheme,
        relevanceScore: computeEducationRelevance(scheme, filters)
      }));
    } else {
      return res.status(400).json({ message: 'Invalid category. Use "business" or "education"' });
    }

    // Sort by relevance and return top results
    scoredSchemes.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Attach required documents to each scheme
    const enriched = scoredSchemes.slice(0, 5).map(scheme => ({
      ...scheme,
      requiredDocuments: getRequiredDocuments(scheme, category)
    }));

    res.json({
      category,
      totalMatches: scoredSchemes.length,
      results: enriched
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ message: 'Server error during recommendation' });
  }
});

module.exports = router;
