import React from "react";
import Skeleton from "react-loading-skeleton";

const LinkSkeleton: React.FC = () => {
    return <Skeleton width="calc(100vw - 40px)" height={69} style={{ borderRadius: "16px" }} className="link-component" />
}

export default LinkSkeleton;
