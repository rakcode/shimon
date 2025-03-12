export const takeImpression = async (): Promise<Record<string, string>> => {
    if (typeof window === "undefined") return { error: "Server-side rendering" };
  
    const fingerprintData: Record<string, string> = {
      userAgent: navigator.userAgent,
      platform: (navigator as any).userAgentData?.platform || navigator.platform || "unknown",
      cpuCores: navigator.hardwareConcurrency.toString(),
      touchSupport: navigator.maxTouchPoints.toString(),
      language: navigator.language,
      preferredLanguages: navigator.languages.join("+"),
      cookiesEnabled: navigator.cookieEnabled.toString(),
      doNotTrack: navigator.doNotTrack || "unknown",
      networkType: (navigator as any).connection?.effectiveType || "unknown",
      networkSpeed: (navigator as any).connection?.downlink?.toString() || "unknown",
      deviceMemory: (navigator as any).deviceMemory ? String((navigator as any).deviceMemory) : "unknown",
      colorDepth: screen.colorDepth.toString(),
      pixelDepth: screen.pixelDepth.toString(),
      screenResolution: `${screen.width}x${screen.height}`,
      screenOrientation: screen.orientation.type,
      indexedDB: checkIndexedDBAvailability(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      webGL: getWebGLInfo(),
      canvas: getCanvasFingerprint(),
      audio: getAudioFingerprint(),
    };
  
    fingerprintData.fingerprint = await sha256(Object.values(fingerprintData).join("||"));
  
    return fingerprintData;
  };
  
  const sha256 = async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };
  
  const checkIndexedDBAvailability = (): string =>
    !!window.indexedDB ? "Supported" : "Not Supported";
  
  const getWebGLInfo = (): string => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return "Not supported";
  
      const debugInfo = (gl as any).getExtension("WEBGL_debug_renderer_info");
      return debugInfo
        ? (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : "Supported";
    } catch {
      return "Error";
    }
  };
  
  const getCanvasFingerprint = (): string => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return "Not supported";
  
      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillText("Fingerprint", 2, 2);
      return canvas.toDataURL();
    } catch {
      return "Error";
    }
  };
  
  const getAudioFingerprint = (): string => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      return analyser.frequencyBinCount.toString();
    } catch {
      return "Error";
    }
  };
  