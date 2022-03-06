import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import style from "./Card.module.scss";
import { Card, Avatar } from "antd";
import Button from "../Button/Button";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

const { Meta } = Card;
function IndustryCard({ title, description, img, itemId }) {
  const visibility = React.useContext(VisibilityContext);
  const visible = visibility.isItemVisible(itemId);
  // console.log(visible);
  return (
    <div className={style.card}>
      <div className={style.imgContainer}>
        <div className={style.image}>
          <img src={img} />
        </div>
        <div className={style.cardButtonContainer}>
          <Button
            label="Use cases"
            Icon={ArrowRightOutlined}
            className={`${style.industryCardBtn} ${style.blue}`}
          />
        </div>
      </div>

      <div className={style.textContainer}>
        <h1 className={style.cardTitle}>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
    // <Card
    //   style={{ width: "100%", minWidth: "100%" }}
    //   bodyStyle={{ paddingLeft: 0 }}
    //   bordered={false}
    //   cover={<img alt="example" src={img} style={{ maxHeight: "100%" }} />}
    //   //   actions={[
    //   //     <SettingOutlined key="setting" />,
    //   //     <EditOutlined key="edit" />,
    //   //     <EllipsisOutlined key="ellipsis" />,
    //   //   ]}
    // >
    //   <Meta
    //     // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
    //     title={<h1 className={style.cardTitle}>{title}</h1>}
    //     description={description}
    //     style={{ fontSize: "1.1rem", fontFamily: "MyraidProSemiBold" }}
    //   />
    // </Card>
  );
}

export default IndustryCard;
