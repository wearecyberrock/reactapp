import React, { useState, ChangeEvent, FormEvent } from 'react';
import { send } from '@emailjs/browser';
import { Link } from 'react-router-dom';
import './components/sumfestform.css';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  whatsAppNumber: string;
  originLocation: string;
  travelStatus: string;
  arrivalDate: string;
  arrivalAirport: string;
  accommodationStatus: string;
  groupSize: string;
  helpNeeded: string[];
  hasTicket: string;
  preferredContact: string;
  budgetRange: string;
  referralCode: string;
  additionalNotes: string;
}

export default function SumfestTravelForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    whatsAppNumber: '',
    originLocation: '',
    travelStatus: '',
    arrivalDate: '',
    arrivalAirport: '',
    accommodationStatus: '',
    groupSize: '',
    helpNeeded: [],
    hasTicket: '',
    preferredContact: '',
    budgetRange: '',
    referralCode: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentHelp = [...prev.helpNeeded];
      if (checked) {
        currentHelp.push(value);
      } else {
        const index = currentHelp.indexOf(value);
        if (index > -1) currentHelp.splice(index, 1);
      }
      return { ...prev, helpNeeded: currentHelp };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare parameters for EmailJS
    const templateParams = {
      ...formData,
      helpNeeded: formData.helpNeeded.join(', '), 
    };

    const serviceId = 'service_91zmng8';   
    const adminTemplateId = 'template_xk9vnxj'; 
    const welcomeTemplateId = 'template_67sydho'; 

    Promise.all([
      send(serviceId, adminTemplateId, templateParams),
      send(serviceId, welcomeTemplateId, templateParams)
    ])
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('Something went wrong. Please try again or contact us via WhatsApp.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isSubmitted) {
    return (
      <div className="sumfest-success-card">
        <div className="success-icon-wrapper">
          <svg className="checkmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h2 className="success-title">Inquiry Submitted! 🇯🇲</h2>
        <p className="success-message">
          Thank you, <strong className="success-highlight">{formData.fullName}</strong>. Your Reggae Sumfest travel logistics inquiry has been successfully sent.
        </p>
        <p className="success-details">
          A confirmation email has been dispatched to <strong>{formData.email}</strong>. Our logistics team will review your request and get in touch via <strong>{formData.preferredContact}</strong> shortly.
        </p>
        <div className="success-actions">
          <Link to="/" className="success-btn-home">Return to Home</Link>
          <a 
            href="https://wa.me/18768073847" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="success-btn-whatsapp"
          >
            Chat with Us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div id="sumfest-form" className="sumfest-form-card">
      {/* Decorative Header Banner */}
      <div className="sumfest-form-banner">
        <img 
          src="/sumfest-image.jpg?v=2" 
          alt="Reggae Sumfest Banner" 
          className="sumfest-banner-img"
        />
        <div className="sumfest-banner-overlay">
          <span className="sumfest-badge">Jamaica 2026</span>
          <h1 className="sumfest-banner-title">Reggae Sumfest Logistics</h1>
        </div>
        <div className="sumfest-accent-bar"></div>
      </div>

      <div className="sumfest-form-content">
        <div className="sumfest-intro">
          <h2>Travel Coordination & Support</h2>
          <p>
            Planning your trip to Montego Bay for Reggae Sumfest? Complete this inquiry form so our local specialists can coordinate airport transfers, hotel support, group shuttle services, and excursions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="sumfest-form-body">
          {/* Section 1: Contact Information */}
          <div className="sumfest-form-section">
            <h3 className="section-heading-custom">1. Contact Information</h3>
            
            <div className="sumfest-form-group">
              <label htmlFor="fullName" className="sumfest-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                className="sumfest-input"
              />
            </div>

            <div className="sumfest-form-group">
              <label htmlFor="email" className="sumfest-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="sumfest-input"
              />
            </div>

            <div className="sumfest-form-grid-2">
              <div className="sumfest-form-group">
                <label htmlFor="phone" className="sumfest-label">
                  Phone Number <span className="required-star">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+1 (123) 456-7890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="sumfest-input"
                />
              </div>

              <div className="sumfest-form-group">
                <label htmlFor="whatsAppNumber" className="sumfest-label">
                  WhatsApp Number <span className="label-optional">(if different)</span>
                </label>
                <input
                  type="tel"
                  id="whatsAppNumber"
                  name="whatsAppNumber"
                  placeholder="+1 (123) 456-7890"
                  value={formData.whatsAppNumber}
                  onChange={handleInputChange}
                  className="sumfest-input"
                />
              </div>
            </div>

            <div className="sumfest-form-group">
              <label htmlFor="originLocation" className="sumfest-label">
                Where are you traveling from? <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="originLocation"
                name="originLocation"
                required
                placeholder="City, Country (e.g. New York, USA)"
                value={formData.originLocation}
                onChange={handleInputChange}
                className="sumfest-input"
              />
            </div>
          </div>

          {/* Section 2: Travel Details */}
          <div className="sumfest-form-section">
            <h3 className="section-heading-custom">2. Travel Details</h3>
            
            <div className="sumfest-form-group">
              <label className="sumfest-label">
                Are you already in Jamaica or planning to travel? <span className="required-star">*</span>
              </label>
              <div className="sumfest-card-selector-grid-2">
                {['Already in Jamaica', 'Planning to travel to Jamaica'].map((option) => (
                  <label 
                    key={option} 
                    className={`sumfest-selector-card ${formData.travelStatus === option ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="travelStatus"
                      required
                      value={option}
                      checked={formData.travelStatus === option}
                      onChange={handleInputChange}
                      className="sumfest-radio-hidden"
                    />
                    <div className="selector-circle"></div>
                    <span className="selector-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sumfest-form-grid-2">
              <div className="sumfest-form-group">
                <label htmlFor="arrivalDate" className="sumfest-label">
                  Arrival Date <span className="label-optional">(if traveling)</span>
                </label>
                <input
                  type="date"
                  id="arrivalDate"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  className="sumfest-input"
                />
              </div>

              <div className="sumfest-form-group">
                <label htmlFor="arrivalAirport" className="sumfest-label">
                  Arrival Airport <span className="label-optional">(if traveling)</span>
                </label>
                <select
                  id="arrivalAirport"
                  name="arrivalAirport"
                  value={formData.arrivalAirport}
                  onChange={handleInputChange}
                  className="sumfest-input sumfest-select"
                >
                  <option value="">-- Select Airport --</option>
                  <option value="Montego Bay / Sangster International Airport">Montego Bay / Sangster Intl (MBJ)</option>
                  <option value="Kingston / Norman Manley International Airport">Kingston / Norman Manley (KIN)</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>

            <div className="sumfest-form-grid-2">
              <div className="sumfest-form-group">
                <label htmlFor="accommodationStatus" className="sumfest-label">
                  Where will you be staying? <span className="required-star">*</span>
                </label>
                <select
                  id="accommodationStatus"
                  name="accommodationStatus"
                  required
                  value={formData.accommodationStatus}
                  onChange={handleInputChange}
                  className="sumfest-input sumfest-select"
                >
                  <option value="">-- Select Accommodation --</option>
                  <option value="Hotel/resort name">Hotel/Resort (Booked/Planning)</option>
                  <option value="Airbnb/private stay">Airbnb or Private Villa</option>
                  <option value="Not booked yet">Not booked yet</option>
                  <option value="Already in Jamaica">Already in Jamaica</option>
                </select>
              </div>

              <div className="sumfest-form-group">
                <label htmlFor="groupSize" className="sumfest-label">
                  Number of Persons in Group <span className="required-star">*</span>
                </label>
                <input
                  type="number"
                  id="groupSize"
                  name="groupSize"
                  min="1"
                  required
                  placeholder="1"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  className="sumfest-input"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Logistics & Preferences */}
          <div className="sumfest-form-section">
            <h3 className="section-heading-custom">3. Logistics & Preferences</h3>

            <div className="sumfest-form-group">
              <label className="sumfest-label">
                What do you need help with? <span className="label-optional">(Select all that apply)</span>
              </label>
              <div className="sumfest-checkbox-grid">
                {[
                  'Airport transfer',
                  'Hotel/location support',
                  'Event-night transport',
                  'Group transport',
                  'Tours/activities',
                  'Full travel logistics coordination',
                  'Not sure yet',
                ].map((option) => (
                  <label 
                    key={option} 
                    className={`sumfest-checkbox-card ${formData.helpNeeded.includes(option) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.helpNeeded.includes(option)}
                      onChange={handleCheckboxChange}
                      className="sumfest-checkbox-hidden"
                    />
                    <div className="selector-square"></div>
                    <span className="selector-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sumfest-form-group">
              <label className="sumfest-label">
                Do you already have your Sumfest tickets? <span className="required-star">*</span>
              </label>
              <div className="sumfest-card-selector-grid-3">
                {['Yes', 'No', 'Planning to purchase'].map((option) => (
                  <label 
                    key={option} 
                    className={`sumfest-selector-card ${formData.hasTicket === option ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="hasTicket"
                      required
                      value={option}
                      checked={formData.hasTicket === option}
                      onChange={handleInputChange}
                      className="sumfest-radio-hidden"
                    />
                    <div className="selector-circle"></div>
                    <span className="selector-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sumfest-form-group">
              <label className="sumfest-label">
                Preferred Contact Method <span className="required-star">*</span>
              </label>
              <div className="sumfest-card-selector-grid-4">
                {['Email', 'Phone call', 'SMS/text', 'WhatsApp'].map((option) => (
                  <label 
                    key={option} 
                    className={`sumfest-selector-card ${formData.preferredContact === option ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      required
                      value={option}
                      checked={formData.preferredContact === option}
                      onChange={handleInputChange}
                      className="sumfest-radio-hidden"
                    />
                    <div className="selector-circle"></div>
                    <span className="selector-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sumfest-form-grid-2">
              <div className="sumfest-form-group">
                <label htmlFor="budgetRange" className="sumfest-label">
                  Budget Range <span className="label-optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="budgetRange"
                  name="budgetRange"
                  placeholder="e.g. $500 - $1500 USD"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className="sumfest-input"
                />
              </div>

              <div className="sumfest-form-group">
                <label htmlFor="referralCode" className="sumfest-label">
                  Referral Code <span className="label-optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  placeholder="PROMO2026"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  className="sumfest-input"
                />
              </div>
            </div>

            <div className="sumfest-form-group">
              <label htmlFor="additionalNotes" className="sumfest-label">
                Additional Notes / Special Requests <span className="label-optional">(optional)</span>
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows={4}
                placeholder="Specify accessibility requirements, specific tours you'd like to book, flight numbers, or event nights you plan to attend..."
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className="sumfest-input sumfest-textarea"
              ></textarea>
            </div>
          </div>

          {/* Premium Alert/Disclaimer */}
          <div className="sumfest-disclaimer-card">
            <div className="disclaimer-icon">ℹ️</div>
            <div className="disclaimer-content">
              <h4>Coordination Notice</h4>
              <p>
                Jahtaria’s role is local logistics coordination. Hotel, transport, tours, and ticket bookings are quoted separately based on local supplier availability.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`sumfest-submit-btn ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? (
              <span className="btn-spinner-wrapper">
                <span className="spinner"></span>
                Processing Inquiry...
              </span>
            ) : (
              'Submit Logistics Inquiry 🇯🇲'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}