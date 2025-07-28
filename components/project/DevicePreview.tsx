"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RealisticDeviceMockup } from '@/components/project/RealisticDeviceMockup';
import Spinner from "@/components/ui/Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { ExternalLink, Monitor, Tablet, Smartphone, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import Image from 'next/image';

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
  const t = useTranslations('projects');
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [loadingStates, setLoadingStates] = useState({
    desktop: true,
    tablet: true,
    mobile: true
  });
  const [errorStates, setErrorStates] = useState({
    desktop: false,
    tablet: false,
    mobile: false
  });
  const [previewMode, setPreviewMode] = useState<'image' | 'live'>('live');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});
  const isRTL = locale === 'ar';

  const handleImageLoad = (device: 'desktop' | 'tablet' | 'mobile') => {
    setLoadingStates(prev => ({ ...prev, [device]: false }));
  };

  const handleImageError = (device: 'desktop' | 'tablet' | 'mobile') => {
    setLoadingStates(prev => ({ ...prev, [device]: false }));
    setErrorStates(prev => ({ ...prev, [device]: true }));
  };

  const handleDeviceChange = (device: 'desktop' | 'tablet' | 'mobile') => {
    setActiveDevice(device);
    // Reset loading state for new device
    setLoadingStates(prev => ({ ...prev, [device]: true }));
    setErrorStates(prev => ({ ...prev, [device]: false }));
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setLoadingStates({ desktop: true, tablet: true, mobile: true });
    setErrorStates({ desktop: false, tablet: false, mobile: false });
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

    const devices = [
      { 
        key: 'desktop', 
        label: 'Desktop', 
        image: project.desktopImage, 
        device: 'macbook', 
        className: 'max-w-4xl w-full',
        icon: Monitor,
        width: 1200
      },
      { 
        key: 'tablet', 
        label: 'Tablet', 
        image: project.tabletImage, 
        device: 'tablet', 
        className: 'max-w-sm mx-auto',
        icon: Tablet,
        width: 768
      },
      { 
        key: 'mobile', 
        label: 'Mobile', 
        image: project.mobileImage, 
        device: 'iphone', 
        className: 'max-w-[275px] mx-auto',
        icon: Smartphone,
        width: 375
      }
  ] as const;

  const canShowLivePreview = project.link && previewMode === 'live';


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4 min-h-[100vh]' : 'mb-20'}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("devicePreviews")}
        </h2>
        
        {/* Preview Controls */}
        <div className="flex items-center gap-2">
          {project.link && (
            <>
              <Button
                variant={previewMode === 'live' ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode('live')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                {locale === 'ar' ? 'معاينة حية' : 'Live Preview'}
              </Button>
              <Button
                variant={previewMode === 'image' ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode('image')}
                className="flex items-center gap-2"
              >
                {locale === 'ar' ? 'صورة ثابتة' : 'Static Image'}
              </Button>
            </>
          )}
          
          {canShowLivePreview && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="flex items-center gap-2"
                disabled={loadingStates[activeDevice]}
              >
                <RefreshCw className={`w-4 h-4 ${loadingStates[activeDevice] ? 'animate-spin' : ''}`} />
                {locale === 'ar' ? 'تحديث' : 'Refresh'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFullscreen}
                className="flex items-center gap-2"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                {isFullscreen ? (locale === 'ar' ? 'تصغير' : 'Minimize') : (locale === 'ar' ? 'تكبير' : 'Fullscreen')}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-10 md:mb-14">
        {devices.map((device) => {
          const IconComponent = device.icon;
          return (
            <Button
              key={device.key}
              variant={activeDevice === device.key ? "default" : "outline"}
              onClick={() => handleDeviceChange(device.key)}
              aria-label={`Switch to ${device.label} view`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IconComponent className="w-4 h-4" />
              {device.label}
            </Button>
          );
        })}
      </div>

      <div className={`flex justify-center items-center relative ${isFullscreen ? 'h-full' : 'min-h-[420px]'}`}>
        <AnimatePresence mode="wait">
          {devices.map((device) => (
            activeDevice === device.key && (
              <motion.div
                key={`${device.key}-${refreshKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`absolute w-full flex justify-center ${isFullscreen ? 'h-full' : ''}`}
              >
                {canShowLivePreview ? (
                  <div className={`relative ${isFullscreen ? 'h-full' : ''}`}>
                    {/* Live Preview with Real Device Mockups */}
                    <div className="relative flex justify-center">
                      {device.key === 'desktop' && (
                        <div className="relative w-[800px]">
                          <Image
                            src="/mockups/macbookpro16.webp"
                            alt="MacBook Pro 16"
                            width={800}
                            height={500}
                            style={{ width: '100%', height: 'auto' }}
                          />
                          <div className="absolute inset-0">
                            <div className="relative w-full h-full">
                              <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] overflow-hidden rounded-[0.65rem_0.65rem_0.2rem_0.2rem]">
                                <div className="w-full h-full flex items-center justify-center">
                                  <div 
                                    className="bg-white rounded-sm overflow-hidden shadow-lg w-full h-full"
                                    style={{
                                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }}
                                  >
                                    <iframe
                                      ref={(el) => { iframeRefs.current[device.key] = el; }}
                                      src={`${project.link}?preview=true&device=desktop&width=1200`}
                                      className="border-0 w-full h-full"
                                      title={`${device.label} preview of ${project.link}`}
                                      loading="lazy"
                                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                                      onLoad={() => handleImageLoad(device.key)}
                                      onError={() => handleImageError(device.key)}
                                      style={{
                                        width: '1200px',
                                        height: '800px',
                                        transform: 'scale(0.534)', // 800 / 1200 = 0.6666
                                        transformOrigin: 'top left'
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {device.key === 'tablet' && (
                        <div className="relative w-[380px]">
                          <Image
                            src="/mockups/ipadpro13.webp"
                            alt="iPad Pro 13"
                            width={380}
                            height={470}
                            style={{ width: '100%', height: 'auto' }}
                          />

                          <div className="absolute inset-0">
                            <div className="relative w-full h-full">
                              <div className="absolute top-[3.5%] left-[5%] w-[90%] h-[93%] overflow-hidden rounded-[0.2rem]">
                                <div className="w-full h-full flex items-center justify-center">
                                  <div 
                                    className="bg-white rounded-sm overflow-hidden shadow-lg w-full h-full"
                                    style={{
                                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }}
                                  >
                                    <iframe
                                      ref={(el) => { iframeRefs.current[device.key] = el; }}
                                      src={`${project.link}?preview=true&device=tablet&width=800`}
                                      className="border-0 w-full h-full"
                                      title={`${device.label} preview of ${project.link}`}
                                      loading="lazy"
                                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                                      onLoad={() => handleImageLoad(device.key)}
                                      onError={() => handleImageError(device.key)}
                                      style={{
                                        width: '581px',
                                        height: '780px',
                                        transform: 'scale(0.59)', // 800 / 1200 = 0.6666
                                        transformOrigin: 'top left'
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {device.key === 'mobile' && (
                        <div className="relative w-[265px]">
                          <Image
                            src="/mockups/iphone15.webp"
                            alt="iPhone 15" 
                            width={265}
                            height={530}
                            style={{ width: '100%', height: 'auto' }}
                          />

                          <div className="absolute inset-0">
                            <div className="relative w-full h-full">
                              <div className="absolute top-[5%] left-[8.5%] w-[83.5%] h-[90%] overflow-hidden rounded-[1.5rem]">
                                <div className="w-full h-full flex items-center justify-center">
                                  <div 
                                    className="bg-white rounded-sm overflow-hidden shadow-lg w-full h-full"
                                    style={{
                                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }}
                                  >
                                    <iframe
                                      ref={(el) => { iframeRefs.current[device.key] = el; }}
                                      src={`${project.link}?preview=true&device=mobile&width=375`}
                                      className="border-0 w-full h-full"
                                      title={`${device.label} preview of ${project.link}`}
                                      loading="lazy"
                                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                                      onLoad={() => handleImageLoad(device.key)}
                                      onError={() => handleImageError(device.key)}
                                      style={{
                                        transform: 'scale(0.6)',
                                        transformOrigin: 'top left',
                                        width: '167%',
                                        height: '167%'
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {loadingStates[device.key] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                        <div className="text-center">
                          <Spinner />
                          <p className="mt-2 text-sm text-muted-foreground">
                            {locale === 'ar' ? 'جاري تحميل المعاينة...' : 'Loading preview...'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : device.image && !errorStates[device.key] ? (
                  <>
                    {loadingStates[device.key] && (
                      <div className="flex items-center justify-center min-h-[300px]">
                        <Spinner />
                      </div>
                    )}
                    <RealisticDeviceMockup
                      device={device.device}
                      image={device.image}
                      className={`${device.className} ${loadingStates[device.key] ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                      onLoad={() => handleImageLoad(device.key)}
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center min-h-[300px]">
                    <p className="text-muted-foreground text-center">
                      {errorStates[device.key] 
                        ? t("imageLoadError", { device: device.label })
                        : t("noPreviewAvailable", { device: device.label })
                      }
                    </p>
                  </div>
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 