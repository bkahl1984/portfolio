"use client";

import styled from "styled-components";
import { Variants, motion } from "framer-motion";
import { useContactForm } from "@/hooks/useContactForm";

// UI
import Loading from "@/components/Loading";
import { P2 } from "@/components/Text";
import FormSuccessMessage from "./FormSuccessMessage";

const formElementVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const StyledContactForm = styled.div`
  margin-top: 2.5em;
  min-height: 28.75em;
  display: grid;
  position: relative;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 30em;
    margin-left: auto;
    margin-right: auto;
    width: 100%;

    > label {
      display: flex;
      flex-direction: column;
      font-size: 1em;
      padding-bottom: 1.25em;
      position: relative;
      width: 100%;
    }

    > * + * {
      margin-top: 1.5em;
    }

    input,
    textarea {
      width: 100%;
      color: ${({ theme }) => theme.fg};
      &:focus {
        outline: none;
        border-bottom: solid 2px ${({ theme }) => theme.cyan};
      }
      &:not(:placeholder-shown) {
        border-bottom: solid 2px ${({ theme }) => theme.cyan};
      }

      &.error {
        border-bottom: solid 2px ${({ theme }) => theme.error};
      }
    }

    input,
    textarea,
    .submit {
      width: 100%;
      padding: 1em;
      font-size: 1em;
      line-height: 1.5;
      font-family: inherit;
      background-color: ${({ theme }) => theme.cardBg};
      border: none;
      border-radius: 0.25em;
      border-bottom: solid 2px ${({ theme }) => theme.cardBg};
      transition: background-color var(--duration), color var(--duration);
      &::placeholder {
        color: ${({ theme }) => theme.grey};
        opacity: 0.8;
      }
    }

    textarea {
      resize: vertical;
      min-height: 10em;
    }

    .helperText {
      padding: 0 1em;
      font-size: 0.875em;
      color: ${({ theme }) => theme.grey};
      position: absolute;
      bottom: -0.25em;
      left: 0;
      &.errorMessage {
        color: ${({ theme }) => theme.error};
      }
    }

    .submit {
      cursor: pointer;
      border: none;
      background-color: ${({ theme }) => theme.cyan};
      color: ${({ theme }) => theme.white};

      &:hover {
        background-color: ${({ theme }) => theme.cyanHover};
      }

      &.sending {
        position: relative;
        pointer-events: none;
        background-color: ${({ theme }) => theme.cyanHover};
        min-height: 3.5em;
        > * {
          transform: scale(0.5);
          &:after {
            display: none;
          }
        }
      }
    }
  }

  .sendError {
    color: ${({ theme }) => theme.error};
  }
`;

const ContactForm = () => {
  const {
    register,
    isSending,
    isSent,
    isOnlySpaces,
    errorMessage,
    errors,
    onSubmit,
  } = useContactForm();

  return (
    <StyledContactForm>
      {isSent ? (
        <FormSuccessMessage />
      ) : (
        <motion.form
          onSubmit={onSubmit}
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.label
            variants={formElementVariants}
            transition={{ duration: 0.7 }}
          >
            <input
              {...register("name", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Name must contain at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-яЇїІіЄє\s-]+$/,
                  message: "Invalid name format",
                },
              })}
              placeholder="Name"
              className={errors.name?.message ? "error" : ""}
            />
            {errors.name ? (
              <span className="helperText errorMessage">
                {errors.name.message}
              </span>
            ) : null}
          </motion.label>
          <motion.label
            variants={formElementVariants}
            transition={{ duration: 0.7 }}
          >
            <input
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email"
              className={errors.email?.message ? "error" : ""}
            />
            {errors.email ? (
              <span className="helperText errorMessage">
                {errors.email.message}
              </span>
            ) : null}
          </motion.label>
          <motion.label
            variants={formElementVariants}
            transition={{ duration: 0.7 }}
          >
            <textarea
              {...register("message", {
                required: "This field is required",
                validate: {
                  noSpacesOnly: (value) =>
                    !isOnlySpaces(value) || "Message cannot be only spaces",
                },
              })}
              placeholder="Message"
              className={errors.message?.message ? "error" : ""}
              spellCheck="false"
            ></textarea>
            {errors.message ? (
              <span className="helperText errorMessage">
                {errors.message.message}
              </span>
            ) : null}
          </motion.label>

          {errorMessage ? (
            <P2 className="error sendError">{errorMessage}</P2>
          ) : null}

          <motion.button
            type="submit"
            className={`submit ${isSending ? "sending" : ""}`}
            variants={formElementVariants}
            transition={{ duration: 0.7 }}
          >
            {isSending ? <Loading /> : "Send"}
          </motion.button>
        </motion.form>
      )}
    </StyledContactForm>
  );
};

export default ContactForm;
