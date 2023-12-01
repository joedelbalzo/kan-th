// // ThemeContext.js
// import React, { createContext, useState } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light"); // Default to light theme

//   // Toggle theme function
//   // const toggleTheme = () => {
//   //   // const newTheme = theme === "light" ? "dark" : "light";
//   //   // setTheme(newTheme);
//   //   // localStorage.setItem("theme", newTheme);
//   //   setTheme("light");
//   // };

//   // Load theme from localStorage
//   // useEffect(() => {
//   //   const localTheme = localStorage.getItem("theme");
//   //   if (localTheme) {
//   //     setTheme(localTheme);
//   //   } else {
//   //     // If no saved theme, use system preference
//   //     setTheme(
//   //       window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
//   //         ? "dark"
//   //         : "light"
//   //     );
//   //   }
//   // }, []);

//   return <ThemeContext.Provider value={{ theme /*toggleTheme*/ }}>{children}</ThemeContext.Provider>;
// };
