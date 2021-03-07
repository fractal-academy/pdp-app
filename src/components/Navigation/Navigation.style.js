import styled from 'styled-components'
import { Menu } from 'antd'

export const menuStyle = { background: 'transparent' }

export const MenuItem = styled(Menu.Item)`
  &.ant-menu-item.ant-menu-item-only-child {
    padding: 0 32px;
  }
  &.ant-menu-item-selected::after {
    opacity: 1;
    transform: scaleY(1);
  }
`
export const menuItemStyle = {
  padding: '0 32px'
}
