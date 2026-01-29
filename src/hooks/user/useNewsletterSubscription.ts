import { useState, FormEvent } from "react";
import { toast } from "react-toastify";

export const useNewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const notify = (name: string) =>
    toast.info(`¡Gracias por suscribirte ${name}!`);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notify(email);
    setEmail("");
  };

  return { email, setEmail, handleSubmit };
};
