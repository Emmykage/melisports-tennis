import { cn } from "../../lib/utils";

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary-700 disabled:bg-gray-200/40 disabled:text-gray-400",
  static:
    "bg-primary-700 text-white disabled:bg-gray-200/40 disabled:text-gray-400",
  secondary:
    "border border-secondary-100 bg-secondary text-white disabled:border-primary-500/40 disabled:text-primary-500/40 hover:bg-gray-100 hover:text-gray-600",

  error:
    "bg-warning-500 text-white hover:bg-warning-500/40 disabled:bg-warning-500/40",

  success:
    "bg-success-500 text-white hover:bg-success-500/40 disabled:bg-success-500/40",
};

const Button = ({
  children,
  variant = "primary",
  className,
  isLoading = false,
  loadMessage = "Loading",
  disabled = false,
  type = "button",
  ref,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-all duration-200 ease-in-out active:scale-[0.98] cursor-pointer",
        "disabled:cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {isLoading && (
        <span
          className="size-5 animate-spin rounded-full border-4 border-current border-r-transparent motion-reduce:animate-none"
          aria-hidden="true"
        />
      )}
      <span className={cn(isLoading && "sr-only")}>{children}</span>

      <span role="status" className="sr-only">
        {isLoading ? `${loadMessage}...` : ""}
      </span>
    </button>
  );
};

export default Button;
