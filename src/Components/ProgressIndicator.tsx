import React from "react"
import styled from "styled-components"
import Colors from "Assets/Colors"

interface Props {
  percentComplete: number
}

export class ProgressIndicator extends React.Component<Props, null> {
  static defaultProps = {
    percentComplete: 0,
  }

  render() {
    const { percentComplete } = this.props

    return (
      <ProgressIndicatorContainer>
        <CompletionBar percentComplete={percentComplete} />
      </ProgressIndicatorContainer>
    )
  }
}

const ProgressIndicatorContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${Colors.grayRegular};
`

const CompletionBar = styled.div`
  width: ${(props: Props) => `calc(100% * ${props.percentComplete})`};
  height: 100%;
  background-color: black;
  transition: width 0.25s ease-in;
`

CompletionBar.displayName = "CompletionBar"
