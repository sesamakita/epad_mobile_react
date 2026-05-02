/**
 * Petugas Lapangan - Pendataan (placeholder)
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Button } from '../../src/components/ui';

export default function PendataanScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <View style={s.header}><Text style={s.title}>Pendataan</Text></View>
      <View style={s.empty}>
        <View style={s.iconBox}><Ionicons name="camera-outline" size={48} color={Colors.neutral[300]} /></View>
        <Text style={s.emptyTitle}>Pendataan Objek Pajak</Text>
        <Text style={s.emptyMsg}>Tambahkan data objek pajak baru dengan foto dan koordinat GPS</Text>
        <Button title="Mulai Pendataan" icon="add-circle" onPress={() => {}} style={{ marginTop: 20 }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  header: { paddingHorizontal: 20, paddingVertical: 14 },
  title: { ...TextStyles.h1, color: Colors.text.primary },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  iconBox: { width: 80, height: 80, borderRadius: 24, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: Colors.text.primary, marginBottom: 8 },
  emptyMsg: { fontSize: 14, color: Colors.text.secondary, textAlign: 'center' },
});
