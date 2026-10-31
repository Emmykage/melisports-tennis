import React, { useEffect, useRef } from "react";
import "../../pages/admin-page/adminstyle.scss";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { RiMessageLine } from "react-icons/ri";
import { MdHome, MdOutlineInventory, MdOutlineSell } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../assets/images/logo/melisport_1.png";
import { userProfile } from "../../redux/actions/auth";
import { cn } from "../../lib/utils";

const SideNav = ({ showMenu, handleMenu, stats }) => {
  const asideRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(showMenu, "sho wmenu");

  const closeMenu = () => {
    if (showMenu) handleMenu?.();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        asideRef.current &&
        !asideRef.current.contains(e.target) &&
        showMenu
      ) {
        handleMenu?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, handleMenu]);

  const signOut = () => {
    localStorage.removeItem("meli_auth");
    dispatch(userProfile());
    closeMenu();
    navigate("/auth/admin_login", { replace: true });
  };

  const links = [
    {
      label: "Dashboard",
      to: "/admin/dashboard",
      icon: BsFillGrid1X2Fill,
      end: true,
    },
    {
      label: "Customers",
      to: "/admin/customers",
      icon: AiOutlineUser,
    },
    {
      label: "Orders",
      to: "/admin/orders",
      icon: MdOutlineSell,
      count: stats?.viewed_orders,
    },
    {
      label: "Agents",
      to: "/admin/agents",
      icon: GrUserManager,
    },
    {
      label: "Messages",
      to: "/admin/messages",
      icon: RiMessageLine,
      count: stats?.messages,
    },
    {
      label: "Products",
      to: "/admin/products",
      icon: MdOutlineInventory,
    },
    {
      label: "Add product",
      to: "/admin/addproduct",
      icon: IoAddSharp,
    },
    {
      label: "Delivery",
      to: "/admin/delivery-fee",
      icon: TbTruckDelivery,
    },
    {
      label: "Settings",
      to: "/admin/settings",
      icon: FiSettings,
    },
  ];

  const linkClass = ({ isActive }) =>
    `group relative mx-2 flex items-center gap-3 rounded-xl px-3 py-3 transition-colors
    ${
      isActive
        ? "active bg-gray-100 font-semibold text-gray-900"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {showMenu && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={handleMenu}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        ref={asideRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col pt-10",
          "overflow-hidden border-r border-gray-100 bg-white shadow-xl",
          "transition-[transform,width] duration-300 ease-in-out",

          // Mobile: slide in and out
          showMenu ? "translate-x-0" : "-translate-x-full",

          // Tablet: fixed-width icon sidebar
          "md:sticky md:top-0 md:h-screen md:w-20 md:max-w-none",
          "md:translate-x-0 md:shadow-none",

          // Desktop: expanded sidebar
          "lg:w-64",
        )}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-center border-b border-gray-100 px-4 py-4 lg:justify-start lg:px-5">
          <NavLink
            to="/admin/dashboard"
            onClick={closeMenu}
            title="Melisports dashboard"
            className="block w-32 md:w-10 lg:w-32"
          >
            <img
              src={logo}
              alt="Melisports"
              className="h-20 w-full object-contain"
            />
          </NavLink>

          {/* <button
            type="button"
            onClick={handleMenu}
            aria-label="Close navigation"
            className="ml-auto rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button> */}
        </div>

        {/* Navigation */}
        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden py-4">
          <div className="flex flex-col gap-1">
            {links.map(({ label, to, icon: Icon, count, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                title={label}
                aria-label={label}
                className={linkClass}
              >
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                  <Icon className="text-xl" />

                  {/* Notification dot in compact tablet view */}
                  {count > 0 && (
                    <span className="absolute -right-2 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white lg:hidden" />
                  )}
                </span>

                <span className="min-w-0 flex-1 truncate md:hidden lg:block">
                  {label}
                </span>

                {/* Notification count on mobile and desktop */}
                {count > 0 && (
                  <span className="shrink-0 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white md:hidden lg:block">
                    {count}
                  </span>
                )}

                {/* Tooltip for tablet icon-only view */}
                <span className="pointer-events-none absolute left-full top-1/2 z-[60] ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block lg:hidden">
                  {label}
                  {count > 0 ? ` (${count})` : ""}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Bottom actions */}
          <div className="mt-auto flex flex-col gap-1 border-t border-gray-100 pt-4">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              title="Go to store"
              aria-label="Go to store"
              className={linkClass}
            >
              <MdHome className="shrink-0 text-xl" />
              <span className="min-w-0 flex-1 truncate md:hidden lg:block">
                Go to store
              </span>
              <span className="pointer-events-none absolute left-full top-1/2 z-[60] ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg group-hover:opacity-100 md:block lg:hidden">
                Go to store
              </span>
            </NavLink>

            <button
              type="button"
              onClick={signOut}
              title="Log out"
              aria-label="Log out"
              className="group relative mx-2 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-red-600 transition-colors hover:bg-red-50"
            >
              <BiLogOut className="shrink-0 text-xl" />
              <span className="min-w-0 flex-1 truncate md:hidden lg:block">
                Log out
              </span>
              <span className="pointer-events-none absolute left-full top-1/2 z-[60] ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg group-hover:opacity-100 md:block lg:hidden">
                Log out
              </span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
