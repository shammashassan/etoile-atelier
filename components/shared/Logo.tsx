import React from "react";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";

export { AmaraMark as EtoileMark, AmaraSeal as EtoileSeal };

export interface AmaraMarkProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  showHalo?: boolean;
}

export type EtoileMarkProps = AmaraMarkProps;

/**
 * The Amara Sovereign Star Mark
 * An 8-point celestial star structured with diamond pavilion facet geometry
 * and sovereign gold framing.
 */
export function AmaraMark({
  className,
  size = 32,
  showHalo = true,
  ...props
}: AmaraMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${BRAND.name} Star Mark`}
      className={cn("shrink-0 transition-transform duration-300", className)}
      {...props}
    >
      {showHalo && (
        <>
          {/* Sovereign Octagonal Halo */}
          <polygon
            points="32,6 68,6 94,32 94,68 68,94 32,94 6,68 6,32"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            strokeDasharray="2.5 2.5"
          />
          {/* Subtle Outer Tension Ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.25"
          />
        </>
      )}

      {/* 8-Point Faceted Diamond Celestial Star */}
      <g className="amara-star-facets">
        {/* North Ray */}
        <polygon points="50,50 44.8,37.5 50,4" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 50,4 55.2,37.5" fill="currentColor" fillOpacity="0.95" />

        {/* North-East Ray */}
        <polygon points="50,50 55.2,37.5 74,26" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 74,26 62.5,44.8" fill="currentColor" fillOpacity="0.95" />

        {/* East Ray */}
        <polygon points="50,50 62.5,44.8 96,50" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 96,50 62.5,55.2" fill="currentColor" fillOpacity="0.95" />

        {/* South-East Ray */}
        <polygon points="50,50 62.5,55.2 74,74" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 74,74 55.2,62.5" fill="currentColor" fillOpacity="0.95" />

        {/* South Ray */}
        <polygon points="50,50 55.2,62.5 50,96" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 50,96 44.8,62.5" fill="currentColor" fillOpacity="0.95" />

        {/* South-West Ray */}
        <polygon points="50,50 44.8,62.5 26,74" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 26,74 37.5,55.2" fill="currentColor" fillOpacity="0.95" />

        {/* West Ray */}
        <polygon points="50,50 37.5,55.2 4,50" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 4,50 37.5,44.8" fill="currentColor" fillOpacity="0.95" />

        {/* North-West Ray */}
        <polygon points="50,50 37.5,44.8 26,26" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 26,26 44.8,37.5" fill="currentColor" fillOpacity="0.95" />
      </g>

      {/* Central Brilliant Core (Diamond Pavilion Table Facet) */}
      <polygon
        points="50,46.5 53.5,50 50,53.5 46.5,50"
        fill="#ffffff"
        fillOpacity="0.9"
      />
      <circle cx="50" cy="50" r="1.5" fill="currentColor" />
    </svg>
  );
}

export interface AmaraSealProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

export type EtoileSealProps = AmaraSealProps;

/**
 * The Amara Sovereign Hallmark Seal
 * Inspired by sovereign master goldsmith hallmarks.
 */
export function AmaraSeal({
  className,
  size = 80,
  ...props
}: AmaraSealProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${BRAND.name} Hallmark Seal`}
      className={cn("shrink-0", className)}
      {...props}
    >
      <defs>
        <path id="seal-text-top-jsx" d="M 28 80 A 52 52 0 1 1 132 80" />
        <path id="seal-text-bottom-jsx" d="M 132 80 A 52 52 0 0 1 28 80" />
      </defs>

      {/* Place Vendôme Outer Octagon */}
      <polygon
        points="50,6 110,6 154,50 154,110 110,154 50,154 6,110 6,50"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      <polygon
        points="52,10 108,10 150,52 150,108 108,150 52,150 10,108 10,52"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />

      {/* Inner Circular Framing Rings */}
      <circle
        cx="80"
        cy="80"
        r="68"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.35"
      />
      <circle
        cx="80"
        cy="80"
        r="44"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.4"
      />

      {/* Circular Arch Typography */}
      <text
        fontFamily="var(--font-heading, serif)"
        fontSize="7"
        fontWeight="600"
        letterSpacing="3.5"
        fill="currentColor"
      >
        <textPath href="#seal-text-top-jsx" startOffset="50%" textAnchor="middle">
          {BRAND.name.toUpperCase()}
        </textPath>
      </text>
      <text
        fontFamily="var(--font-heading, serif)"
        fontSize="6"
        fontWeight="500"
        letterSpacing="3"
        fill="currentColor"
        fillOpacity="0.85"
      >
        <textPath href="#seal-text-bottom-jsx" startOffset="50%" textAnchor="middle">
          {BRAND.establishedText.toUpperCase()}
        </textPath>
      </text>

      {/* Flanking Diamond Star Accent Points */}
      <polygon points="26,80 27.5,78 30,80 27.5,82" fill="currentColor" />
      <polygon points="134,80 132.5,78 130,80 132.5,82" fill="currentColor" />

      {/* Scaled Center Faceted Star */}
      <g transform="translate(48, 48) scale(0.64)">
        <polygon points="50,50 44.8,37.5 50,4" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 50,4 55.2,37.5" fill="currentColor" fillOpacity="0.95" />
        <polygon points="50,50 55.2,37.5 74,26" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 74,26 62.5,44.8" fill="currentColor" fillOpacity="0.95" />
        <polygon points="50,50 62.5,44.8 96,50" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 96,50 62.5,55.2" fill="currentColor" fillOpacity="0.95" />
        <polygon points="50,50 62.5,55.2 74,74" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 74,74 55.2,62.5" fill="currentColor" fillOpacity="0.95" />
        <polygon points="50,50 55.2,62.5 50,96" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 50,96 44.8,62.5" fill="currentColor" fillOpacity="0.95" />
        <polygon points="50,50 44.8,62.5 26,74" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 26,74 37.5,55.2" fill="currentColor" fillOpacity="0.95" />
        <polygon points="50,50 37.5,55.2 4,50" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 4,50 37.5,44.8" fill="currentColor" fillOpacity="0.95" />
        <polygon points="50,50 37.5,44.8 26,26" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 26,26 44.8,37.5" fill="currentColor" fillOpacity="0.95" />
        <polygon points="50,46.5 53.5,50 50,53.5 46.5,50" fill="#ffffff" fillOpacity="0.9" />
        <circle cx="50" cy="50" r="1.5" fill="currentColor" />
      </g>
    </svg>
  );
}

