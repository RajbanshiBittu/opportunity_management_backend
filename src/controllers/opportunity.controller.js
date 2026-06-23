import Opportunity from '../models/opportunity.model.js';

export const createOpportunity = async (req, res, next) => {
  try {
    // Inject backend user identity context explicitly
    const opportunityData = { ...req.body, owner: req.user._id };
    
    const opportunity = await Opportunity.create(opportunityData);
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getAllOpportunities = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find()
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
      
    res.json(opportunities);
  } catch (error) {
    next(error);
  }
};

export const getOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('owner', 'name email');
    
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity record not found' });
    }
    
    res.json(opportunity);
  } catch (error) {
    next(error);
  }
};

export const updateOpportunity = async (req, res, next) => {
  try {
    let opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity record not found' });
    }

    // Strict Backend Ownership Validation Barrier Block
    if (opportunity.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied: You cannot edit profiles owned by other colleagues' });
    }

    opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json(opportunity);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const deleteOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity record not found' });
    }

    // Strict Backend Ownership Validation Barrier Block
    if (opportunity.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied: You cannot delete items created by other users' });
    }

    await opportunity.deleteOne();
    res.json({ message: 'Opportunity entry cleanly purged from pipeline log successfully' });
  } catch (error) {
    next(error);
  }
};