// emails/MagicCodeEmail.tsx
import React from 'react'
import { User } from '@prisma/client'

const style = {
  container: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    padding: '20px',
    color: '#333',
    backgroundColor: '#f9f9f9',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#444',
    marginBottom: '20px',
  },
  code: {
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '1.5em',
    letterSpacing: '2px',
    margin: '20px 0',
  },
  footer: {
    marginTop: '20px',
    paddingTop: '10px',
    borderTop: '1px solid #ddd',
    fontSize: '0.9em',
    color: '#666',
  },
}

interface MagicCodeEmailProps {
  code: string
  user: User
}

const MagicCodeEmail: React.FC<MagicCodeEmailProps> = ({ code, user }) => (
  <div style={style.container}>
    <h1 style={style.header}>Verify Your Email</h1>
    <p>Hi {user.name || 'there'},</p>
    <p>Thanks for signing up! Please use the code below to verify your email address:</p>
    <div style={style.code}>{code}</div>
    <p>This code will expire in 10 minutes.</p>

    <div style={style.footer}>
      <hr />
      <p>If you did not request this, please ignore this email.</p>
      <p>For any questions, please contact our support team at <a href={`mailto:${process.env.EMAIL_FROM}`}>contact@boostmaestro.com</a></p>
    </div>
  </div>
)

export default MagicCodeEmail
