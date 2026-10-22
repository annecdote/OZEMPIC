import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarcodeFoodResult, lookupBarcode } from '../../lib/nutritionAPI';
import styles from '../../constants/nutritionStyling';

export default function QRScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [product, setProduct] = useState<BarcodeFoodResult | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const scanLocked = useRef(false);

  const handleScan = async (data: string) => {
    if (scanLocked.current) return;
    scanLocked.current = true;
    setScannedData(data);
    setProduct(null);
    setLookupError('');

    const trimmedData = data.trim();
    const barcode = /^\d{8,14}$/.test(trimmedData)
      ? trimmedData
      : trimmedData.match(/(?:^|\/)(\d{8,14})(?=\/|$|[?#])/)?.[1];

    if (!barcode) return;

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
  };

  const formatNutrient = (value: number | null, unit: string) =>
    value === null ? '—' : `${value} ${unit}`;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/NUTRITION/nutrition');
    }
  };

  return (
    <SafeAreaView style={styles.qrScreen} edges={['top', 'right', 'bottom', 'left']}>
      <View style={styles.qrHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={goBack}
          style={styles.qrBackButton}
        >
          <Text style={styles.qrBackButtonText}>‹</Text>
        </Pressable>
        <Text style={styles.qrTitle}>Scan a QR code</Text>
      </View>

      <Text style={styles.qrSubtitle}>
        Scan a product barcode or a QR code containing an Open Food Facts product link.
      </Text>

      {!permission ? (
        <Text style={styles.qrPermissionMessage}>Checking camera permission…</Text>
      ) : !permission.granted ? (
        <View style={styles.qrPermissionPanel}>
          <Text style={styles.qrPermissionMessage}>
            {permission.canAskAgain
              ? 'Camera access is needed to scan a QR code.'
              : 'Enable camera access in your device settings to scan QR codes.'}
          </Text>
          {permission.canAskAgain && (
            <Pressable
              accessibilityRole="button"
              onPress={requestPermission}
              style={styles.qrPrimaryButton}
            >
              <Text style={styles.qrPrimaryButtonText}>Allow camera access</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View style={styles.qrCameraFrame}>
          <CameraView
            style={styles.qrCamera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e'],
            }}
            onBarcodeScanned={scannedData ? undefined : result => handleScan(result.data)}
          />
          {!scannedData && <View pointerEvents="none" style={styles.qrScanReticle} />}
        </View>
      )}

      {scannedData ? (
        <View style={styles.qrResultPanel}>
          {lookupLoading ? (
            <View style={styles.qrLoadingRow}>
              <ActivityIndicator color="#9C5140" />
              <Text style={styles.qrResultTitle}>Looking up product…</Text>
            </View>
          ) : product ? (
            <>
              <Text style={styles.qrResultTitle}>{product.name || 'Food product'}</Text>
              <Text style={styles.qrResultData}>Serving: {product.serving}</Text>
              <Text style={styles.qrNutritionTitle}>Nutrition per 100 g</Text>
              <Text style={styles.qrResultData}>
                Calories: {formatNutrient(product.per100g.calories, 'kcal')}
              </Text>
              <Text style={styles.qrResultData}>
                Protein: {formatNutrient(product.per100g.protein, 'g')}
              </Text>
              <Text style={styles.qrResultData}>
                Carbohydrates: {formatNutrient(product.per100g.carbs, 'g')}
              </Text>
              <Text style={styles.qrResultData}>
                Fat: {formatNutrient(product.per100g.fat, 'g')}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.qrResultTitle}>Scanned code</Text>
              <Text selectable style={styles.qrResultData}>{scannedData}</Text>
              <Text style={styles.qrResultData}>
                {lookupError || 'This code is not a supported product barcode or product link.'}
              </Text>
            </>
          )}
          <Pressable
            accessibilityRole="button"
            onPress={resetScan}
            style={styles.qrPrimaryButton}
          >
            <Text style={styles.qrPrimaryButtonText}>Scan another</Text>
          </Pressable>
        </View>
      ) : permission?.granted ? (
        <Text style={styles.qrHint}>The scanned content will appear here.</Text>
      ) : null}
    </SafeAreaView>
  );
}
