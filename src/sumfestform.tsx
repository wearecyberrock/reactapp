import React, { useState, ChangeEvent, FormEvent } from 'react';
import { send } from '@emailjs/browser';
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

    // Prepare the parameters for your EmailJS template
    const templateParams = {
      ...formData,
      helpNeeded: formData.helpNeeded.join(', '), // Convert array to readable string
    };

    const serviceId = 'service_91zmng8';   // Replace with your EmailJS Service ID
    const adminTemplateId = 'template_xk9vnxj'; // The one you receive
    const welcomeTemplateId = 'template_67sydho'; // The one the customer receives

    // Send both emails using Promise.all
    Promise.all([
      send(serviceId, adminTemplateId, templateParams),
      send(serviceId, welcomeTemplateId, templateParams)
    ])
      .then(() => {
        alert('Thank you! Your travel inquiry has been submitted successfully and a confirmation email has been sent to you.');
        // Reset Form
        setFormData({
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
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('Something went wrong. Please try again or contact us via WhatsApp.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div id="sumfest-form" className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-gray-800">
      {/* Header Section */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sumfest Travel Logistics Inquiry Form
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Complete this form so our team can understand your travel dates, group size, location, and the type of support you need for Sumfest. After submitting, a Jahtaria representative will follow up with the next step.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        {/* 2. Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Grid layout for Phone Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 3. Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          {/* 4. WhatsApp Number */}
          <div>
            <label htmlFor="whatsAppNumber" className="block text-sm font-semibold text-gray-700 mb-1">
              WhatsApp Number <span className="text-gray-400 font-normal">(if different)</span>
            </label>
            <input
              type="tel"
              id="whatsAppNumber"
              name="whatsAppNumber"
              value={formData.whatsAppNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* 5. Origin Location */}
        <div>
          <label htmlFor="originLocation" className="block text-sm font-semibold text-gray-700 mb-1">
            Country / City You’re Traveling From *
          </label>
          <input
            type="text"
            id="originLocation"
            name="originLocation"
            required
            value={formData.originLocation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        {/* 6. Travel Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Are you already in Jamaica or planning to travel? *
          </label>
          <div className="space-y-2">
            {['Already in Jamaica', 'Planning to travel to Jamaica'].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="travelStatus"
                  required
                  value={option}
                  checked={formData.travelStatus === option}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="text-gray-700 text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditional Layout Context for Flights/Arrivals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 7. Arrival Date */}
          <div>
            <label htmlFor="arrivalDate" className="block text-sm font-semibold text-gray-700 mb-1">
              Arrival Date <span className="text-gray-400 font-normal">(if applicable)</span>
            </label>
            <input
              type="date"
              id="arrivalDate"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          {/* 8. Arrival Airport */}
          <div>
            <label htmlFor="arrivalAirport" className="block text-sm font-semibold text-gray-700 mb-1">
              Arrival Airport <span className="text-gray-400 font-normal">(if applicable)</span>
            </label>
            <select
              id="arrivalAirport"
              name="arrivalAirport"
              value={formData.arrivalAirport}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            >
              <option value="">-- Select Airport --</option>
              <option value="Montego Bay / Sangster International Airport">Montego Bay / Sangster International Airport</option>
              <option value="Kingston / Norman Manley International Airport">Kingston / Norman Manley International Airport</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>
        </div>

        {/* 9. Accommodation Status */}
        <div>
          <label htmlFor="accommodationStatus" className="block text-sm font-semibold text-gray-700 mb-1">
            Where will you be staying? *
          </label>
          <select
            id="accommodationStatus"
            name="accommodationStatus"
            required
            value={formData.accommodationStatus}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="">-- Select Status --</option>
            <option value="Hotel/resort name">Hotel/resort name</option>
            <option value="Airbnb/private stay">Airbnb/private stay</option>
            <option value="Not booked yet">Not booked yet</option>
            <option value="Already in Jamaica">Already in Jamaica</option>
          </select>
        </div>

        {/* 10. Number of Persons Traveling */}
        <div>
          <label htmlFor="groupSize" className="block text-sm font-semibold text-gray-700 mb-1">
            Number of Persons Traveling *
          </label>
          <input
            type="number"
            id="groupSize"
            name="groupSize"
            min="1"
            required
            value={formData.groupSize}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        {/* 11. What do you need help with? */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What do you need help with? <span className="text-gray-400 font-normal">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-md border border-gray-200">
            {[
              'Airport transfer',
              'Hotel/location support',
              'Event-night transport',
              'Group transport',
              'Tours/activities',
              'Full travel logistics coordination',
              'Not sure yet',
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.helpNeeded.includes(option)}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 rounded text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="text-gray-700 text-sm leading-tight">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 12. Sumfest Ticket Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Do you already have your Sumfest ticket? *
          </label>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
            {['Yes', 'No', 'Planning to purchase'].map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasTicket"
                  required
                  value={option}
                  checked={formData.hasTicket === option}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="text-gray-700 text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 13. Preferred Contact Method */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Contact Method *
          </label>
          <div className="flex flex-wrap gap-4">
            {['Email', 'Phone call', 'SMS/text', 'WhatsApp'].map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  required
                  value={option}
                  checked={formData.preferredContact === option}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="text-gray-700 text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Grid layout for Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 14. Budget Range */}
          <div>
            <label htmlFor="budgetRange" className="block text-sm font-semibold text-gray-700 mb-1">
              Budget Range <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="budgetRange"
              name="budgetRange"
              placeholder="e.g. $500 - $1000 USD"
              value={formData.budgetRange}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          {/* 15. Referral Code */}
          <div>
            <label htmlFor="referralCode" className="block text-sm font-semibold text-gray-700 mb-1">
              Referral Code <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* 16. Additional Notes */}
        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-700 mb-1">
            Additional Notes / Special Requests
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={4}
            value={formData.additionalNotes}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-y"
          ></textarea>
        </div>

        {/* Important Disclaimer Note */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4 rounded-r-md">
          <p className="text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Important Note:</span> Jahtaria’s role is travel logistics coordination. Hotel, transport, tour, ticket, and third-party supplier costs are quoted separately based on availability.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-3 px-6 rounded-md shadow transition duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0`}
          >
            {isSubmitting ? 'Sending Inquiry...' : 'Submit Travel Inquiry'}
          </button>
        </div>
      </form>
    </div>
  );
}