import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /* 🎨 Brand Colors */
      colors: {
        brandGreen: "#10B981",
        brandDark: "#0B1120",
        primary: {
          DEFAULT: "#2563EB",   // Main Blue (matching the logo)
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#10B981", // Brand Green
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        primaryLight: "#EEF2FF",
        dark: "#111827",
        muted: {
          DEFAULT: "#64748B",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      /* 🔤 Fonts */
      fontFamily: {
        sans: ["Outfit", "Inter", '"Space Grotesk"', "system-ui", "sans-serif"],
      },

      /* 🧠 Typography Polish */
      letterSpacing: {
        tightest: "-0.04em",
      },

      lineHeight: {
        tight: "1.15",
        relaxed: "1.75",
      },

      /* 🌫️ Shadows (for cards / navbar) */
      boxShadow: {
        soft: "0 10px 30px rgba(37, 99, 235, 0.15)",
        strong: "0 20px 50px rgba(37, 99, 235, 0.25)",
      },

      /* ✨ Animations */
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
