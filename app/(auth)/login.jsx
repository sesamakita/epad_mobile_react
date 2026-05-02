/**
 * Login Screen - e-PAD
 * Premium government-style login with role selection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../src/stores/authStore';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Spacing, BorderRadius, Shadow } from '../../src/theme/spacing';
import { ROLES, ROLE_LABELS, ROLE_ICONS, ROLE_COLORS, ROLE_ROUTES } from '../../src/constants/roles';
import { Input, Button } from '../../src/components/ui';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Quick login buttons for development
  const quickLogins = [
    { key: 'admin', label: 'Admin Bidang', icon: 'shield-checkmark', color: ROLE_COLORS[ROLES.ADMIN_BIDANG] },
    { key: 'lapangan', label: 'Petugas Lapangan', icon: 'walk', color: ROLE_COLORS[ROLES.PETUGAS_LAPANGAN] },
    { key: 'kasir', label: 'Kasir', icon: 'card', color: ROLE_COLORS[ROLES.KASIR] },
    { key: 'wp', label: 'Wajib Pajak', icon: 'person', color: ROLE_COLORS[ROLES.WAJIB_PAJAK] },
  ];

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Perhatian', 'Masukkan username dan password');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      const route = ROLE_ROUTES[result.role];
      if (route) {
        router.replace(route);
      }
    }
  };

  const handleQuickLogin = async (key) => {
    const result = await login(key, '123456');
    if (result.success) {
      const route = ROLE_ROUTES[result.role];
      if (route) {
        router.replace(route);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header / Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoOuter}>
              <View style={styles.logoInner}>
                <Ionicons name="wallet" size={36} color="#FFFFFF" />
              </View>
            </View>
          </View>
          <Text style={styles.appTitle}>e-PAD</Text>
          <Text style={styles.appSubtitle}>Sistem Pendapatan Asli Daerah</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.govBadge}>
              <Ionicons name="shield-checkmark" size={12} color={Colors.accent[600]} />
              <Text style={styles.govBadgeText}>Aplikasi Resmi Pemerintah Daerah</Text>
            </View>
          </View>
        </View>

        {/* Login Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Masuk ke Akun Anda</Text>
          <Text style={styles.formSubtitle}>
            Masukkan kredensial yang terdaftar di sistem
          </Text>

          <Input
            label="Username / NIP"
            value={username}
            onChangeText={(text) => {
              clearError();
              setUsername(text);
            }}
            placeholder="Masukkan username atau NIP"
            icon="person-outline"
          />

          <View style={styles.passwordContainer}>
            <Input
              label="Password"
              value={password}
              onChangeText={(text) => {
                clearError();
                setPassword(text);
              }}
              placeholder="Masukkan password"
              icon="lock-closed-outline"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={Colors.neutral[400]}
              />
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={Colors.danger[500]} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Button
            title="Masuk"
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            size="lg"
            icon="log-in-outline"
            style={{ marginTop: 8 }}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Lupa password?</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Login - Development Only */}
        <View style={styles.devSection}>
          <View style={styles.devDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Mode Demo</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.devHint}>Pilih role untuk masuk langsung (password: 123456)</Text>

          <View style={styles.quickLoginGrid}>
            {quickLogins.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.quickLoginCard}
                onPress={() => handleQuickLogin(item.key)}
                activeOpacity={0.7}
              >
                <View style={[styles.quickLoginIcon, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.quickLoginLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Badan Pendapatan Daerah © 2025
          </Text>
          <Text style={styles.footerVersion}>e-PAD v1.0.0</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  logoContainer: {
    marginBottom: Spacing.base,
  },
  logoOuter: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary[900],
    letterSpacing: -1.5,
  },
  appSubtitle: {
    ...TextStyles.body,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  badgeContainer: {
    marginTop: Spacing.md,
  },
  govBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent[50],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  govBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.accent[700],
  },

  // Form Card
  formCard: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadow.md,
    marginBottom: Spacing.xl,
  },
  formTitle: {
    ...TextStyles.h2,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  formSubtitle: {
    ...TextStyles.bodySm,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    top: 36,
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.danger[50],
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    gap: 8,
  },
  errorText: {
    ...TextStyles.bodySm,
    color: Colors.danger[600],
    flex: 1,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: Spacing.base,
  },
  forgotPasswordText: {
    ...TextStyles.bodySm,
    color: Colors.primary[500],
    fontWeight: '600',
  },

  // Dev Section
  devSection: {
    marginBottom: Spacing.xl,
  },
  devDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.neutral[200],
  },
  dividerText: {
    ...TextStyles.labelSm,
    color: Colors.text.tertiary,
    marginHorizontal: 12,
    fontSize: 11,
  },
  devHint: {
    ...TextStyles.bodyXs,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  quickLoginGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  quickLoginCard: {
    flex: 1,
    minWidth: (width - 72) / 2,
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    alignItems: 'center',
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
  },
  quickLoginIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickLoginLabel: {
    ...TextStyles.label,
    color: Colors.text.primary,
    fontSize: 12,
    textAlign: 'center',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    ...TextStyles.bodyXs,
    color: Colors.text.tertiary,
  },
  footerVersion: {
    ...TextStyles.bodyXs,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
});
