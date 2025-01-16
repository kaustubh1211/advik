const Image = "next/image";
const homeImage1 = "/img/home-demos/home-1.jpg";
const homeImage2 = "/img/home-demos/home-2.jpg";
const homeImage3 = "/img/home-demos/home-3.jpg";
const homeImage4 = "/img/home-demos/home-4.jpg";
const homeImage5 = "/img/home-demos/home-5.jpg";
const homeImage6 = "/img/home-demos/home-6.jpg";
const homeImage7 = "/img/home-demos/home-7.jpg";
const homeImage8 = "/img/home-demos/home-8.jpg";
const homeImage9 = "/img/home-demos/home-9.jpg";
const homeImage10 = "/img/home-demos/home-10.jpg";
const homeImage11 = "/img/home-demos/home-11.jpg";

const dropdownBannerImage1 = "/img/banner/menu-banner-1.png";
import HomeDropdown from "./HomeDropdown";
import CommonDropdown from "./CommonDropdown";
import PagesDropdown from "./PagesDropdown";
import NavItem from "./NavItem";
import Link from "next/link";
import { useHeaderContex } from "@/providers/HeaderContex";
import Logo from "./Logo";

const Navbar = () => {
  const { headerStyle, headerSize, isNavbarAppointmentBtn, isTextWhite } =
    useHeaderContex();
  const navItemsRaw = [
    {
      name: "Home",
      path: "/",
      dropdown: null,
    },
    {
      name: "About",
      path: "#",
      dropdown: null,
      dropdownSection: [
        {
          title: null,
          path: "#",
          dropdownItems: [
            {
              name: "About",

              path: "/about",
            },
           
        

            {
              name: "FAQ",

              path: "/faq",
            },
         
          ],
        },
      ],
    },
    {
      name: "Shop",
      path: "/shop",
      dropdown: null,
      isNestedDropdown: null,
    
    },
    {
      name: "cart",
      path: "/cart",
      dropdown: null,
    },

    {
      name: "Contact",
      path: "/contact",
      dropdown: null,
    },
  ];
  const navItems = navItemsRaw?.map((navItem, idx) => ({
    ...navItem,
    dropdown:
      idx === 0 ? (
        <HomeDropdown itmes={navItem?.dropdownSection} />
      ) : idx > 0 && idx < 4 ? (
        <CommonDropdown items={navItem?.dropdownSection} />
      ) : idx === 10 ? (
        <PagesDropdown itmes={navItem?.dropdownSection} />
      ) : null,
  }));
  return (
    <div
      className={`col header-menu-column ${
        headerStyle === 2 || isTextWhite
          ? " menu-color-white"
          : headerStyle === 5
          ? "justify-content-center align-items-center"
          : ""
      }`}
    >
      {headerStyle === 5 ? <Logo sticky={true} /> : ""}
      <div
        className={`header-menu ${
          headerStyle === 5 ? "header-menu-2" : "d-none d-xl-block "
        } `}
      >
        <nav>
          <div className="ltn__main-menu">
            <ul>
              {navItems?.map((item, idx) => (
                <NavItem key={idx} item={item} />
              ))}
              {isNavbarAppointmentBtn ||
              headerSize === "lg" ||
              headerStyle === 2 ||
              headerStyle === 4 ? (
                <li className="special-link text-uppercase">
                  <Link href="/contact">GET A Quote</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
