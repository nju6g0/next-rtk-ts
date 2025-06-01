import { ReactNode } from "react";

export const BUTTON_TYPES = {
  BUTTON: "button",
  SUBMIT: "submit",
  RESET: "reset",
} as const;

export const BUTTON_SIZES = {
  XL: "xl",
  LG: "lg",
  MD: "md",
  SM: "sm",
} as const;

export const BUTTON_VARIANTS = {
  DEFAULT: "default",
  PRIMARY: "primary",
  SECONDARY: "secondary",
} as const;

// 導出型別（從物件值中擷取 union 類型）
type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];
type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
}
function BaseButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = BUTTON_TYPES.BUTTON,
  size = BUTTON_SIZES.MD,
  variant = BUTTON_VARIANTS.PRIMARY,
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled;

  // 定義不同尺寸的 class
  const sizeClasses = {
    [BUTTON_SIZES.XL]: "px-10 py-4 text-2xl rounded-[32px]",
    [BUTTON_SIZES.LG]: "px-6 py-3 text-lg rounded-[26px]",
    [BUTTON_SIZES.MD]: "px-4 py-2 text-md rounded-[20px]",
    [BUTTON_SIZES.SM]: "px-2 py-1 text-sm rounded-[14px]",
  };

  // 定義不同樣式的 class
  const variantClasses = {
    [BUTTON_VARIANTS.DEFAULT]:
      "border-gray-400 text-gray-300 shadow-[0_5px_0px_rgb(0,0,0)] hover:bg-gray-200 hover:text-white",
    [BUTTON_VARIANTS.PRIMARY]:
      "text-white hover:shadow-[var(--buttonShadow)] bg-linear-[var(--linearButton)]",
    [BUTTON_VARIANTS.SECONDARY]:
      "border border-primary text-primary hover:shadow-[var(--buttonShadow)]",
  };

  const handleclick = () => {
    if (disabled || loading) return;
    onClick();
  };

  return (
    <button
      type={type}
      className={`
          box-border
          font-bold 
          cursor-pointer 
          disabled:bg-linear-[none]
          disabled:bg-gray-400
          disabled:border-gray-200
          disabled:cursor-not-allowed
          disabled:shadow-[none]
          ${sizeClasses[size]} 
          ${variantClasses[variant]} 
          ${className}
        `}
      onClick={handleclick}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}

// 定義不同的子屬性按鈕
const Button = ({ children, onClick, ...props }: ButtonProps) => (
  <BaseButton children={children} onClick={onClick} {...props} />
);
Button.Default = (props: ButtonProps) => (
  <BaseButton {...props} variant={BUTTON_VARIANTS.DEFAULT} />
);
Button.Primary = (props: ButtonProps) => (
  <BaseButton {...props} variant={BUTTON_VARIANTS.PRIMARY} />
);
Button.Secondary = (props: ButtonProps) => (
  <BaseButton {...props} variant={BUTTON_VARIANTS.SECONDARY} />
);

export default Button;
