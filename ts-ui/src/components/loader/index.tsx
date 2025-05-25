import { JSX } from "react";

interface ILoader {
  width?: number;
  height?: number;
}

export const Loader = (props: ILoader): JSX.Element => {
  const { width = 60, height = 60 } = props;

  return (
    <div>
      <svg width={width} height={height} viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#60A5FA"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray="60 120"
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
    </div>
  );
};
