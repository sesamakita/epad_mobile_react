/**
 * Shared UI Components for e-PAD
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { TextStyles } from '../../theme/typography';
import { Spacing, BorderRadius, Shadow } from '../../theme/spacing';

// ==================== CARD ====================
export const Card = ({ children, style, variant = 'default', onPress }) => {
  const cardStyle = [
    styles.card,
    variant === 'elevated' && styles.cardElevated,
    variant === 'outlined' && styles.cardOutlined,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={cardStyle}>{children}</View>;
};

// ==================== BUTTON ====================
export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    fullWidth && { width: '100%' },
    disabled && styles.buttonDisabled,
    style,
  ];

  const textStyles = [
    styles.buttonText,
    styles[`buttonText_${variant}`],
    styles[`buttonText_${size}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : Colors.primary[500]}
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && !iconRight && (
            <Ionicons
              name={icon}
              size={size === 'sm' ? 16 : 20}
              color={variant === 'primary' ? '#fff' : Colors.primary[500]}
              style={{ marginRight: 8 }}
            />
          )}
          <Text style={textStyles}>{title}</Text>
          {icon && iconRight && (
            <Ionicons
              name={icon}
              size={size === 'sm' ? 16 : 20}
              color={variant === 'primary' ? '#fff' : Colors.primary[500]}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

// ==================== INPUT ====================
export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  style,
  editable = true,
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={[styles.inputContainer, style]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          focused && styles.inputFocused,
          error && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={focused ? Colors.primary[500] : Colors.neutral[400]}
            style={{ marginRight: 10 }}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral[400]}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            styles.input,
            multiline && { height: 100, textAlignVertical: 'top' },
          ]}
        />
      </View>
      {error && (
        <Text style={styles.inputErrorText}>{error}</Text>
      )}
    </View>
  );
};

// ==================== BADGE ====================
export const Badge = ({ label, variant = 'default', size = 'md', icon }) => {
  const badgeColors = {
    default: { bg: Colors.neutral[100], text: Colors.neutral[600] },
    success: { bg: Colors.accent[50], text: Colors.accent[700] },
    warning: { bg: Colors.warning[50], text: Colors.warning[700] },
    danger: { bg: Colors.danger[50], text: Colors.danger[700] },
    info: { bg: Colors.info[50], text: Colors.info[700] },
    primary: { bg: Colors.primary[50], text: Colors.primary[700] },
  };

  const colors = badgeColors[variant] || badgeColors.default;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg },
        size === 'sm' && { paddingHorizontal: 6, paddingVertical: 2 },
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={size === 'sm' ? 10 : 12}
          color={colors.text}
          style={{ marginRight: 4 }}
        />
      )}
      <Text
        style={[
          styles.badgeText,
          { color: colors.text },
          size === 'sm' && { fontSize: 10 },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

// ==================== STAT CARD ====================
export const StatCard = ({ title, value, subtitle, icon, color, trend, onPress }) => {
  return (
    <Card style={styles.statCard} onPress={onPress}>
      <View style={styles.statCardHeader}>
        <View
          style={[
            styles.statCardIcon,
            { backgroundColor: `${color}15` },
          ]}
        >
          <Ionicons name={icon} size={22} color={color} />
        </View>
        {trend && (
          <View style={styles.statCardTrend}>
            <Ionicons
              name={trend > 0 ? 'trending-up' : 'trending-down'}
              size={14}
              color={trend > 0 ? Colors.accent[500] : Colors.danger[500]}
            />
            <Text
              style={[
                styles.statCardTrendText,
                { color: trend > 0 ? Colors.accent[500] : Colors.danger[500] },
              ]}
            >
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.statCardValue}>{value}</Text>
      <Text style={styles.statCardTitle}>{title}</Text>
      {subtitle && <Text style={styles.statCardSubtitle}>{subtitle}</Text>}
    </Card>
  );
};

// ==================== SECTION HEADER ====================
export const SectionHeader = ({ title, action, actionLabel, icon }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionHeaderLeft}>
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={Colors.primary[500]}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
    </View>
    {action && (
      <TouchableOpacity onPress={action} style={styles.sectionHeaderAction}>
        <Text style={styles.sectionHeaderActionText}>{actionLabel || 'Lihat Semua'}</Text>
        <Ionicons name="chevron-forward" size={14} color={Colors.primary[500]} />
      </TouchableOpacity>
    )}
  </View>
);

// ==================== LIST ITEM ====================
export const ListItem = ({ title, subtitle, left, right, onPress, bottomDivider = true }) => (
  <TouchableOpacity
    style={[styles.listItem, bottomDivider && styles.listItemDivider]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {left && <View style={styles.listItemLeft}>{left}</View>}
    <View style={styles.listItemContent}>
      <Text style={styles.listItemTitle} numberOfLines={1}>{title}</Text>
      {subtitle && (
        <Text style={styles.listItemSubtitle} numberOfLines={1}>{subtitle}</Text>
      )}
    </View>
    {right && <View style={styles.listItemRight}>{right}</View>}
    <Ionicons name="chevron-forward" size={16} color={Colors.neutral[300]} />
  </TouchableOpacity>
);

// ==================== EMPTY STATE ====================
export const EmptyState = ({ icon, title, message, actionLabel, onAction }) => (
  <View style={styles.emptyState}>
    <View style={styles.emptyStateIcon}>
      <Ionicons name={icon || 'file-tray-outline'} size={48} color={Colors.neutral[300]} />
    </View>
    <Text style={styles.emptyStateTitle}>{title || 'Tidak Ada Data'}</Text>
    <Text style={styles.emptyStateMessage}>{message || 'Belum ada data untuk ditampilkan'}</Text>
    {actionLabel && (
      <Button
        title={actionLabel}
        onPress={onAction}
        variant="outline"
        size="sm"
        style={{ marginTop: 16 }}
      />
    )}
  </View>
);

// ==================== PROGRESS BAR ====================
export const ProgressBar = ({ progress, color, height = 8, showLabel = false, label }) => (
  <View style={styles.progressContainer}>
    {showLabel && (
      <View style={styles.progressLabel}>
        <Text style={styles.progressLabelText}>{label}</Text>
        <Text style={styles.progressLabelValue}>{Math.round(progress * 100)}%</Text>
      </View>
    )}
    <View style={[styles.progressTrack, { height }]}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${Math.min(progress * 100, 100)}%`,
            backgroundColor: color || Colors.primary[500],
            height,
          },
        ]}
      />
    </View>
  </View>
);

// ==================== STYLES ====================
const styles = StyleSheet.create({
  // Card
  card: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadow.sm,
  },
  cardElevated: {
    ...Shadow.lg,
  },
  cardOutlined: {
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    shadowColor: 'transparent',
    elevation: 0,
  },

  // Button
  button: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_primary: {
    backgroundColor: Colors.primary[500],
  },
  button_secondary: {
    backgroundColor: Colors.neutral[100],
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary[500],
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  button_danger: {
    backgroundColor: Colors.danger[500],
  },
  button_sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    height: 36,
  },
  button_md: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    height: 48,
  },
  button_lg: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    height: 56,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...TextStyles.label,
  },
  buttonText_primary: {
    color: '#FFFFFF',
  },
  buttonText_secondary: {
    color: Colors.text.primary,
  },
  buttonText_outline: {
    color: Colors.primary[500],
  },
  buttonText_ghost: {
    color: Colors.primary[500],
  },
  buttonText_danger: {
    color: '#FFFFFF',
  },
  buttonText_sm: {
    fontSize: 13,
  },
  buttonText_md: {
    fontSize: 15,
  },
  buttonText_lg: {
    fontSize: 17,
  },

  // Input
  inputContainer: {
    marginBottom: Spacing.base,
  },
  inputLabel: {
    ...TextStyles.label,
    color: Colors.text.secondary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  inputError: {
    borderColor: Colors.danger[500],
    backgroundColor: Colors.danger[50],
  },
  inputDisabled: {
    backgroundColor: Colors.neutral[100],
    opacity: 0.7,
  },
  input: {
    flex: 1,
    ...TextStyles.body,
    color: Colors.text.primary,
    paddingVertical: Spacing.md,
  },
  inputErrorText: {
    ...TextStyles.bodyXs,
    color: Colors.danger[500],
    marginTop: 4,
    marginLeft: 4,
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Stat Card
  statCard: {
    flex: 1,
    minWidth: 150,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statCardIcon: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCardTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCardTrendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  statCardValue: {
    ...TextStyles.numeric,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  statCardTitle: {
    ...TextStyles.bodySm,
    color: Colors.text.secondary,
  },
  statCardSubtitle: {
    ...TextStyles.bodyXs,
    color: Colors.text.tertiary,
    marginTop: 2,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderTitle: {
    ...TextStyles.h3,
    color: Colors.text.primary,
  },
  sectionHeaderAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderActionText: {
    ...TextStyles.bodySm,
    color: Colors.primary[500],
    fontWeight: '600',
    marginRight: 2,
  },

  // List Item
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  listItemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  listItemLeft: {
    marginRight: Spacing.md,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    ...TextStyles.body,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  listItemSubtitle: {
    ...TextStyles.bodySm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  listItemRight: {
    marginLeft: Spacing.sm,
    marginRight: Spacing.sm,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['4xl'],
    paddingHorizontal: Spacing['2xl'],
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  emptyStateTitle: {
    ...TextStyles.h3,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptyStateMessage: {
    ...TextStyles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },

  // Progress Bar
  progressContainer: {
    width: '100%',
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabelText: {
    ...TextStyles.bodySm,
    color: Colors.text.secondary,
  },
  progressLabelValue: {
    ...TextStyles.label,
    color: Colors.text.primary,
  },
  progressTrack: {
    backgroundColor: Colors.neutral[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: BorderRadius.full,
  },
});
