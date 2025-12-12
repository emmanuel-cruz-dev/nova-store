import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const useNavigationBar = () => {
  const { logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  const handleNavigate = () => {
    setShowMenu(false);
    navigate("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    showMenu,
    toggleMenu,
    handleLogout,
    handleNavigate,
    menuRef,
  };
};
