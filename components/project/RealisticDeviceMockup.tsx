"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface RealisticDeviceMockupProps {
  device: "iphone" | "tablet" | "macbook";
  children?: React.ReactNode;
  frameClassName?: string;
}

export function RealisticDeviceMockup({
  device,
  children,
  frameClassName = "",
}: RealisticDeviceMockupProps) {
  const frameImages = {
    iphone: "/mockups/iphone15.webp",
    tablet: "/mockups/ipadpro13.webp",
    macbook: "/mockups/macbookpro16.webp",
  };

  const screenPositions = {
    iphone: {
      top: "9%",
      left: "9.5%",
      width: "81%",
      height: "82%",
      borderRadius: "1.3rem",
      aspectRatio: 9 / 19.5,
      maxWidth: "240px",
      nativeWidth: 432,
      nativeHeight: 932,
    },
    tablet: {
      top: "3.5%",
      left: "23.8%",
      width: "52.5%",
      height: "93%",
      borderRadius: "0.3rem",
      aspectRatio: 4 / 3,
      maxWidth: "640px",
      nativeWidth: 753,
      nativeHeight: 982,
    },
    macbook: {
      top: "10.5%",
      left: "12%",
      width: "75.8%",
      height: "79%",
      borderRadius: "0.65rem 0.65rem 0.2rem 0.2rem",
      aspectRatio: 16 / 10,
      maxWidth: "800px",
      nativeWidth: 1200,
      nativeHeight: 774,
    },
  };

  const style = screenPositions[device];
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const { nativeWidth } = style;

  useEffect(() => {
    if (!screenRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!screenRef.current) return;
      const rect = screenRef.current.getBoundingClientRect();

      const newScale = rect.width / nativeWidth;
      setScale(newScale);
    });

    observer.observe(screenRef.current);
    return () => observer.disconnect();
  }, [device, nativeWidth]);


  return (
    <div
      className={`relative w-full ${frameClassName}`}
      style={{
        aspectRatio: style.aspectRatio.toString(),
        maxWidth: style.maxWidth,
      }}
    >
      {/* صورة الجهاز */}
      <Image
        src={frameImages[device]}
        alt={`${device} frame`}
        fill
        className="object-contain select-none pointer-events-none"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      {/* مكان الشاشة */}
      <div
        ref={screenRef}
        className="absolute overflow-hidden bg-white shadow-inner"
        style={{
          top: style.top,
          left: style.left,
          width: style.width,
          height: style.height,
          borderRadius: style.borderRadius,
        }}
      >
        <div
          style={{
            width: `${style.nativeWidth}px`,
            height: `${style.nativeHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
