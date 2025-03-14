"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// TS
import { FormInputs } from "@/types";

export const useContactForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onTouched",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail: SubmitHandler<FormInputs> = async (data) => {
    const sendgridApiEndpoint = "api/sendgrid";

    setErrorMessage("");
    setIsSending(true);

    try {
      const request = await fetch(sendgridApiEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (request.ok) {
        setIsSent(true);
      }
    } catch (error) {
      setErrorMessage("Error while sending a message. Check the console");
      console.error(`Error while sending a message: ${error}`);
    } finally {
      setIsSending(false);
    }
  };

  const isOnlySpaces = (value: string) => !value.trim();

  const onSubmit = handleSubmit(sendEmail);

  return {
    register,
    isSending,
    isSent,
    isOnlySpaces,
    errorMessage,
    errors,
    onSubmit,
  };
};
