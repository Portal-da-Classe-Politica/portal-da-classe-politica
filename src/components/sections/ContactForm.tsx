'use client';

import { useState } from 'react';
import { ButtonStyled, Input, TextArea } from '@base';
import { EmailBodyData } from '@services/contact/sendEmail';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    if (formData.name.length > 100) {
      alert('O nome não pode exceder 100 caracteres.');
      return;
    }

    if (formData.topic.length > 100) {
      alert('O assunto não pode exceder 100 caracteres.');
      return;
    }

    if (formData.message.length > 800) {
      alert('A mensagem não pode exceder 800 caracteres.');
      return;
    }

    const body: EmailBodyData = {
      nome: formData.name,
      email: formData.email,
      mensagem: formData.message,
      assunto: formData.topic,
    };

    try {
      const response = await fetch('/api/contact/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('Email enviado com sucesso!');
        setFormData({ name: '', email: '', topic: '', message: '' });
      } else {
        alert('Falha ao enviar o email. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      alert('Erro ao enviar o email.');
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Nome Completo"
          label="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={100}
        />
        <Input
          placeholder="Email"
          label="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <Input
        placeholder="Assunto"
        label="topic"
        name="topic"
        value={formData.topic}
        onChange={handleChange}
        maxLength={100}
      />
      <TextArea
        placeholder="Descreva sua dúvida, sugestão ou problema..."
        label="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        maxLength={800}
      />
      <ButtonStyled style="fillOrange" type="submit" className="w-full">
        Enviar Mensagem
      </ButtonStyled>
    </form>
  );
};

export default ContactForm;
