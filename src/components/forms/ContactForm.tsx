"use client";

import { useState } from "react";
import { TextInput, Textarea, Button, Stack, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "@/i18n/client";

export function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: {
      name: (value) => (value.trim() ? null : t("contact.invalidName")),
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : t("contact.invalidEmail"),
      message: (value) => (value.trim() ? null : t("contact.invalidMessage")),
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setStatus("sending");
    try {
      const res = await fetch("/api/sendgrid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Alert color="green" title={t("contact.successMessage")}>
        <Button
          variant="subtle"
          size="xs"
          onClick={() => setStatus("idle")}
        >
          {t("contact.successBackHome")}
        </Button>
      </Alert>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {status === "error" && (
          <Alert color="red" title={t("contact.failMessage")}>
            {t("contact.failReportProblem")}
          </Alert>
        )}
        <TextInput
          label={t("contact.labelName")}
          placeholder={t("contact.placeholderName")}
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label={t("contact.labelEmail")}
          placeholder={t("contact.placeholderEmail")}
          type="email"
          required
          {...form.getInputProps("email")}
        />
        <Textarea
          label={t("contact.labelMessage")}
          placeholder={t("contact.placeholderMessage")}
          minRows={5}
          required
          {...form.getInputProps("message")}
        />
        <Button
          type="submit"
          loading={status === "sending"}
        >
          {status === "sending" ? t("contact.sending") : t("contact.send")}
        </Button>
      </Stack>
    </form>
  );
}
