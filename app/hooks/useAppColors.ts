import { useTheme } from "@/app/context/ThemeContext";
import { getColors } from "@/app/styles/global";

export function useAppColors() {
  const { isDark } = useTheme();
  return getColors(isDark);
}