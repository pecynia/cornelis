import React from 'react'

interface ContactFormEmailProps {
  companyName: string;
  name: string;
  email: string;
  message: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  companyName,
  name,
  email,
  message
}) => (
  <div>
    <h1>Contact form submission</h1>
    <p>Company Name: <strong>{companyName}</strong></p>
    <p>From <strong>{name}</strong> ({email})</p>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
)

export default ContactFormEmail
