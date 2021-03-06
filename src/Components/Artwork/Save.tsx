import React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

import Icon from "../Icon"

import styled from "styled-components"
import colors from "../../Assets/Colors"

import * as Artsy from "../../Components/Artsy"

const SIZE = 40

export interface Props
  extends RelayProps,
    React.HTMLProps<SaveButtonContainer>,
    Artsy.ContextProps {
  style?: any
  relay?: RelayProp
  useRelay?: boolean
}

export class SaveButtonContainer extends React.Component<Props, null> {
  static defaultProps = {
    useRelay: true,
  }

  handleSave() {
    const { currentUser, artwork, relay, useRelay } = this.props
    if (useRelay && currentUser && currentUser.id) {
      commitMutation(relay.environment, {
        mutation: graphql`
          mutation SaveArtworkMutation($input: SaveArtworkInput!) {
            saveArtwork(input: $input) {
              artwork {
                is_saved
              }
            }
          }
        `,
        variables: {
          input: {
            artwork_id: artwork.id,
            remove: this.props.artwork.is_saved,
          },
        },
        // TODO: Relay Modern: This is not working yet
        optimisticResponse: {
          saveArtwork: {
            artwork: {
              __id: artwork.__id,
              is_saved: !this.props.artwork.is_saved,
            },
          },
        },
      })

      // FIXME: Add non-relay based favorite mechanism
      // } else {
    } else {
      window.location.href = "/login"
    }
  }

  render() {
    const { style, artwork } = this.props
    return (
      <div
        className={this.props.className}
        style={style}
        onClick={() => this.handleSave()}
        data-saved={artwork.is_saved}
      >
        <Icon
          name="heart"
          height={SIZE}
          color="white"
          style={{ verticalAlign: "middle" }}
        />
      </div>
    )
  }
}

export const SaveButton = styled(SaveButtonContainer)`
  width: ${SIZE}px;
  height: ${SIZE}px;
  text-align: center;
  cursor: pointer;
  color: white;
  background-color: ${colors.gray};
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  font-size: 16px;
  line-height: ${SIZE}px;
  &:hover {
    background-color: black;
  }
  &[data-saved="true"] {
    background-color: ${colors.purpleRegular};
    &:hover {
      background-color: ${colors.redBold};
    }
  }
`

export default createFragmentContainer(
  Artsy.ContextConsumer(SaveButton),
  graphql`
    fragment Save_artwork on Artwork {
      __id
      id
      is_saved
    }
  `
)

interface RelayProps {
  artwork: {
    __id: string
    id: string
    is_saved: boolean | null
  }
}
