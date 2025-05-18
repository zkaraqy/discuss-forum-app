import { useState } from 'react';

export default function useTogglePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return { showPassword, togglePasswordVisibility };
}