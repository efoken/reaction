import { storiesOf } from "@storybook/react"
import React from "react"

import icons, { IconName } from "../../Assets/Icons"
import CircleIcon from "../CircleIcon"
import { Col, Row } from "../Grid"
import Icon from "../Icon"
import Title from "../Title"

storiesOf("Components/Icons", module).add("All Icons", () => {
  const iconNames = Object.keys(icons).sort()

  return (
    <div style={{ margin: "20px" }}>
      <Row>
        <Title>Normal Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName =>
          <Col style={{ padding: 10 }}>
            <Icon name={iconName as IconName} color="black" />
          </Col>
        )}
      </Row>

      <Row>
        <Title>Large Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName =>
          <Col style={{ padding: 10 }}>
            <Icon name={iconName as IconName} fontSize="60px" color="black" />
          </Col>
        )}
      </Row>

      <Row>
        <Title>Circle Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName =>
          <Col style={{ padding: 10 }}>
            <CircleIcon name={iconName as IconName} color="black" />
          </Col>
        )}
      </Row>

      <Row>
        <Title>Large Circle Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName =>
          <Col style={{ padding: 10 }}>
            <CircleIcon name={iconName as IconName} color="black" fontSize="60px" />
          </Col>
        )}
      </Row>

      <Row>
        <Title>Colors</Title>
      </Row>
      <Row>
        <Col style={{ padding: 10 }}>
          <Icon name='logo' color='#6E1FFF' fontSize="60px" />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon name='logo' color='#6E1FFF' fontSize="60px" />
        </Col>
      </Row>
    </div>
  )
})
