import { useEffect } from "react";

// Intenta cargar el módulo nativo. En Expo Go no está disponible, entonces retorna null.
const GoogleMobileAds = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('react-native-google-mobile-ads');
  } catch {
    return null;
  }
})();

const AD_UNIT_ID = __DEV__
  ? GoogleMobileAds?.TestIds?.INTERSTITIAL ?? 'test'
  : "ca-app-pub-6066045623349693/9373139359";

function useRealAd() {
  const { isLoaded, isClosed, load, show } = GoogleMobileAds.useInterstitialAd(AD_UNIT_ID, {
    requestNonPersonalizedAdsOnly: false,
  });

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (isClosed) load();
  }, [isClosed, load]);

  return {
    showAd: () => { if (isLoaded) show(); },
  };
}

function useMockAd() {
  return { showAd: () => {} };
}

// En Expo Go usa el mock. En builds reales usa el módulo de AdMob.
export const useGameEndAd = GoogleMobileAds ? useRealAd : useMockAd;
