const mongoose = require('mongoose');

const businessSchemeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  minAge: { type: Number, default: 0 },
  maxAge: { type: Number, default: 100 },
  minIncome: { type: Number, default: 0 },
  maxIncome: { type: Number, default: Infinity },
  businessType: [{ type: String, enum: ['startup', 'msme', 'agriculture', 'manufacturing', 'services', 'export', 'retail', 'technology', 'all'] }],
  minInvestment: { type: Number, default: 0 },
  maxInvestment: { type: Number, default: Infinity },
  states: [{ type: String }],
  benefits: [{ type: String }],
  eligibility: [{ type: String }],
  applicationProcess: [{ type: String }],
  deadline: { type: String, default: 'Ongoing' },
  website: { type: String, default: '' },
  fundingAmount: { type: String, default: '' },
  ministry: { type: String, default: '' },
  tags: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  collection: 'business_schemes'
});

businessSchemeSchema.index({ businessType: 1, minIncome: 1, maxIncome: 1 });
businessSchemeSchema.index({ states: 1 });

module.exports = mongoose.model('BusinessScheme', businessSchemeSchema);
