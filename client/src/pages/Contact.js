import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">📬 Contact Us</h1>

      <p className="contact-description">
        Have a question or suggestion? We'd love to hear from you!
      </p>

      <div className="contact-box">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows="5"
            required
          />

          <button type="submit" className="submit-btn">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>📞 Get in Touch</h3>
          <p><strong>Email:</strong> eduverse@gmail.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> Hyderabad, India</p>

          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">🌐 GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
