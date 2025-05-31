import { useState } from "react"
import { supabase } from "../../supabase"
import { contactFields } from "../../constants/constants"
import "./ContactForm.css"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      // Вызов edge function Supabase для отправки email
      await fetch('https://us-central1-furniro-account.cloudfunctions.net/sendContactEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSubmitStatus('success');
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const getFieldName = (label) => {
    switch (label.toLowerCase()) {
      case "your name":
        return "name"
      case "email address":
        return "email"
      case "subject":
        return "subject"
      default:
        return label.toLowerCase()
    }
  }

  return (
    <div className="contactInputs">
      <form className="contactForm" onSubmit={handleSubmit}>
        {
          contactFields.map(({ id, label, type, placeHolder, required }) => {
            const fieldName = getFieldName(label)
            return (
              <label key={id} className="contactLabel">
                {label}
                <input
                  className="contactInputItem"
                  type={type}
                  placeholder={placeHolder}
                  required={required}
                  name={fieldName}
                  value={formData[fieldName]}
                  onChange={handleInputChange}
                />
              </label>
            )
          })
        }
        <label className="contactLabel meesageLabel">
          Message
          <textarea
            className="contactInputItem messageInput"
            placeholder="Hi! i'd like to ask about"
            cols={30}
            rows={10}
            required
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <button
          className="contactSubmit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
        {submitStatus === 'success' && (
          <p className="success-message">Message sent successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="error-message">An error occurred while sending. Please try again.</p>
        )}
      </form>
    </div>
  )
}

export default ContactForm