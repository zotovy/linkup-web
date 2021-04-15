import React from "react";
import Skeleton from "react-loading-skeleton";

const LinkSkeleton: React.FC = () => {
    return <Skeleton width={400} height={69} style={{ borderRadius: "16px" }} className="link-component" />
}

export default LinkSkeleton;
