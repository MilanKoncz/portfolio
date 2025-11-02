import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Loader2 } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import { siteMeta, socialLinks, contact as contactInfo } from '../config/site';
import { content } from '../config/content';

interface FormData {
  name: string;
  email: string;
  message: string;
  // Honeypot: should stay empty; bots often fill every field
  website?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const c = content[language]?.contact || {};

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? 'Name is required' : 'Name ist erforderlich';
    } else if (formData.name.length < 2) {
      newErrors.name = language === 'en' ? 'Name must be at least 2 characters' : 'Name muss mindestens 2 Zeichen lang sein';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : 'E-Mail ist erforderlich';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Invalid email format' : 'Ungültiges E-Mail-Format';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = language === 'en' ? 'Message is required' : 'Nachricht ist erforderlich';
    } else if (formData.message.length < 10) {
      newErrors.message = language === 'en' ? 'Message must be at least 10 characters' : 'Nachricht muss mindestens 10 Zeichen lang sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (contactInfo.formEndpoint) {
        const res = await fetch(contactInfo.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to submit');
      } else {
        // Simulate API call if no endpoint configured
        await new Promise(resolve => setTimeout(resolve, 1500));
        /* Simuliertes Logging der Formdaten (bewusst ohne console, um Linting sauber zu halten) */
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | {siteMeta.title.split(' - ')[0]}</title>
        <meta name="description" content="Get in touch with Milan Koncz for web development projects, collaborations, or opportunities. Based in Mannheim, Germany." />
        <meta name="keywords" content="Contact Milan Koncz, Web Developer Contact, Mannheim, Germany, Collaboration" />
        <meta property="og:title" content="Contact | Milan Koncz" />
        <meta property="og:description" content="Get in touch with Milan Koncz for web development projects, collaborations, or opportunities. Based in Mannheim, Germany." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteMeta.baseUrl}/contact`} />
        <link rel="canonical" href={`${siteMeta.baseUrl}/contact`} />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t.contact.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {c.subtitle || t.contact.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {t.contact.contactInfo}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center" aria-hidden="true">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`Send email to ${contactInfo.email}`}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center" aria-hidden="true">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      aria-label={`Call ${contactInfo.phone}`}
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center" aria-hidden="true">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {contactInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {t.contact.connect}
                </h2>
                <div className="flex space-x-4">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Visit GitHub profile"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Visit LinkedIn profile"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Visit Instagram profile"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {t.contact.sendMessage}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field – hidden from users, visible to bots */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  aria-hidden="true"
                />
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {language === 'en' ? 'Sending...' : 'Wird gesendet...'}
                    </span>
                  ) : (
                    t.contact.send
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <p className="mt-4 text-sm text-green-500 text-center">
                    {language === 'en' ? 'Message sent successfully!' : 'Nachricht erfolgreich gesendet!'}
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-4 text-sm text-red-500 text-center">
                    {language === 'en' ? 'Failed to send message. Please try again.' : 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.'}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact; 