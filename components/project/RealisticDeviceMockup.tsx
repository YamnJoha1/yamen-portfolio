import Image from "next/image";

interface RealisticDeviceMockupProps {
  image: string;
  device: 'iphone' | 'tablet' | 'macbook';
  alt?: string;
  className?: string;
  onLoad?: () => void;
}

export function RealisticDeviceMockup({
  image,
  device,
  alt = 'Device preview',
  className = '',
  onLoad,
}: RealisticDeviceMockupProps) {
  const frameImages = {
    iphone: '/mockups/iphone15.webp',
    tablet: '/mockups/ipadpro13.webp',
    macbook: '/mockups/macbookpro16.webp',
  };

  const screenPositions = {
    iphone: {
      top: '8%',
      left: '8.5%',
      width: '83.5%',
      height: '83.8%',
      borderRadius: '1.5rem',
      aspectRatio: 9 / 19.5,
    },
    tablet: {
      top: '3.5%',
      left: '23.8%',
      width: '52.5%',
      height: '93%',
      borderRadius: '0.2rem',
      aspectRatio: 4 / 3,
    },
    macbook: {
      top: '10.4%',
      left: '12%',
      width: '75.8%',
      height: '79%',
      borderRadius: '0.65rem 0.65rem 0.2rem 0.2rem',
      aspectRatio: 16 / 10,
    },
  };

  const frameSrc = frameImages[device];
  const style = screenPositions[device];

  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        aspectRatio: style.aspectRatio.toString(),
        maxWidth: device === 'macbook' ? '750px' : device === 'tablet' ? '600px' : '220px',
      }}
    >
      <Image
        src={frameSrc}
        alt={`${device} frame`}
        fill
        className="object-contain select-none pointer-events-none"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority 
      />

      <div
        className="absolute overflow-hidden"
        style={{
          top: style.top,
          left: style.left,
          width: style.width,
          height: style.height,
          borderRadius: style.borderRadius,
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          quality={100}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onLoadingComplete={onLoad}
        />
      </div>
    </div>
  );
}
