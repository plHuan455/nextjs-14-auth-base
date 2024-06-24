import ReactModal, { Props } from "react-modal"

import { ButtonBase, ButtonBaseProps } from "components/atoms/button-base"
import IconClose from "components/atoms/svg/close"
import { cn } from "lib/utils/cn"

export interface BaseModalProps extends Omit<Props, "className"> {
  contentClassName?: string
  closeButtonProps?: Partial<ButtonBaseProps>
}

const ModalBase: React.FC<BaseModalProps> = ({
  isOpen,
  contentClassName,
  overlayClassName,
  children,
  bodyOpenClassName,
  preventScroll = true,
  onRequestClose,
  closeButtonProps,
  ...props
}) => {
  const preventScrollClass = "overflow-hidden pr-[calc(var(--scroll-width)*1px)]"
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={cn("fixed inset-0 bg-black/75 z-zDialog flex items-center justify-center", overlayClassName)}
      ariaHideApp={false}
      className={cn("relative bg-secondary-bg rounded-md outline-none", contentClassName)}
      bodyOpenClassName={cn(preventScroll && preventScrollClass, bodyOpenClassName)}
      onRequestClose={(e) => {
        if (preventScroll) {
          preventScrollClass.split(" ").forEach((value) => {
            document.body.classList.remove(value)
          })
        }
        onRequestClose?.(e)
      }}
      {...props}
    >
      {children}
      <ButtonBase
        size={40}
        isIconOnly
        color={"black"}
        className="absolute top-4 right-4"
        {...closeButtonProps}
        onClick={onRequestClose}
      >
        <IconClose className="w-3 h-3" />
      </ButtonBase>
    </ReactModal>
  )
}

export default ModalBase
