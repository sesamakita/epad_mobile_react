/**
 * Petugas Lapangan - Tugas Harian
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Shadow, BorderRadius } from '../../src/theme/spacing';
import { useAuthStore } from '../../src/stores/authStore';
import { Card, Badge } from '../../src/components/ui';
import { mockTugasLapangan } from '../../src/data/mockData';
import { formatRupiah } from '../../src/utils/formatters';

export default function TugasHarianScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();

  const priorityConfig = {
    tinggi: { color: Colors.danger[500], bg: Colors.danger[50], label: 'Prioritas Tinggi' },
    sedang: { color: Colors.warning[500], bg: Colors.warning[50], label: 'Prioritas Sedang' },
    rendah: { color: Colors.accent[500], bg: Colors.accent[50], label: 'Prioritas Rendah' },
  };

  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Halo, {user?.nama?.split(' ')[0]} 👋</Text>
          <Text style={s.title}>Tugas Hari Ini</Text>
        </View>
        <View style={s.taskCount}>
          <Text style={s.taskCountNum}>{mockTugasLapangan.length}</Text>
          <Text style={s.taskCountLabel}>tugas</Text>
        </View>
      </View>

      {/* Summary bar */}
      <View style={s.summaryBar}>
        <View style={s.summaryItem}>
          <View style={[s.dot, { backgroundColor: Colors.danger[500] }]} />
          <Text style={s.summaryText}>2 Tinggi</Text>
        </View>
        <View style={s.summaryItem}>
          <View style={[s.dot, { backgroundColor: Colors.warning[500] }]} />
          <Text style={s.summaryText}>1 Sedang</Text>
        </View>
        <View style={s.summaryItem}>
          <View style={[s.dot, { backgroundColor: Colors.accent[500] }]} />
          <Text style={s.summaryText}>0 Selesai</Text>
        </View>
      </View>

      <FlatList data={mockTugasLapangan} keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => {
          const pr = priorityConfig[item.prioritas] || priorityConfig.sedang;
          return (
            <Card style={s.card}>
              <View style={s.cardTop}>
                <Badge label={pr.label} variant={item.prioritas === 'tinggi' ? 'danger' : 'warning'} size="sm" />
                <Badge label={item.jenis === 'penagihan' ? 'Penagihan' : 'Verifikasi'}
                  variant={item.jenis === 'penagihan' ? 'primary' : 'info'} size="sm" />
              </View>
              <Text style={s.wpName}>{item.wp_nama}</Text>
              <View style={s.addressRow}>
                <Ionicons name="location" size={14} color={Colors.text.tertiary} />
                <Text style={s.address} numberOfLines={2}>{item.wp_alamat}</Text>
              </View>
              {item.jumlah_tunggakan > 0 && (
                <View style={s.tunggakanRow}>
                  <Text style={s.tunggakanLabel}>Tunggakan:</Text>
                  <Text style={s.tunggakanAmount}>{formatRupiah(item.jumlah_tunggakan)}</Text>
                </View>
              )}
              <View style={s.cardActions}>
                <TouchableOpacity style={s.navBtn}>
                  <Ionicons name="navigate" size={16} color={Colors.info[500]} />
                  <Text style={s.navBtnText}>Navigasi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.startBtn}>
                  <Ionicons name="checkmark-circle" size={16} color="#FFF" />
                  <Text style={s.startBtnText}>Mulai Kunjungan</Text>
                </TouchableOpacity>
              </View>
            </Card>
          );
        }} />
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingVertical: 14 },
  greeting: { fontSize: 13, color: Colors.text.secondary },
  title: { ...TextStyles.h1, color: Colors.text.primary, marginTop: 2 },
  taskCount: { alignItems: 'center', backgroundColor: Colors.accent[50], paddingHorizontal: 16, paddingVertical: 8, borderRadius: 14 },
  taskCountNum: { fontSize: 24, fontWeight: '800', color: Colors.accent[600] },
  taskCountLabel: { fontSize: 10, color: Colors.accent[600], fontWeight: '500' },
  summaryBar: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 16 },
  summaryItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  summaryText: { fontSize: 12, color: Colors.text.secondary, fontWeight: '500' },
  card: { marginBottom: 12 },
  cardTop: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  wpName: { fontSize: 17, fontWeight: '700', color: Colors.text.primary },
  addressRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 6 },
  address: { fontSize: 13, color: Colors.text.secondary, flex: 1 },
  tunggakanRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.danger[50], padding: 10, borderRadius: 10, marginTop: 10 },
  tunggakanLabel: { fontSize: 12, color: Colors.danger[600], fontWeight: '500' },
  tunggakanAmount: { fontSize: 15, fontWeight: '800', color: Colors.danger[600] },
  cardActions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  navBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, backgroundColor: Colors.info[50], borderRadius: 10 },
  navBtnText: { fontSize: 13, fontWeight: '600', color: Colors.info[600] },
  startBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, backgroundColor: Colors.accent[500], borderRadius: 10 },
  startBtnText: { fontSize: 13, fontWeight: '600', color: '#FFF' },
});
