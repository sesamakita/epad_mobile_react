/**
 * Index - App Entry Point
 * Redirects to login or role-based dashboard
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../src/stores/authStore';
import { ROLE_ROUTES } from '../src/constants/roles';
import { Colors } from '../src/theme/colors';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated && user) {
        const route = ROLE_ROUTES[user.role];
        if (route) {
          router.replace(route);
        }
      } else {
        router.replace('/(auth)/login');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Ionicons name="wallet" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.appName}>e-PAD</Text>
        <Text style={styles.subtitle}>Pendapatan Asli Daerah</Text>
      </View>
      <ActivityIndicator size="large" color={Colors.primary[500]} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary[500],
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  loader: {
    marginTop: 40,
  },
});
