"use client"

import * as React from "react"
import { useTheme } from "next-themes"


import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
export function ModeToggle() {
  const { theme,setTheme } = useTheme()
  const toggleTheme = () => {
    // Check the current theme and toggle it
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2 mt-5 mb-10">
      <Switch id="airplane-mode" onClick={toggleTheme}/>
      <Label htmlFor="airplane-mode">Change Theme</Label>
    </div>
  )
}
