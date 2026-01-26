import type { FC, SVGProps } from "react";

// --- Types ---

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

interface SizedIconProps {
  size?: number;
  className?: string;
}

// --- Icons ---

export function CalendarIcon({ title = "calendar", ...props }: IconProps) {
  return (
    <svg
      height="48"
      width="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g>
        <path
          d="M7 5H41C43.76 5 46 7.24 46 10V18H2V10C2 7.24 4.24 5 7 5Z"
          fill="url(#nc-ui-7-0_linear_219_158)"
        />
        <path
          d="M2 18H46V41C46 43.76 43.76 46 41 46H7C4.24 46 2 43.76 2 41V18Z"
          fill="url(#nc-ui-7-1_linear_219_158)"
        />
        <path
          d="M13 10C12.448 10 12 9.552 12 9V2C12 1.448 12.448 1 13 1C13.552 1 14 1.448 14 2V9C14 9.552 13.552 10 13 10Z"
          fill="url(#nc-ui-7-2_linear_219_158)"
        />
        <path
          d="M35 10C34.448 10 34 9.552 34 9V2C34 1.448 34.448 1 35 1C35.552 1 36 1.448 36 2V9C36 9.552 35.552 10 35 10Z"
          fill="url(#nc-ui-7-3_linear_219_158)"
        />
        <path
          d="M17 32H11C10.4477 32 10 32.4477 10 33V39C10 39.5523 10.4477 40 11 40H17C17.5523 40 18 39.5523 18 39V33C18 32.4477 17.5523 32 17 32Z"
          fill="url(#nc-ui-7-4_linear_219_158)"
        />
        <path
          d="M17 22H11C10.4477 22 10 22.4477 10 23V29C10 29.5523 10.4477 30 11 30H17C17.5523 30 18 29.5523 18 29V23C18 22.4477 17.5523 22 17 22Z"
          fill="url(#nc-ui-7-5_linear_219_158)"
        />
        <path
          d="M27 32H21C20.4477 32 20 32.4477 20 33V39C20 39.5523 20.4477 40 21 40H27C27.5523 40 28 39.5523 28 39V33C28 32.4477 27.5523 32 27 32Z"
          fill="url(#nc-ui-7-6_linear_219_158)"
        />
        <path
          d="M27 22H21C20.4477 22 20 22.4477 20 23V29C20 29.5523 20.4477 30 21 30H27C27.5523 30 28 29.5523 28 29V23C28 22.4477 27.5523 22 27 22Z"
          fill="url(#nc-ui-7-7_linear_219_158)"
        />
        <path
          d="M37 22H31C30.4477 22 30 22.4477 30 23V29C30 29.5523 30.4477 30 31 30H37C37.5523 30 38 29.5523 38 29V23C38 22.4477 37.5523 22 37 22Z"
          fill="url(#nc-ui-7-8_linear_219_158)"
        />
        <defs>
          <linearGradient
            id="nc-ui-7-0_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="24"
            x2="24"
            y1="5"
            y2="18"
          >
            <stop stopColor="#5B5E71" />
            <stop offset="1" stopColor="#393A46" />
          </linearGradient>
          <linearGradient
            id="nc-ui-7-1_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="24"
            x2="24"
            y1="18"
            y2="46"
          >
            <stop stopColor="#E0E0E6" />
            <stop offset="1" stopColor="#C2C3CD" />
          </linearGradient>
          <linearGradient
            id="nc-ui-7-2_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="13"
            x2="13"
            y1="1"
            y2="10"
          >
            <stop stopColor="#A2A3B4" />
            <stop offset="1" stopColor="#83849B" />
          </linearGradient>
          <linearGradient
            id="nc-ui-7-3_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="35"
            x2="35"
            y1="1"
            y2="10"
          >
            <stop stopColor="#A2A3B4" />
            <stop offset="1" stopColor="#83849B" />
          </linearGradient>
          <linearGradient
            id="nc-ui-7-4_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="14"
            x2="14"
            y1="32"
            y2="40"
          >
            <stop stopColor="#A2A3B4" />
            <stop offset="1" stopColor="#83849B" />
          </linearGradient>
          <linearGradient
            id="nc-ui-7-5_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="14"
            x2="14"
            y1="22"
            y2="30"
          >
            <stop stopColor="#A2A3B4" />
            <stop offset="1" stopColor="#83849B" />
          </linearGradient>
          <linearGradient
            id="nc-ui-7-6_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="24"
            x2="24"
            y1="32"
            y2="40"
          >
            <stop stopColor="#A2A3B4" />
            <stop offset="1" stopColor="#83849B" />
          </linearGradient>
          <linearGradient
            id="nc-ui-7-7_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="24"
            x2="24"
            y1="22"
            y2="30"
          >
            <stop stopColor="#A2A3B4" />
            <stop offset="1" stopColor="#83849B" />
          </linearGradient>
          <linearGradient
            id="nc-ui-7-8_linear_219_158"
            gradientUnits="userSpaceOnUse"
            x1="34"
            x2="34"
            y1="22"
            y2="30"
          >
            <stop stopColor="#A2A3B4" />
            <stop offset="1" stopColor="#83849B" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}

export function ClockIcon({ title = "clock", ...props }: IconProps) {
  return (
    <svg
      height="48"
      width="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g>
        <path
          d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
          fill="url(#nc-ui-2-0_linear_103_120)"
        />
        <path
          d="M32 25H24C23.7 25 23.4 24.8 23.2 24.6L15.2 12.6C14.9 12.1 15 11.5 15.5 11.2C16 10.9 16.6 11 16.9 11.5L24.5 23H32C32.6 23 33 23.4 33 24C33 24.6 32.6 25 32 25Z"
          fill="url(#nc-ui-2-1_linear_103_120)"
        />
        <path
          d="M23 5C23 4.4 23.4 4 24 4C24.6 4 25 4.4 25 5V9C25 9.6 24.6 10 24 10C23.4 10 23 9.6 23 9V5Z"
          fill="url(#nc-ui-2-2_linear_103_120)"
        />
        <path
          d="M9 25H5C4.4 25 4 24.6 4 24C4 23.4 4.4 23 5 23H9C9.6 23 10 23.4 10 24C10 24.6 9.6 25 9 25Z"
          fill="url(#nc-ui-2-3_linear_103_120)"
        />
        <path
          d="M25 43C25 43.6 24.6 44 24 44C23.4 44 23 43.6 23 43V39C23 38.4 23.4 38 24 38C24.6 38 25 38.4 25 39V43Z"
          fill="url(#nc-ui-2-4_linear_103_120)"
        />
        <path
          d="M43 25H39C38.4 25 38 24.6 38 24C38 23.4 38.4 23 39 23H43C43.6 23 44 23.4 44 24C44 24.6 43.6 25 43 25Z"
          fill="url(#nc-ui-2-5_linear_103_120)"
        />
        <defs>
          <linearGradient
            id="nc-ui-2-0_linear_103_120"
            gradientUnits="userSpaceOnUse"
            x1="24"
            x2="24"
            y1="1"
            y2="47"
          >
            <stop stopColor="#C5DCE7" />
            <stop offset="1" stopColor="#80B0CB" />
          </linearGradient>
          <linearGradient
            id="nc-ui-2-1_linear_103_120"
            gradientUnits="userSpaceOnUse"
            x1="24.0156"
            x2="24.0156"
            y1="11.0312"
            y2="25"
          >
            <stop stopColor="#4480A7" />
            <stop offset="1" stopColor="#32597C" />
          </linearGradient>
          <linearGradient
            id="nc-ui-2-2_linear_103_120"
            gradientUnits="userSpaceOnUse"
            x1="24"
            x2="24"
            y1="4"
            y2="44.5"
          >
            <stop stopColor="#80B0CB" />
            <stop offset="1" stopColor="#4480A7" />
          </linearGradient>
          <linearGradient
            id="nc-ui-2-3_linear_103_120"
            gradientUnits="userSpaceOnUse"
            x1="7"
            x2="7"
            y1="4"
            y2="43.5"
          >
            <stop stopColor="#80B0CB" />
            <stop offset="1" stopColor="#4480A7" />
          </linearGradient>
          <linearGradient
            id="nc-ui-2-4_linear_103_120"
            gradientUnits="userSpaceOnUse"
            x1="24"
            x2="24"
            y1="4.5"
            y2="44"
          >
            <stop stopColor="#80B0CB" />
            <stop offset="1" stopColor="#4480A7" />
          </linearGradient>
          <linearGradient
            id="nc-ui-2-5_linear_103_120"
            gradientUnits="userSpaceOnUse"
            x1="41"
            x2="41"
            y1="4.5"
            y2="44.5"
          >
            <stop stopColor="#80B0CB" />
            <stop offset="1" stopColor="#4480A7" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}

export const DateIcon: FC<SizedIconProps> = ({ size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <g>
        <path
          d="M0.84 17.22a2.1 2.1 0 0 0 2.1 2.1h14.28a2.1 2.1 0 0 0 2.1-2.1v-10.5h-18.48z"
          fill="#e3e3e3"
        />
        <path
          d="M17.22 2.52h-14.28a2.1 2.1 0 0 0-2.1 2.1v2.1h18.48v-2.1a2.1 2.1 0 0 0-2.1-2.1z"
          fill="#ff7163"
        />
        <path
          d="M9.76 16.34h-4.57v-0.97c1.21-1.23 2.25-2.25 2.59-2.69 0.58-0.75 0.48-1.39 0.21-1.63-0.54-0.48-1.44-0.04-2.07 0.48l-0.75-0.89a3.2 3.2 0 0 1 2.34-0.94c1.21 0 2.07 0.7 2.07 1.77a2.54 2.54 0 0 1-0.65 1.66c-0.35 0.43-2.02 2.04-2.02 2.04h2.85z"
          fill="#aeaeae"
        />
        <path
          d="M10.37 13.51q0-1.94 0.82-2.89a3.07 3.07 0 0 1 2.46-0.95 4.47 4.47 0 0 1 0.88 0.07v1.1a3.58 3.58 0 0 0-0.79-0.09c-0.76 0-1.48 0.18-1.83 0.85a2.91 2.91 0 0 0-0.27 1.19 1.77 1.77 0 0 1 1.48-0.76c1.23 0 1.87 0.85 1.87 2.07 0 1.37-0.8 2.27-2.23 2.27-1.59 0-2.39-1.2-2.39-2.86z m2.36 1.76c0.65 0 0.92-0.49 0.92-1.15 0-0.61-0.27-1.03-0.89-1.03a0.97 0.97 0 0 0-1.01 0.91c0 0.64 0.36 1.27 0.98 1.27z"
          fill="#aeaeae"
        />
        <path
          d="M4.83 5.04a0.63 0.63 0 0 1-0.63-0.63v-2.94a0.63 0.63 0 0 1 1.26 0v2.94a0.63 0.63 0 0 1-0.63 0.63z"
          fill="#363636"
        />
        <path
          d="M15.33 5.04a0.63 0.63 0 0 1-0.63-0.63v-2.94a0.63 0.63 0 0 1 1.26 0v2.94a0.63 0.63 0 0 1-0.63 0.63z"
          fill="#363636"
        />
      </g>
    </svg>
  );
};

export const FolderIcon: FC<SizedIconProps> = ({ size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <g>
        <path
          fill="#5F4025"
          d="M0.84 13.44l2.94-5.88h12.6l2.94 5.88-9.24 4.2z"
        />
        <path
          fill="#A67C52"
          d="M10.08 18.06a0.42 0.42 0 0 1-0.17-0.04l-9.24-4.2a0.42 0.42 0 0 1-0.23-0.24 0.42 0.42 0 0 1 0.02-0.33l2.94-5.88c0.07-0.14 0.22-0.23 0.38-0.23h12.6c0.16 0 0.3 0.09 0.38 0.23l2.94 5.88a0.42 0.42 0 0 1-0.21 0.57l-9.24 4.2a0.43 0.43 0 0 1-0.17 0.04z m-8.67-4.82l8.67 3.94 8.67-3.94-2.63-5.26h-12.08l-2.63 5.26z"
        />
        <path
          fill="#E6E6E6"
          d="M16.38 15.96h-12.6a0.42 0.42 0 0 1-0.42-0.42v-14.7a0.42 0.42 0 0 1 0.42-0.42h12.6a0.42 0.42 0 0 1 0.42 0.42v14.7a0.42 0.42 0 0 1-0.42 0.42z"
        />
        <path
          fill="#A67C52"
          d="M13.02 13.02v2.1a0.42 0.42 0 0 1-0.42 0.42h-5.04a0.42 0.42 0 0 1-0.42-0.42v-2.1h-6.3a0.42 0.42 0 0 0-0.42 0.42v5.88a0.42 0.42 0 0 0 0.42 0.42h18.48a0.42 0.42 0 0 0 0.42-0.42v-5.88a0.42 0.42 0 0 0-0.42-0.42h-6.3z"
        />
        <path
          fill="#B3B3B3"
          d="M13.86 5.46h-7.56a0.42 0.42 0 0 1 0-0.84h7.56a0.42 0.42 0 0 1 0 0.84z"
        />
        <path
          fill="#B3B3B3"
          d="M13.86 9.24h-7.56a0.42 0.42 0 0 1 0-0.84h7.56a0.42 0.42 0 0 1 0 0.84z"
        />
      </g>
    </svg>
  );
};

export const ReadingTimeIcon: FC<SizedIconProps> = ({ size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <g>
        <path
          fill="#e3e3e3"
          d="M10.08 1.26a8.82 8.82 0 1 0 0 17.64 8.82 8.82 0 1 0 0-17.64z"
        />
        <path
          d="M10.08 19.74a9.66 9.66 0 1 1 9.66-9.66 9.67 9.67 0 0 1-9.66 9.66z m0-17.64a7.98 7.98 0 1 0 7.98 7.98 7.99 7.99 0 0 0-7.98-7.98z"
          fill="#2a4b55"
        />
        <path
          d="M6.3 15.12a0.42 0.42 0 0 1-0.32-0.69l3.78-4.62a0.42 0.42 0 0 1 0.65 0.54l-3.78 4.62a0.42 0.42 0 0 1-0.33 0.15z"
          fill="#ff7163"
        />
        <path
          fill="#2a4b55"
          d="M10.08 8.82a1.26 1.26 0 1 0 0 2.52 1.26 1.26 0 1 0 0-2.52z"
        />
        <path
          d="M13.86 10.5h-3.78a0.42 0.42 0 0 1-0.35-0.19l-3.36-5.04a0.42 0.42 0 1 1 0.7-0.46l3.23 4.85h3.56a0.42 0.42 0 0 1 0 0.84z"
          fill="#2a4b55"
        />
        <path
          d="M10.08 4.62a0.42 0.42 0 0 1-0.42-0.42v-0.84a0.42 0.42 0 0 1 0.84 0v0.84a0.42 0.42 0 0 1-0.42 0.42z"
          fill="#aeaeae"
        />
        <path
          d="M15.54 10.08a0.42 0.42 0 0 1 0.42-0.42h0.84a0.42 0.42 0 0 1 0 0.84h-0.84a0.42 0.42 0 0 1-0.42-0.42z"
          fill="#aeaeae"
        />
        <path
          d="M10.08 15.54a0.42 0.42 0 0 1 0.42 0.42v0.84a0.42 0.42 0 0 1-0.84 0v-0.84a0.42 0.42 0 0 1 0.42-0.42z"
          fill="#aeaeae"
        />
        <path
          d="M4.62 10.08a0.42 0.42 0 0 1-0.42 0.42h-0.84a0.42 0.42 0 0 1 0-0.84h0.84a0.42 0.42 0 0 1 0.42 0.42z"
          fill="#aeaeae"
        />
      </g>
    </svg>
  );
};
