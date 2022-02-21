// `import { Navbar, Nav, Dropdown } from "rsuite";
import { useState } from "react";
import Logo from "./LogoDigination.png";
import style from "./Navbar.module.scss";
import { ReactComponent as ContactIcon } from "../talkIcon.svg";
import { Menu, Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Button from "../Button/Button";
import DropdownMenu from "../Dropdown/Dropdown";
import "./customizations.scss";

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
            Solutions <CaretDownOutlined />
          </a>
        </Dropdown>
        <Dropdown overlayStyle={overlayStyle} overlay={MenuOverlay}>
          <a
            className={`${style.navItem} ${style.industry}`}
            onClick={(e) => e.preventDefault()}
          >
            Industries <CaretDownOutlined />
          </a>
        </Dropdown>
        <Dropdown overlayStyle={overlayStyle} overlay={MenuOverlay}>
          <a
            className={`${style.navItem} ${style.industry}`}
            onClick={(e) => e.preventDefault()}
          >
            Partners <CaretDownOutlined />
          </a>
        </Dropdown>
        <Dropdown overlayStyle={overlayStyle} overlay={MenuOverlay}>
          <a
            className={`${style.navItem} ${style.industry}`}
            onClick={(e) => e.preventDefault()}
          >
            Clients <CaretDownOutlined />
          </a>
        </Dropdown>

        <a
          className={`${style.navItem} ${style.rightBorder} ${style.langButton}`}
        >
          EN
        </a>
        <Button
          Icon={ContactIcon}
          label="Contact Us "
          className={`${style.contactButton} ${style.blue}`}
        />
      </div>
      {/* <Nav>
      <Nav.Item>Settings</Nav.Item>
    </Nav> */}
    </nav>
  );
}
export default NavigatonBar;
