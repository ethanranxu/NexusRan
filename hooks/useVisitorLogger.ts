import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../services/analytics';
import { parseUserAgent } from '../utils/uaParser';

const generateSessionId = () => {
    let sessionId = sessionStorage.getItem('visitor_session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('visitor_session_id', sessionId);
    }
    return sessionId;
};

export const useVisitorLogger = () => {
    const location = useLocation();
    const logIdRef = useRef<string | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const hasLoggedRef = useRef<boolean>(false);
    const maxScrollRef = useRef<number>(0);

    useEffect(() => {
        // Reset state on route change
        hasLoggedRef.current = false;
        startTimeRef.current = Date.now();
        logIdRef.current = null;
        maxScrollRef.current = 0;

        const logVisit = async () => {
            if (hasLoggedRef.current) return;
            hasLoggedRef.current = true;

            try {
                // Fetch IP and Location data
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                // Parse User Agent
                const uaResult = parseUserAgent(navigator.userAgent);

                const logData = {
                    ip: data.ip || 'unknown',
                    city: data.city || 'unknown',
                    country: data.country_name || 'unknown',
                    latitude: data.latitude || 0,
                    longitude: data.longitude || 0,
                    path: location.pathname + location.search,
                    userAgent: navigator.userAgent,
                    // New fields
                    deviceType: uaResult.deviceType,
                    browser: uaResult.browser,
                    browserVersion: uaResult.browserVersion,
                    os: uaResult.os,
                    osVersion: uaResult.osVersion,
                    referrer: document.referrer || 'direct',
                    sessionId: generateSessionId(),
                };

                const id = await analyticsService.logVisitor(logData);
                if (id) {
                    logIdRef.current = id;
                    // Cache data for click tracking
                    sessionStorage.setItem('visitor_data', JSON.stringify(logData));
                }
            } catch (error) {
                console.error('Failed to log visitor:', error);
            }
        };

        // Delay logging slightly to avoid double-logging in React Strict Mode dev
        const timeoutId = setTimeout(logVisit, 1000);

        // Scroll listener
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            if (scrollPercent > maxScrollRef.current) {
                maxScrollRef.current = scrollPercent;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleScroll);

            // Update duration and scroll stats on unmount/route change
            if (logIdRef.current) {
                const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
                analyticsService.updateVisitStats(logIdRef.current, duration, maxScrollRef.current);
            }
        };
    }, [location.pathname, location.search]);

    // Optional: Heartbeat to update stats periodically (e.g. every 30s)
    useEffect(() => {
        const interval = setInterval(() => {
            if (logIdRef.current) {
                const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
                analyticsService.updateVisitStats(logIdRef.current, duration, maxScrollRef.current);
            }
        }, 30000);

        return () => clearInterval(interval);
    }, []);
};
