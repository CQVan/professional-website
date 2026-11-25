"use client";

import type { SubmitEvent } from "react";

const fieldClass =
  "w-full rounded-sm border border-hairline bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current";

const labelClass = "mb-1.5 block text-xs font-medium text-foreground";

export default function ContactPage() {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);

    const message = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      reason: formData.get("reason"),
      message: formData.get("message"),
    };
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
      </form>
    </div>
  );
}
