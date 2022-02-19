// `import { Navbar, Nav, Dropdown } from "rsuite";
import { useState } from "react";
import Logo from "./LogoDigination.png";
import style from "./Navbar.module.scss";
import { ReactComponent as ContactIcon } from "../talkIcon.svg";
import { Menu, Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import DropdownMenu from "../Dropdown/Dropdown";
import "./customizations.scss";
import { Button } from "antd";

function MenuOverlay() {
  return (
    <Menu className={style.modifiedMenu}>
      <Menu.Item className={style.modifiedListItem}>
        <a
          className={style.modified}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Banking
        </a>
      </Menu.Item>
      {/* <Menu.Item icon={<DownOutlined />} disabled> */}
      <Menu.Item className={style.modifiedListItem}>
        <a
          className={style.modified}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Healthcare
        </a>
      </Menu.Item>
      <Menu.Item className={style.modifiedListItem}>
        <a
          className={style.modified}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Fine tech
        </a>
      </Menu.Item>
      <Menu.Item className={style.modifiedListItem}>
        <a
          className={style.modified}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      </Menu.Item>
    </Menu>
  );
}
function NavigatonBar() {
  const [activeKey, setActiveKey] = useState(null);
  const overlayStyle = {
    width: "100%",
  };

  return (
    <nav className={style.navbar}>
      <div className={style.logoWrapper}>
        <img className={style.logo} src={Logo} alt={"Digination"} />
      </div>
      <div className={style.navItems}>
        {/* <Nav.Item eventKey="1" icon={<Home />}> */}

        <a className={style.navItem}>Home</a>
        <a className={style.navItem}>About us</a>
        <a className={style.navItem}>Services</a>
        <Dropdown overlayStyle={overlayStyle} overlay={MenuOverlay}>
          <a
            className={`${style.navItem} ${style.industry}`}
            onClick={(e) => e.preventDefault()}
          >
            Industry <CaretDownOutlined />
          </a>
        </Dropdown>
        {/* <DropdownMenu options={options} /> */}
        {/* <Dropdown className={`${style.dropdown}`} title="Solutions">
        <Dropdown.Item eventKey="4">Business Application</Dropdown.Item>
        <Dropdown.Item eventKey="5">Business Intelligence</Dropdown.Item>
        <Dropdown.Item eventKey="6">AI Solutions</Dropdown.Item>
        <Dropdown.Item eventKey="7">Industry</Dropdown.Item>
        <Dropdown.Item eventKey="8">Partners</Dropdown.Item>
        <Dropdown.Item eventKey="9">Clients</Dropdown.Item>
        <Dropdown.Item eventKey="10">Contact Us</Dropdown.Item>
      </Dropdown>
      <Dropdown className={`${style.dropdown}`} title="Clients">
        <Dropdown.Item eventKey="11">Business Application</Dropdown.Item>
        <Dropdown.Item eventKey="12">Business Intelligence</Dropdown.Item>
        <Dropdown.Item eventKey="13">AI Solutions</Dropdown.Item>
        <Dropdown.Item eventKey="14">Industry</Dropdown.Item>
        <Dropdown.Item eventKey="15">Partners</Dropdown.Item>
        <Dropdown.Item eventKey="16">Clients</Dropdown.Item>
        <Dropdown.Item eventKey="17">Contact Us</Dropdown.Item>
      </Dropdown> */}
        <a className={style.navItem}>Contact us</a>
        <a className={`${style.navItem} ${style.rightBorder}`}>NO</a>
        <a className={`${style.navItem} ${style.rightBorder}`}>EN</a>
        <button className={`${style.contactButton} ${style.blue}`}>
          {" "}
          <p>Contact us</p>
          <ContactIcon />
        </button>
      </div>
      {/* <Nav>
      <Nav.Item>Settings</Nav.Item>
    </Nav> */}
    </nav>
  );
}
export default NavigatonBar;
