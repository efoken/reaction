import React, { Component, HTMLProps } from "react"

import Checkbox from "../Checkbox"

import styled from "styled-components"
import colors from "Assets/Colors"
import { avantgarde } from "Assets/Fonts"

export class ForSaleCheckbox extends Component<HTMLProps<Checkbox>, null> {
  render() {
    return (
      <CheckboxContainer>
        <Checkbox {...this.props}>Only for Sale</Checkbox>
      </CheckboxContainer>
    )
  }
}

const CheckboxContainer = styled.div`
  ${avantgarde("s13")};
  border: 1px solid ${colors.grayRegular};
  padding: 15px 18px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default ForSaleCheckbox
