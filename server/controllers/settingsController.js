const SiteSettings = require('../models/SiteSettings');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    } else {
      // Auto-migrate legacy phone and address if previously stored in DB
      let modified = false;
      if (!settings.primaryPhone || settings.primaryPhone.includes('98000') || settings.primaryPhone.includes('98160')) {
        settings.primaryPhone = '+91 98051 43007';
        modified = true;
      }
      if (!settings.secondaryPhone || settings.secondaryPhone.includes('98111') || settings.secondaryPhone.includes('98050')) {
        settings.secondaryPhone = '+91 98051 43007';
        modified = true;
      }
      if (!settings.whatsappNumber || settings.whatsappNumber.includes('98000') || settings.whatsappNumber.includes('98160')) {
        settings.whatsappNumber = '+91 98051 43007';
        modified = true;
      }
      if (!settings.address || settings.address.includes('176049') || !settings.address.includes('Amb Andaura')) {
        settings.address = 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India';
        settings.officeAddress = settings.address;
        settings.city = 'Amb Andaura, Kangra & Chandigarh';
        settings.pincode = '177203';
        modified = true;
      }
      if (!settings.googleMapEmbedUrl || settings.googleMapEmbedUrl.includes('Shimla') || !settings.googleMapEmbedUrl.includes('Amb+Andaura')) {
        settings.googleMapEmbedUrl = 'https://maps.google.com/maps?q=Amb+Andaura+Railway+Station,+Una+District,+Himachal+Pradesh+177203&t=&z=14&ie=UTF8&iwloc=&output=embed';
        modified = true;
      }
      if (!settings.siteName) {
        settings.siteName = 'Baglamukhi Tour & Travels';
        settings.companyName = 'BAGLAMUKHI TOUR & TRAVELS';
        modified = true;
      }
      if (!settings.logoUrl) {
        settings.logoUrl = '/baglamukhi-temple-logo.jpg';
        modified = true;
      }
      if (modified) {
        await settings.save();
      }
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
exports.updateSettings = async (req, res, next) => {
  try {
    let updateData = { ...req.body };
    if (updateData.siteName && !updateData.companyName) updateData.companyName = updateData.siteName;
    if (updateData.companyName && !updateData.siteName) updateData.siteName = updateData.companyName;
    if (updateData.officeAddress && !updateData.address) updateData.address = updateData.officeAddress;
    if (updateData.address && !updateData.officeAddress) updateData.officeAddress = updateData.address;
    if (updateData.bookingEmail && !updateData.supportEmail) updateData.supportEmail = updateData.bookingEmail;
    if (updateData.supportEmail && !updateData.bookingEmail) updateData.bookingEmail = updateData.supportEmail;

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(updateData);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, updateData, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};
