
import React, { useState, useEffect, useRef } from 'react';

interface ImageGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    initialIndex?: number;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
    isOpen,
    onClose,
    images,
    initialIndex = 0
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, initialIndex]);

    useEffect(() => {
        // Reset loading state when index changes or image source changes
        setIsLoaded(false);

        // Check if image is already loaded (e.g. from cache)
        if (imgRef.current?.complete) {
            setIsLoaded(true);
        }
    }, [currentIndex, images]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]);

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            {/* Main Image Container */}
            <div
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-4 outline-none"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header controls relative to image container */}
                <div className="flex justify-between items-center w-full max-w-full px-4 mb-2 z-50 text-white">
                    {/* Image Counter */}
                    <div className="px-3 py-1 bg-black/50 rounded-full text-sm font-medium backdrop-blur-sm">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                        aria-label="Close gallery"
                    >
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>

                <div className="relative flex-1 flex items-center justify-center w-full h-full min-h-0">
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <img
                        key={images[currentIndex]}
                        ref={imgRef}
                        src={images[currentIndex]}
                        alt={`Gallery image ${currentIndex + 1}`}
                        className={`max-w-full max-h-full object-contain shadow-2xl rounded-lg transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => {
                            // console.log('Image loaded:', images[currentIndex]);
                            setIsLoaded(true);
                        }}
                        onError={() => {
                            console.error('Image failed to load:', images[currentIndex]);
                            setIsLoaded(true); // Stop spinner even on error
                        }}
                        loading="eager"
                        // @ts-ignore
                        fetchPriority="high"
                    />

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 z-50 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors hidden md:flex items-center justify-center transform hover:scale-105 active:scale-95 backdrop-blur-sm"
                                aria-label="Previous image"
                            >
                                <span className="material-symbols-outlined text-3xl">chevron_left</span>
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-4 z-50 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors hidden md:flex items-center justify-center transform hover:scale-105 active:scale-95 backdrop-blur-sm"
                                aria-label="Next image"
                            >
                                <span className="material-symbols-outlined text-3xl">chevron_right</span>
                            </button>
                        </>
                    )}

                    {/* Mobile Tap Navigation Zones */}
                    <div className="absolute inset-y-0 left-0 w-1/4 h-full md:hidden z-10" onClick={handlePrev}></div>
                    <div className="absolute inset-y-0 right-0 w-1/4 h-full md:hidden z-10" onClick={handleNext}></div>
                </div>
            </div>

            {/* Thumbnails (Optional, could be added later) */}
        </div>
    );
};

export default ImageGalleryModal;
