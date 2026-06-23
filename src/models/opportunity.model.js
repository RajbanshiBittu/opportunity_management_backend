import mongoose from 'mongoose';

const OpportunitySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer/Company name is required']
  },
  contactName: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  requirement: {
    type: String,
    required: [true, 'Requirement/Need summary is required']
  },
  estimatedValue: {
    type: Number,
    min: [0, 'Estimated deal value cannot be negative'],
    default: 0
  },
  stage: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  nextFollowUpDate: { type: Date },
  notes: { type: String }
}, { timestamps: true });

const Opportunity = mongoose.model('Opportunity', OpportunitySchema);
export default Opportunity;