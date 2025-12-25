"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RealisticDeviceMockup } from "@/components/project/RealisticDeviceMockup";
import Spinner from "@/components/ui/Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

interface DevicePreviewProps {
  project: {
    desktopImage?: string;
    tabletImage?: string;
    mobileImage?: string;
    link?: string;
  };
  locale: string;
}

export function DevicePreview({ project, locale }: DevicePreviewProps) {
  const t = useTranslations("projects");
  const [activeDevice, setActiveDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [loadingStates, setLoadingStates] = useState({
    desktop: true,
    tablet: true,
    mobile: true,
  });
  const [errorStates, setErrorStates] = useState({
    desktop: false,
    tablet: false,
    mobile: false,
  });
  const [previewMode, setPreviewMode] = useState<"image" | "live">("live");
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});
  const isRTL = locale === "ar";

  const handleImageLoad = (device: "desktop" | "tablet" | "mobile") => {
    setLoadingStates((prev) => ({ ...prev, [device]: false }));
  };

  const handleImageError = (device: "desktop" | "tablet" | "mobile") => {
    setLoadingStates((prev) => ({ ...prev, [device]: false }));
    setErrorStates((prev) => ({ ...prev, [device]: true }));
  };

  const handleDeviceChange = (device: "desktop" | "tablet" | "mobile") => {
    setActiveDevice(device);
    setLoadingStates((prev) => ({ ...prev, [device]: true }));
    setErrorStates((prev) => ({ ...prev, [device]: false }));
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setLoadingStates({ desktop: true, tablet: true, mobile: true });
    setErrorStates({ desktop: false, tablet: false, mobile: false });
  };

  const devices = [
    {
      key: "desktop",
      label: "Desktop",
      image: project.desktopImage,
      device: "macbook" as const,
      icon: Monitor,
    },
    {
      key: "tablet",
      label: "Tablet",
      image: project.tabletImage,
      device: "tablet" as const,
      icon: Tablet,
    },
    {
      key: "mobile",
      label: "Mobile",
      image: project.mobileImage,
      device: "iphone" as const,
      icon: Smartphone,
    },
  ] as const;

  const canShowLivePreview = project.link && previewMode === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-20"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center gap-5 justify-between mb-6">
        <h2
          className={`text-2xl font-semibold ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("devicePreviews")}
        </h2>

        <div className="flex items-center gap-2 flex-wrap max-w-full">
          {project.link && (
            <>
              <Button
                variant={previewMode === "live" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("live")}
              >
                <ExternalLink className="w-4 h-4" />
                {locale === "ar" ? "معاينة حية" : "Live Preview"}
              </Button>
              <Button
                variant={previewMode === "image" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("image")}
              >
                {locale === "ar" ? "صورة ثابتة" : "Static Image"}
              </Button>
            </>
          )}

          {canShowLivePreview && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loadingStates[activeDevice]}
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  loadingStates[activeDevice] ? "animate-spin" : ""
                }`}
              />
              {locale === "ar" ? "تحديث" : "Refresh"}
            </Button>
          )}
        </div>
      </div>

      {/* Device Switcher */}
      <div className="flex justify-center gap-4 mb-12">
        {devices.map((device) => {
          const IconComponent = device.icon;
          return (
            <Button
              key={device.key}
              variant={activeDevice === device.key ? "default" : "outline"}
              onClick={() => handleDeviceChange(device.key)}
              aria-label={`Switch to ${device.label} view`}
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {device.label}
            </Button>
          );
        })}
      </div>

      {/* Preview */}
      <div className="flex justify-center items-center relative min-h-[420px]">
        <AnimatePresence mode="wait">
          {devices.map(
            (device) =>
              activeDevice === device.key && (
                <motion.div
                  key={`${device.key}-${refreshKey}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full flex justify-center"
                >
                  {canShowLivePreview ? (
                    <RealisticDeviceMockup device={device.device}>
                      <iframe
                        ref={(el) => {
                          iframeRefs.current[device.key] = el;
                        }}
                        src={`${project.link}?preview=true&device=${device.key}`}
                        title={`${device.label} preview`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        onLoad={() => handleImageLoad(device.key)}
                        onError={() => handleImageError(device.key)}
                        style={{
                          width: "102%",
                          height: "102%",
                          marginBottom: "-1%",
                          border: 0,
                        }}
                      />
                    </RealisticDeviceMockup>
                  ) : device.image && !errorStates[device.key] ? (
                    <RealisticDeviceMockup
                      device={device.device}
                      frameClassName={`${
                        loadingStates[device.key] ? "opacity-0" : "opacity-100"
                      } transition-opacity duration-300`}
                    >
                      <Image
                        src={device.image}
                        alt={`${device.label} screenshot`}
                        fill
                        className="object-cover"
                        onLoadingComplete={() => handleImageLoad(device.key)}
                      />
                    </RealisticDeviceMockup>
                  ) : (
                    <div className="flex items-center justify-center min-h-[300px]">
                      <p className="text-muted-foreground text-center">
                        {errorStates[device.key]
                          ? t("imageLoadError", { device: device.label })
                          : t("noPreviewAvailable", { device: device.label })}
                      </p>
                    </div>
                  )}

                  {loadingStates[device.key] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                      <div className="text-center">
                        <Spinner />
                        <p className="mt-2 text-sm text-muted-foreground">
                          {locale === "ar"
                            ? "جاري تحميل المعاينة..."
                            : "Loading preview..."}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