export interface LogoProps {
  variant?: "horizontal" | "stacked" | "mark" | "seal" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  atelierName?: string;
  subtitle?: string;
  className?: string;
  markClassName?: string;
  goldAccent?: boolean;
}

/**
 * Universal Amara Gold Haute Joaillerie Logo Component
 */
export function Logo({
  variant = "horizontal",
  size = "md",
  atelierName = BRAND.name,
  subtitle = BRAND.subtitle,
  className,
  markClassName,
  goldAccent = false,
}: LogoProps) {
  const markSizeMap = {
    sm: 24,
    md: 34,
    lg: 48,
    xl: 68,
  };

  const sealSizeMap = {
    sm: 44,
    md: 64,
    lg: 88,
    xl: 120,
  };

  const titleSizeMap = {
    sm: "text-lg tracking-wide",
    md: "text-xl sm:text-2xl tracking-widest",
    lg: "text-2xl sm:text-3xl lg:text-4xl tracking-widest",
    xl: "text-4xl sm:text-5xl lg:text-6xl tracking-widest",
  };

  const subtitleSizeMap = {
    sm: "text-[10px] tracking-wider",
    md: "text-xs tracking-widest",
    lg: "text-xs sm:text-sm tracking-widest",
    xl: "text-sm sm:text-base tracking-[0.25em]",
  };

  if (variant === "mark") {
    return (
      <AmaraMark
        size={markSizeMap[size]}
        className={cn(goldAccent ? "text-primary" : "text-foreground", className, markClassName)}
      />
    );
  }

  if (variant === "seal") {
    return (
      <AmaraSeal
        size={sealSizeMap[size]}
        className={cn(goldAccent ? "text-primary" : "text-foreground", className)}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("flex flex-col text-left", className)}>
        <span
          className={cn(
            "font-heading font-normal uppercase text-foreground leading-none",
            titleSizeMap[size]
          )}
        >
          {atelierName}
        </span>
        {subtitle && (
          <span
            className={cn(
              "uppercase text-muted-foreground mt-1 font-light",
              subtitleSizeMap[size]
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center text-center gap-3 group", className)}>
        <AmaraMark
          size={markSizeMap[size]}
          className={cn(
            "transition-transform duration-300 group-hover:scale-105",
            goldAccent ? "text-primary" : "text-foreground",
            markClassName
          )}
        />
        <div className="flex flex-col items-center">
          <span
            className={cn(
              "font-heading font-normal uppercase text-foreground leading-tight",
              titleSizeMap[size]
            )}
          >
            {atelierName}
          </span>
          {subtitle && (
            <span
              className={cn(
                "uppercase text-muted-foreground mt-1 font-light",
                subtitleSizeMap[size]
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={cn("flex items-center gap-3.5 group", className)}>
      <AmaraMark
        size={markSizeMap[size]}
        className={cn(
          "transition-transform duration-300 group-hover:scale-105",
          goldAccent ? "text-primary" : "text-foreground",
          markClassName
        )}
      />
      <div className="flex flex-col text-left">
        <span
          className={cn(
            "font-heading font-normal uppercase text-foreground leading-none",
            titleSizeMap[size]
          )}
        >
          {atelierName}
        </span>
        {subtitle && (
          <span
            className={cn(
              "uppercase text-muted-foreground mt-1 font-light",
              subtitleSizeMap[size]
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
