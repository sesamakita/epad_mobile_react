/**
 * Kasir - Cari Wajib Pajak
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Shadow } from '../../src/theme/spacing';
import { useAuthStore } from '../../src/stores/authStore';
import { Card, Badge } from '../../src/components/ui';
import { mockWajibPajak, mockKetetapan } from '../../src/data/mockData';
import { formatRupiah } from '../../src/utils/formatters';

export default function CariWPScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');

  const filtered = search.length > 0
    ? mockWajibPajak.filter(wp =>
        wp.nama.toLowerCase().includes(search.toLowerCase()) ||
        wp.npwpd.toLowerCase().includes(search.toLowerCase()) ||
        wp.nik.includes(search)
      )
    : [];

  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.greeting}>Kasir - {user?.nama?.split(',')[0]}</Text>
        <Text style={s.title}>Cari Wajib Pajak</Text>
      </View>

      {/* Search box */}
      <View style={s.searchCard}>
        <View style={s.searchRow}>
          <Ionicons name="search" size={20} color={Colors.neutral[400]} />
          <TextInput style={s.searchInput} placeholder="Cari NPWPD, Nama, atau NIK..."
            placeholderTextColor={Colors.neutral[400]} value={search} onChangeText={setSearch} autoFocus />
        </View>
        <TouchableOpacity style={s.qrBtn}>
          <Ionicons name="qr-code-outline" size={22} color={Colors.warning[600]} />
          <Text style={s.qrBtnText}>Scan QR</Text>
        </TouchableOpacity>
      </View>

      {search.length === 0 ? (
        <View style={s.empty}>
          <View style={s.emptyIcon}><Ionicons name="receipt-outline" size={48} color={Colors.neutral[300]} /></View>
          <Text style={s.emptyTitle}>Cari Wajib Pajak</Text>
          <Text style={s.emptyMsg}>Masukkan NPWPD, nama, atau NIK untuk mencari data wajib pajak dan memproses pembayaran</Text>
        </View>
      ) : (
        <FlatList data={filtered} keyExtractor={i => i.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={s.empty}>
              <Text style={s.emptyTitle}>Tidak Ditemukan</Text>
              <Text style={s.emptyMsg}>Tidak ada WP dengan pencarian "{search}"</Text>
            </View>
          }
          renderItem={({ item }) => {
            const wpKetetapan = mockKetetapan.filter(k => k.wp_id === item.id && k.status !== 'lunas');
            return (
              <Card style={s.card}>
                <View style={s.cardRow}>
                  <View style={s.av}><Text style={s.avT}>{item.nama.charAt(0)}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.wpName}>{item.nama}</Text>
                    <Text style={s.npwpd}>{item.npwpd}</Text>
                  </View>
                </View>
                {wpKetetapan.length > 0 && (
                  <View style={s.tagihanBox}>
                    <Ionicons name="alert-circle" size={14} color={Colors.warning[600]} />
                    <Text style={s.tagihanText}>{wpKetetapan.length} tagihan belum lunas</Text>
                    <Text style={s.tagihanAmount}>{formatRupiah(wpKetetapan.reduce((s, k) => s + k.total, 0))}</Text>
                  </View>
                )}
                <TouchableOpacity style={s.payBtn}>
                  <Ionicons name="card" size={16} color="#FFF" />
                  <Text style={s.payBtnText}>Proses Pembayaran</Text>
                </TouchableOpacity>
              </Card>
            );
          }} />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  header: { paddingHorizontal: 20, paddingVertical: 14 },
  greeting: { fontSize: 13, color: Colors.text.secondary },
  title: { ...TextStyles.h1, color: Colors.text.primary, marginTop: 2 },
  searchCard: { marginHorizontal: 16, backgroundColor: '#FFF', borderRadius: 16, padding: 14, ...Shadow.md, marginBottom: 16 },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.neutral[50], borderRadius: 12, paddingHorizontal: 12, height: 48, borderWidth: 1, borderColor: Colors.neutral[200] },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: Colors.text.primary },
  qrBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10, paddingVertical: 10, backgroundColor: Colors.warning[50], borderRadius: 10 },
  qrBtnText: { fontSize: 14, fontWeight: '600', color: Colors.warning[700] },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, paddingTop: 60 },
  emptyIcon: { width: 80, height: 80, borderRadius: 24, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: Colors.text.primary, marginBottom: 8 },
  emptyMsg: { fontSize: 14, color: Colors.text.secondary, textAlign: 'center' },
  card: { marginBottom: 12 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  av: { width: 42, height: 42, borderRadius: 12, backgroundColor: Colors.warning[100], alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avT: { fontSize: 18, fontWeight: '700', color: Colors.warning[700] },
  wpName: { fontSize: 15, fontWeight: '600', color: Colors.text.primary },
  npwpd: { fontSize: 11, color: Colors.text.tertiary, marginTop: 1 },
  tagihanBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.warning[50], padding: 10, borderRadius: 10, marginTop: 12 },
  tagihanText: { fontSize: 12, color: Colors.warning[700], fontWeight: '500', flex: 1 },
  tagihanAmount: { fontSize: 14, fontWeight: '800', color: Colors.warning[700] },
  payBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, paddingVertical: 12, backgroundColor: Colors.warning[600], borderRadius: 12 },
  payBtnText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
});
