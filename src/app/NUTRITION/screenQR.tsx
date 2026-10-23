import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarcodeFoodResult, lookupBarcode, proteinStarRating } from '../../lib/nutritionAPI';
import { colors, styles } from '../../styles';

const SCORE_STORAGE_KEY = 'nutrition_score';

export default function QRScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [product, setProduct] = useState<BarcodeFoodResult | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [savingScore, setSavingScore] = useState(false);
  const [scoreSaveError, setScoreSaveError] = useState('');
  const scanLocked = useRef(false);
  const acceptLocked = useRef(false);

  const handleScan = async (data: string) => {
    if (scanLocked.current) return;
    scanLocked.current = true;
    setScannedData(data);
    setProduct(null);
    setLookupError('');
    setScoreSaveError('');

    const trimmedData = data.trim();
    const barcode = /^\d{8,14}$/.test(trimmedData)
      ? trimmedData
      : trimmedData.match(/(?:^|\/)(\d{8,14})(?=\/|$|[?#])/)?.[1];

    if (!barcode) {
      setLookupError('This code does not contain a supported food barcode or Open Food Facts product link.');
      return;
    }

    setLookupLoading(true);
    try {
      const result = await lookupBarcode(barcode);
      if (result) {
        setProduct(result);
      } else {
        setLookupError('No nutrition information was found for this barcode.');
      }
    } catch (error) {
      setLookupError(error instanceof Error ? error.message : 'Could not look up this barcode.');
    } finally {
      setLookupLoading(false);
    }
  };

  const resetScan = () => {
    scanLocked.current = false;
    setScannedData(null);
    setProduct(null);
    setLookupError('');
    setScoreSaveError('');
  };

  const acceptProduct = async () => {
    if (!product || acceptLocked.current) return;
    acceptLocked.current = true;
    setSavingScore(true);

    try {
      const storedScore = await AsyncStorage.getItem(SCORE_STORAGE_KEY);
      const currentScore = storedScore === null ? 0 : Number(storedScore);
      if (!Number.isSafeInteger(currentScore) || currentScore < 0) {
        throw new Error('Saved score is invalid.');
      }

      const nextScore = currentScore + proteinStarRating(product.protein) * 3;
      if (!Number.isSafeInteger(nextScore)) {
        throw new Error('Updated score is outside the supported range.');
      }
      await AsyncStorage.setItem(SCORE_STORAGE_KEY, String(nextScore));
      goBack();
    } catch (error) {
      setScoreSaveError(
        error instanceof Error ? `Could not save score: ${error.message}` : 'Could not save score.',
      );
      acceptLocked.current = false;
    } finally {
      setSavingScore(false);
    }
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/NUTRITION/nutrition');
    }
  };

  return (
    <SafeAreaView style={styles.nutritionQrScreen} edges={['top', 'right', 'bottom', 'left']}>
      <View style={styles.nutritionQrHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={goBack}
          style={styles.nutritionQrBackButton}
        >
          <Text style={styles.nutritionQrBackButtonText}>‹</Text>
        </Pressable>
        <Text style={styles.nutritionQrTitle}>Scan a QR code</Text>
      </View>

      <Text style={styles.nutritionQrSubtitle}>
        Scan a product barcode or a QR code containing an Open Food Facts product link.
      </Text>

      {!permission ? (
        <Text style={styles.nutritionQrPermissionMessage}>Checking camera permission…</Text>
      ) : !permission.granted ? (
        <View style={styles.nutritionQrPermissionPanel}>
          <Text style={styles.nutritionQrPermissionMessage}>
            {permission.canAskAgain
              ? 'Camera access is needed to scan a QR code.'
              : 'Enable camera access in your device settings to scan QR codes.'}
          </Text>
          {permission.canAskAgain && (
            <Pressable
              accessibilityRole="button"
              onPress={requestPermission}
              style={styles.nutritionQrPrimaryButton}
            >
              <Text style={styles.nutritionQrPrimaryButtonText}>Allow camera access</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View style={styles.nutritionQrCameraFrame}>
          <CameraView
            style={styles.nutritionQrCamera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e'],
            }}
            onBarcodeScanned={scannedData ? undefined : result => handleScan(result.data)}
          />
          {!scannedData && <View pointerEvents="none" style={styles.nutritionQrScanReticle} />}
        </View>
      )}

      {scannedData ? (
        <View style={styles.nutritionQrResultPanel}>
          {lookupLoading ? (
            <View style={styles.nutritionQrLoadingRow}>
              <ActivityIndicator color={colors.accent} />
              <Text style={styles.nutritionQrResultTitle}>Looking up product…</Text>
            </View>
          ) : product ? (
            <>
              <Text style={styles.nutritionQrResultTitle}>{product.name || 'Food product'}</Text>
              <Text style={styles.nutritionQrResultData}>Serving: {product.serving}</Text>
              <View
                accessible
                accessibilityLabel={`${proteinStarRating(product.protein)} out of 5 stars`}
                style={styles.nutritionRatingStars}
              >
                {[1, 2, 3, 4, 5].map(rating => (
                  <Text key={rating} style={styles.nutritionStar}>
                    {rating <= proteinStarRating(product.protein) ? '★' : '☆'}
                  </Text>
                ))}
              </View>
              {scoreSaveError ? (
                <Text style={styles.nutritionErrorText}>{scoreSaveError}</Text>
              ) : null}
              <Pressable
                accessibilityRole="button"
                disabled={savingScore}
                onPress={acceptProduct}
                style={({ pressed }) => [
                  styles.nutritionQrPrimaryButton,
                  pressed && styles.nutritionPressed,
                ]}
              >
                <Text style={styles.nutritionQrPrimaryButtonText}>
                  {savingScore ? 'Saving…' : 'OK'}
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.nutritionQrResultTitle}>Scanned code</Text>
              <Text selectable style={styles.nutritionQrResultData}>{scannedData}</Text>
              <Text style={styles.nutritionQrResultData}>
                {lookupError || 'This code is not a supported product barcode or product link.'}
              </Text>
            </>
          )}
          {!product && (
            <Pressable
              accessibilityRole="button"
              onPress={resetScan}
              style={styles.nutritionQrPrimaryButton}
            >
              <Text style={styles.nutritionQrPrimaryButtonText}>Scan another</Text>
            </Pressable>
          )}
        </View>
      ) : permission?.granted ? (
        <Text style={styles.nutritionQrHint}>The scanned content will appear here.</Text>
      ) : null}
    </SafeAreaView>
  );
}
