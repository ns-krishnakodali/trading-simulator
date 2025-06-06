import { JSX } from "react";

interface ILoader {
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
}

export const Loader = ({
  width = 60,
  height = 60,
  className,
  stroke = "#60A5FA",
}: ILoader): JSX.Element => {
  return (
    <span className={className}>
      <svg width={width} height={height} viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="60 120"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </span>
  );
};
