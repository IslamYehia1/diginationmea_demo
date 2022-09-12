import { useEffect } from "react";

function WIP({ onLoad }) {
  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);
  return <div> Work in progress</div>;
}
export default WIP;
