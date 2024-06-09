/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from "react";
import styles from "@/styles/DndList.module.css";

export function OverlayItem(
  {
    id,
    title,
    location,
    image,
    clone,
    insertPosition,
    style,
    active,
    position,
    ...props
  },
  ref,
) {
  return (
    <li
      ref={ref}
      className={`${styles.Page} ${active ? styles.active : ""} ${
        clone ? styles.clone : ""
      }`}
      style={{...style,
        position:'fixed',
      }}
      onClick={(e) => onClick(e)}
      {...props}
    >
      <div className="drag-overlay-item flex items-center p-4 bg-white shadow rounded">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            width={32}
            height={32}
            className="rounded"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
    </li>
  );
}

export default React.forwardRef(OverlayItem);