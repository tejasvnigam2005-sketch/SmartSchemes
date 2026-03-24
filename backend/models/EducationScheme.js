const mongoose = require('mongoose');

const educationSchemeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  minAge: { type: Number, default: 0 },
  maxAge: { type: Number, default: 100 },
  educationLevel: [{ type: String, enum: ['school', 'ug', 'pg', 'phd', 'diploma', 'all'] }],
  category: [{ type: String, enum: ['general', 'sc', 'st', 'obc', 'ews', 'minority', 'all'] }],
  minIncome: { type: Number, default: 0 },
  maxIncome: { type: Number, default: Infinity },
  fieldOfStudy: [{ type: String }],
  states: [{ type: String }],
  benefits: [{ type: String }],
  eligibility: [{ type: String }],
  applicationProcess: [{ type: String }],
  deadline: { type: String, default: 'Ongoing' },
  website: { type: String, default: '' },
  scholarshipAmount: { type: String, default: '' },
  ministry: { type: String, default: '' },
  tags: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  collection: 'education_schemes'
});

educationSchemeSchema.index({ educationLevel: 1 });
educationSchemeSchema.index({ category: 1 });
educationSchemeSchema.index({ states: 1 });

module.exports = mongoose.model('EducationScheme', educationSchemeSchema);
