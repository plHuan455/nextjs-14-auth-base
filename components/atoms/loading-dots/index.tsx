import { cn } from "lib/utils/cn"

interface LoadingDotsProps {
  className?: string
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ className }) => {
  return (
    <div className={cn("h-[0.25em] flex gap-1 w-fit text-[currentColor]", className)}>
      <div className="bg-[currentColor] shrink-0 h-full aspect-square rounded-full animate-loadingDot" />
      <div
        className="bg-[currentColor] shrink-0 h-full aspect-square rounded-full animate-loadingDot"
        style={{
          animationDelay: "187.5ms",
        }}
      />
      <div
        className="bg-[currentColor] shrink-0 h-full aspect-square rounded-full animate-loadingDot"
        style={{
          animationDelay: "375ms",
        }}
      />
    </div>
  )
}

export default LoadingDots
