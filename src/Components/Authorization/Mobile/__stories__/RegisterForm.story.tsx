import { storiesOf } from "@storybook/react"
import * as React from "react"

import { MobileRegisterForm } from "../RegisterForm"

storiesOf("Components/Auth/Mobile", module).add("RegisterForm", () => (
  <MobileRegisterForm
    values={{}}
    handleSubmit={() => null}
    handleChangeMode={() => mode => null}
  />
))
