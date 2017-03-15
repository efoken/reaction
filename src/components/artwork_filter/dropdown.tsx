import * as React from "react"
import * as Relay from "react-relay"

import Icon from "../icon"

import styled from "styled-components"
import colors from "../../assets/colors"
import { primary, secondary } from "../../assets/fonts"
import { labelMap } from "./param_map"

interface DropdownProps extends RelayProps, React.HTMLProps<Dropdown> {
  aggregation: any
  onSelect?: any
}

interface DropdownState {
  isHovered: boolean,
  selected: any
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
      selected: {},
    }
  }

  toggleHover() {
    this.setState({
      isHovered: !this.state.isHovered,
    })
  }

  onSelect(count) {
    this.setState({
      selected: count,
    })
  }

  render() {
    let navItems = this.props.aggregation.counts.map(count => {
      return (
        <NavItem key={count.id} onClick={() => this.onSelect(count)}>
          <span>{count.name}</span>
          <NavItemCount>&nbsp;({count.count})</NavItemCount>
        </NavItem>
      )
    })

    const allLabel = labelMap[this.props.aggregation.slice.toLowerCase()].plural

    navItems.unshift(
      (
        <NavItem key="all" onClick={() => this.onSelect({})}>
          <span>All {allLabel}</span>
        </NavItem>
      ),
    )

    let buttonColor = "white"
    let buttonTextColor = "black"
    let superLabelColor = "black"
    let navStyle = { display: "none" }

    if (this.state.selected.name) {
      buttonTextColor = colors.purpleRegular
    }

    if (this.state.isHovered) {
      buttonColor = "black"
      buttonTextColor = "white"
      superLabelColor = "white"
      navStyle = { display: "block" }
    }

    const labelText = this.state.selected.name || this.props.aggregation.slice
    const superLabelText = this.state.selected.name ? this.props.aggregation.slice : null

    return (
      <div
        className={this.props.className}
        onMouseEnter={() => this.toggleHover()}
        onMouseLeave={() => this.toggleHover()}
      >
        <Button style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
          {superLabelText && <SuperLabel style={{ color: superLabelColor }}>{superLabelText}</SuperLabel>}
          {labelText}
          <Icon
            name="arrow-down"
            fontSize="9px"
            color={buttonTextColor}
            style={{ position: "absolute", right: 15 }}
          />
        </Button>
        <Nav style={navStyle}>
          {navItems}
        </Nav>
      </div>
    )
  }
}

const Button = styled.div`
  background: white;
  color: black;
  border: 1px solid ${colors.grayRegular};
  display: inline-block;
  line-height: 160%;
  padding: 15px 35px 10px 18px;
  font-size: 13px;
  vertical-align: middle;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${primary.style}
`

const Nav = styled.div`
  z-index: 2;
  background: black;
  position: absolute;
  top: 45px;
  left: 1px;
  width: 300px;
  border: 1px solid #333;
`

const SuperLabel = styled.div`
  position: absolute
  font-size: 9px
  margin-top: -15px;
  color: black
`

const NavItem = styled.div`
  ${secondary.style}
  text-align: left;
  color: white;
  display: block;
  border-bottom: 1px solid #333;
  padding: 15px 18px 10px 18px;
  text-transform: capitalize;
  &:hover {
    background: ${colors.grayBold};
  }
`
const NavItemCount = styled.span`
  color: ${colors.graySemibold}
`

const StyledDropdown = styled(Dropdown)`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: -1px;
`

export default Relay.createContainer(StyledDropdown, {
  fragments: {
    aggregation: () => Relay.QL`
      fragment on ArtworksAggregationResults {
        slice
        counts {
          name
          id
          count
        }
      }
    `,
  },
})

interface RelayProps {
  aggregation: {
    slice: string | null,
    counts: {
      name: string | null,
      id: string | null,
      count: number | null,
    },
  } | null,
}