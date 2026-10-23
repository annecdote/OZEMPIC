import { Platform, StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

export const colors = {
  background: '#F3E9D8',
  primary: '#E7836D',
  secondary: '#F7D8C8',
  accent: '#B95743',
  text: '#49352D',
  textSecondary: '#88766B',
  card: '#FFF9F0',
  border: '#E4D3BF',
};

export const fontFamily =
  Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'sans-serif',
  }) ?? 'sans-serif';

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

const screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
};

const borderedCard: ViewStyle = {
  backgroundColor: colors.card,
  borderWidth: 1,
  borderColor: colors.border,
};

const reminderCard: ViewStyle = {
  backgroundColor: colors.secondary,
  padding: 18,
  borderRadius: 20,
};

const secondaryBodyText: TextStyle = {
  color: colors.textSecondary,
  marginTop: 8,
  lineHeight: 22,
  fontFamily,
};

const primaryButtonText: TextStyle = {
  fontWeight: 'bold',
  color: colors.text,
  fontFamily,
};

export const styles = StyleSheet.create({
  appBackgroundImage: {
    ...StyleSheet.absoluteFill,
    opacity: 0.65,
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderTopColor: 'rgba(228, 211, 191, 0.65)',
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tabBarLabel: {
    fontWeight: '600',
    fontFamily,
  },

  settingsScreen: {
    ...screenContainer,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.three,
  },
  settingsHeader: {
    width: '100%',
    maxWidth: 480,
    marginBottom: Spacing.one,
  },
  settingsTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.5,
    fontFamily,
  },
  settingsSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: Spacing.one,
    fontFamily,
  },
  settingsCard: {
    width: '100%',
    maxWidth: 480,
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  settingsIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  settingsSoundOnIconBadge: {
    backgroundColor: '#E3F0E4',
  },
  settingsMutedIconBadge: {
    backgroundColor: '#F5E3DC',
  },
  settingsClearIconBadge: {
    backgroundColor: '#FCE7E3',
  },
  settingsSoundOnIcon: {
    color: '#3B7850',
  },
  settingsMutedIcon: {
    color: '#A14C44',
  },
  settingsSoundOnText: {
    color: '#3B7850',
  },
  settingsMutedText: {
    color: '#A14C44',
  },
  settingsClearIcon: {
    color: '#A14C44',
  },
  settingsCardCopy: {
    flex: 1,
    gap: 3,
  },
  settingsCardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    fontFamily,
  },
  settingsCardSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    fontFamily,
  },
  settingsCardAction: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
    fontFamily,
  },
  settingsButtonDisabled: {
    opacity: 0.6,
  },
  settingsError: {
    color: colors.accent,
    fontSize: 14,
    textAlign: 'center',
    marginTop: Spacing.two,
    fontFamily,
  },
  settingsMessage: {
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
    fontFamily,
  },

  homeContainer: {
    ...screenContainer,
  },
  homeContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  homeHeader: {
    alignItems: 'center',
  },
  homeLogo: {
    fontSize: 40,
    fontFamily,
  },
  homeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily,
  },
  homeText: {
    ...secondaryBodyText,
  },
  homeCard: {
    ...borderedCard,
    padding: 22,
    borderRadius: 25,
  },
  homeEyebrow: {
    color: colors.accent,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily,
  },
  homeEmoji: {
    fontSize: 35,
    fontFamily,
  },
  homeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
    fontFamily,
  },
  homeMessage: {
    color: colors.accent,
    marginTop: 20,
    fontFamily,
  },
  homeReminder: {
    ...reminderCard,
  },
  homeBottomActions: {
    gap: 2,
  },
  homeButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  homeButtonText: {
    ...primaryButtonText,
  },
  homeFooter: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontFamily,
  },

  excusesContainer: {
    ...screenContainer,
    padding: 20,
  },
  excusesBack: {
    color: colors.accent,
    marginBottom: 25,
    fontFamily,
  },
  excusesTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    fontFamily,
  },
  excusesText: {
    ...secondaryBodyText,
  },
  excusesCard: {
    ...borderedCard,
    padding: 22,
    borderRadius: 25,
    marginTop: 25,
    alignItems: 'center',
  },
  excusesEmoji: {
    fontSize: 45,
    margin: 15,
    fontFamily,
  },
  excusesHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily,
  },
  excusesButton: {
    backgroundColor: colors.primary,
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  excusesButtonText: {
    ...primaryButtonText,
  },
  excusesReminder: {
    ...reminderCard,
    marginTop: 20,
  },
  excusesOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  excusesPopup: {
    backgroundColor: colors.background,
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  excusesClose: {
    fontSize: 25,
    color: colors.text,
    fontFamily,
  },
  excusesQuote: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    margin: 20,
    fontFamily,
  },
  excusesDone: {
    color: colors.textSecondary,
    marginTop: 20,
    fontFamily,
  },

  hubSafeArea: {
    ...screenContainer,
  },
  hubScrollView: {
    flex: 1,
  },
  hubScrollContent: {
    flexGrow: 1,
    padding: Spacing.three,
  },
  hubWrapper: {
    alignSelf: 'stretch',
    width: '100%',
    gap: Spacing.three,
  },
  hubTabBar: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    padding: 4,
    borderRadius: Spacing.three,
    alignSelf: 'stretch',
  },
  hubTabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Spacing.two,
  },
  hubActiveTabButton: {
    backgroundColor: colors.card,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  hubTabButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textSecondary,
    fontFamily,
  },
  hubActiveTabText: {
    color: colors.accent,
    fontFamily,
  },
  hubContent: {
    alignSelf: 'stretch',
    ...borderedCard,
    borderRadius: Spacing.four,
    padding: Spacing.three,
  },

  calendarWrapper: {
    alignSelf: 'stretch',
    gap: Spacing.three,
  },
  calendarCard: {
    borderRadius: Spacing.four,
    overflow: 'hidden',
    backgroundColor: colors.card,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  calendarMessage: {
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    backgroundColor: colors.secondary,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    minHeight: 100,
    justifyContent: 'center',
  },
  calendarMessageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily,
  },
  calendarMessageBody: {
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 22,
    color: colors.textSecondary,
    fontFamily,
  },

  converterWrapper: {
    alignSelf: 'stretch',
    marginTop: Spacing.three,
  },
  converterCard: {
    ...borderedCard,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  converterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: Spacing.one,
    fontFamily,
  },
  converterSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: Spacing.four,
    lineHeight: 18,
    fontFamily,
  },
  converterSelectorRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  converterSelectorButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  converterActiveSelector: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  converterSelectorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textSecondary,
    fontFamily,
  },
  converterActiveSelectorText: {
    color: colors.card,
    fontFamily,
  },
  converterInputGroup: {
    marginBottom: Spacing.three,
  },
  converterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: Spacing.one,
    fontFamily,
  },
  converterInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: Spacing.two,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
    fontFamily,
  },
  converterButton: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  converterDisabled: {
    opacity: 0.6,
  },
  converterButtonText: {
    color: colors.card,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily,
  },
  converterResult: {
    marginTop: Spacing.four,
    padding: Spacing.four,
    backgroundColor: colors.secondary,
    borderRadius: Spacing.three,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
  },
  converterResultTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: Spacing.one,
    fontFamily,
  },
  converterResultBody: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: Spacing.two,
    fontFamily,
  },
  converterBoldText: {
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily,
  },
  converterReward: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
    fontWeight: '500',
    fontFamily,
  },
  converterError: {
    marginTop: Spacing.two,
    color: colors.accent,
    fontSize: 13,
    fontFamily,
  },
  converterHistory: {
    marginTop: Spacing.four,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: Spacing.two,
  },
  converterHistoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  converterHistoryTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily,
  },
  converterDeleteText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '600',
    fontFamily,
  },
  converterHistoryRow: {
    paddingVertical: Spacing.one,
  },
  converterHistoryText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    fontFamily,
  },

  nutritionContainer: {
    ...screenContainer,
    backgroundColor: colors.card,
  },
  nutritionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nutritionLowerContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    alignItems: 'center',
  },
  nutritionFox: {
    transform: [{ translateY: 12 }],
  },
  nutritionCarrot: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 0,
  },
  nutritionScoreboard: {
    position: 'absolute',
    top: 80,
    left: 75,
    width: 260,
    aspectRatio: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  nutritionScoreboardImage: {
    ...StyleSheet.absoluteFill,
  },
  nutritionScore: {
    position: 'absolute',
    top: '61%',
    left: 0,
    right: 0,
    color: '#75402B',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily,
    textAlign: 'center',
    textShadowColor: '#FBE3B4',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    transform: [{ translateY: -17 }],
  },
  nutritionStorageError: {
    position: 'absolute',
    top: 200,
    left: Spacing.four,
    right: Spacing.four,
    color: colors.accent,
    textAlign: 'center',
    fontSize: 13,
    fontFamily,
  },
  nutritionActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 140,
    paddingHorizontal: 20,
    width: '100%',
  },
  nutritionActionButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  nutritionSearchButton: {
    backgroundColor: colors.primary,
  },
  nutritionQrButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nutritionLowerCarrotButton: {
    alignSelf: 'stretch',
    minHeight: 48,
    marginHorizontal: 20,
    marginTop: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.accent,
  },
  nutritionLowerCarrotDisabled: {
    opacity: 0.5,
  },
  nutritionLowerCarrotText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '700',
    fontFamily,
  },
  nutritionPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  nutritionSearchIcon: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.card,
    marginRight: 4,
  },
  nutritionQrIcon: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  nutritionQrCorner: {
    width: 8,
    height: 8,
    borderWidth: 2,
    borderColor: colors.text,
  },
  nutritionSearchLabel: {
    color: colors.card,
    fontSize: 15,
    fontWeight: '700',
    fontFamily,
  },
  nutritionQrLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    fontFamily,
  },
  nutritionSearchScreen: {
    ...screenContainer,
  },
  nutritionSearchHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nutritionSearchTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    fontFamily,
  },
  nutritionSearchSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
    fontFamily,
  },
  nutritionCloseButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.secondary,
  },
  nutritionCloseButtonText: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 31,
    fontFamily,
  },
  nutritionSearchForm: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
  },
  nutritionSearchInput: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    paddingHorizontal: 14,
    color: colors.text,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    fontFamily,
  },
  nutritionSubmitSearchButton: {
    minWidth: 88,
    minHeight: 52,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  nutritionSubmitSearchText: {
    color: colors.card,
    fontSize: 15,
    fontWeight: '700',
    fontFamily,
  },
  nutritionResultsCaption: {
    color: colors.textSecondary,
    fontSize: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
    fontFamily,
  },
  nutritionResultsList: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  nutritionResultCard: {
    ...borderedCard,
    borderRadius: 16,
    padding: 14,
  },
  nutritionResultHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  nutritionResultNameContainer: {
    flex: 1,
  },
  nutritionResultName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    fontFamily,
  },
  nutritionResultServing: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    fontFamily,
  },
  nutritionRatingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionStar: {
    color: '#D99B20',
    fontSize: 24,
    marginHorizontal: 1,
    fontFamily,
  },
  nutritionSearchMessage: {
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  nutritionMessageText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily,
  },
  nutritionEmptyText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    padding: 24,
    fontFamily,
  },
  nutritionErrorText: {
    color: colors.accent,
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontFamily,
  },
  nutritionQrScreen: {
    ...screenContainer,
    paddingHorizontal: 20,
  },
  nutritionQrHeader: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nutritionQrBackButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.secondary,
  },
  nutritionQrBackButtonText: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 38,
    marginTop: -4,
    fontFamily,
  },
  nutritionQrTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    fontFamily,
  },
  nutritionQrSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
    fontFamily,
  },
  nutritionQrCameraFrame: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.text,
  },
  nutritionQrCamera: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  nutritionQrScanReticle: {
    width: '64%',
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: colors.card,
    borderRadius: 18,
  },
  nutritionQrPermissionPanel: {
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  nutritionQrPermissionMessage: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    padding: 24,
    fontFamily,
  },
  nutritionQrHint: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontFamily,
  },
  nutritionQrResultPanel: {
    gap: 12,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.card,
  },
  nutritionQrResultTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    fontFamily,
  },
  nutritionQrNutritionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
    fontFamily,
  },
  nutritionQrLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nutritionQrResultData: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily,
  },
  nutritionQrPrimaryButton: {
    minHeight: 48,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  nutritionQrPrimaryButtonText: {
    color: colors.card,
    fontSize: 15,
    fontWeight: '700',
    fontFamily,
  },
  spriteViewport: {
    overflow: 'hidden',
  },
  carrotSpriteViewport: {
    overflow: 'hidden',
  },
});

export function foxSpriteImageStyle(
  size: number,
  frame: number,
  animationRow: number,
): ImageStyle & { imageRendering?: 'pixelated' } {
  return {
    position: 'absolute',
    width: 14 * size,
    height: 7 * size,
    left: -frame * size,
    top: -animationRow * size,
    ...(Platform.OS === 'web' ? { imageRendering: 'pixelated' } : {}),
  };
}

export function carrotSpriteImageStyle(
  height: number,
  frame: number,
): ImageStyle & { imageRendering?: 'pixelated' } {
  const frameCount = 17;
  const imageWidth = 2043;
  const imageHeight = 770;
  const cropTop = 110;
  const frameWidth = imageWidth / frameCount;
  const scale = height / (imageHeight - cropTop);

  return {
    position: 'absolute',
    width: imageWidth * scale,
    height: imageHeight * scale,
    left: -frame * frameWidth * scale,
    top: -cropTop * scale,
    ...(Platform.OS === 'web' ? { imageRendering: 'pixelated' } : {}),
  };
}
