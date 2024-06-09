"use client";

import React, { useId, useState } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  MeasuringStrategy,
  DropAnimation,
  defaultDropAnimationSideEffects,
  useDndContext,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS, isKeyboardEvent } from "@dnd-kit/utilities";
import classNames from "classnames";
import styles from "@/styles/DndList.module.css";
import pageStyles from "@/styles/Page.module.css";
import Page from "./Item";
import OverlayItem from "./OverlayItem";

const initialItems = [
  {
    id: "0",
    title: "Scotland Island",
    location: "Sydney, Australia",
    image: "/images/image1.png",
  },
  {
    id: "1",
    title: "The Charles Grand Brasserie & Bar",
    location: "Lorem ipsum, Dolor",
    image: "/images/image2.png",
  },
  {
    id: "2",
    title: "Bridge Climb",
    location: "Dolor, Sit amet",
    image: "/images/image3.png",
  },
  {
    id: "3",
    title: "Scotland Island",
    location: "Sydney, Australia",
    image: "/images/image4.png",
  },
  {
    id: "4",
    title: "Clam Bar",
    location: "Etcetera veni, Vidi vici",
    image: "/images/image5.png",
  },
  {
    id: "5",
    title: "Vivid Festival",
    location: "Sydney, Australia",
    image: "/images/image6.png",
  },
];

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const dropAnimation = {
  keyframes({ transform }) {
    return [
      { transform: CSS.Transform.toString(transform.initial) },
      {
        transform: CSS.Transform.toString({
          scaleX: 0.98,
          scaleY: 0.98,
          x: transform.final.x - 10,
          y: transform.final.y - 10,
        }),
      },
    ];
  },
  sideEffects: defaultDropAnimationSideEffects({
    className: {
      active: pageStyles.active,
    },
  }),
};

export default function DndList() {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(initialItems);
  const activeIndex = activeId
    ? items.findIndex((item) => item.id === activeId)
    : -1;
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );
  const id = useId();

  return (
    <DndContext
      id={id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
    >
      <SortableContext items={items}>
        <ul className={classNames(styles.Pages, styles.vertical)}>
          {items.map((item, index) => (
            <SortablePage
              key={item.id}
              id={item.id}
              index={index + 1}
              layout="vertical"
              activeIndex={activeIndex}
              title={item.title}
              location={item.location}
              image={item.image}
            />
          ))}
        </ul>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeId ? (
          <PageOverlay
            id={activeId}
            layout="vertical"
            items={items}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart({ active }) {
    setActiveId(active.id);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  function handleDragEnd({ over }) {
    if (over) {
      const overIndex = items.findIndex((item) => item.id === over.id);

      if (activeIndex !== overIndex) {
        const newIndex = overIndex;

        setItems((items) => arrayMove(items, activeIndex, newIndex));
      }
    }

    setActiveId(null);
  }
}

function PageOverlay({ id, items, ...props }) {
  const { activatorEvent, over } = useDndContext();
  const isKeyboardSorting = isKeyboardEvent(activatorEvent);
  const activeIndex = items.findIndex((item) => item.id === id);
  const overIndex = over?.id
    ? items.findIndex((item) => item.id === over?.id)
    : -1;

  const item = items.find((item) => item.id === id);

  return (
    <OverlayItem
      {...props}
      {...item}
      clone
      insertPosition={
        isKeyboardSorting && overIndex !== activeIndex
          ? overIndex > activeIndex
            ? "after"
            : "before"
          : undefined
      }
    />
  );
}

function SortablePage({ id, activeIndex, ...props }) {
  const {
    attributes,
    listeners,
    index,
    isDragging,
    isSorting,
    over,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges: always,
  });

  const item = initialItems.find((item) => item.id === id);

  return (
    <Page
      ref={setNodeRef}
      {...item}
      active={isDragging}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      insertPosition={
        over?.id === id ? (index > activeIndex ? "after" : "before") : undefined
      }
      className={`
        ${activeIndex == index && "opacity-50"}
        ${
          over?.id === id
            ? index > activeIndex
              ? "highlight-bottom"
              : "highlight-top"
            : undefined
        }
        `}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}

function always() {
  return true;
}
