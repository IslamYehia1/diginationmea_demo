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

  <a className={`${style.navItem} ${style.rightBorder} ${style.langButton}`}>
    EN
  </a>
  <Button
    Icon={ContactIcon}
    label="Contact Us "
    className={`${style.contactButton} ${style.blue}`}
  />
</div>;
