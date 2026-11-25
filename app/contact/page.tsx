"use client";

import { useState, type SubmitEvent } from "react";

const fieldClass =
  "w-full rounded-sm border border-hairline bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current";

const labelClass = "mb-1.5 block text-xs font-medium text-foreground";

export default function ContactPage() {
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ success: true, message: "Sending..." });

    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ success: true, message: "Form Submitted Successfully" });
        event.target.reset();
      } else {
        setStatus({ success: false, message: data.message || "Error" });
      }
    } catch (error) {
      console.log(error);
      setStatus({ success: false, message: "Failed to send message." });
    }
  }

  return (
    <div className="max-w-[65ch] px-6 py-10 md:px-12 md:py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>

      <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-muted">
        Want to reach out? Fill out the form below and I&apos;ll get back to
        you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex max-w-md flex-col gap-5"
      >
        <input
          type="hidden"
          name="access_key"
          value="2a9b84b3-98ee-4ecf-94a4-1960420e5f04"
        />
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
        />
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="reason" className={labelClass}>
            Reason for contact
          </label>
          <select id="reason" name="reason" className={fieldClass}>
            <option value="project-contract">Project / Contract Work</option>
            <option value="job-opportunity">Job Opportunity</option>
            <option value="collaboration">Collaboration</option>
            <option value="general-inquiry">General Inquiry</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={`${fieldClass} resize-y`}
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-sm bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:w-auto sm:self-start"
        >
          Send message
        </button>

        {status && (
          <p
            className={`text-sm ${
              status.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
