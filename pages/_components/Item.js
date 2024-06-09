/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/DndList.module.css";
import Image from "next/image";

export function Page(
  {
    id,
    title,
    location,
    image,
    clone,
    insertPosition,
    style,
    active,
    ...props
  },
  ref
) {
  return (
    <li
      ref={ref}
      className={`${styles.Page} ${active ? styles.active : ""} ${
        clone ? styles.clone : ""
      }`}
      style={style}
      {...props}
    >
      <div className="listed-item flex items-center p-4 bg-white shadow rounded">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            width={96}
            height={96}
            className="rounded"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500">{location}</span>
        </div>
      </div>
    </li>
  );
}

export default React.forwardRef(Page);
