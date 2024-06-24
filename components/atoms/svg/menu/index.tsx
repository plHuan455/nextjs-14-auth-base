import { SvgIconProps } from "types/index.d"

const IconMenu: React.FC<SvgIconProps> = (props) => {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20 2.88885H0V0.666626H20V2.88885Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20 10.1111H0V7.88892H20V10.1111Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20 17.3333H0V15.1111H20V17.3333Z" fill="currentColor" />
    </svg>
  )
}

export default IconMenu
