import { storiesOf } from "@storybook/react"
import React from "react"

import AuthForm from "../Authorization/AuthForm"
import { DesktopModal } from "../Authorization/DesktopModal"

const submit = (values, actions) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 1))
    actions.setSubmitting(false)
  }, 1000)
}

storiesOf("Components/Authorization", module)
  .add("Login Mode", () => (
    <DesktopModal show>
      <AuthForm mode="login" handleSubmit={submit} />
    </DesktopModal>
  ))
  .add("Forgot Password", () => (
    <DesktopModal show>
      <AuthForm mode="reset_password" handleSubmit={submit} />
    </DesktopModal>
  ))
  .add("Register Mode", () => (
    <DesktopModal show>
      <AuthForm mode="register" handleSubmit={submit} />
    </DesktopModal>
  ))
