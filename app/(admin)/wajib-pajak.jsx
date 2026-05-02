/**
 * Admin - Wajib Pajak List
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Spacing, BorderRadius, Shadow } from '../../src/theme/spacing';
import { Card, Badge } from '../../src/components/ui';
import { mockWajibPajak } from '../../src/data/mockData';
import { formatRupiah } from '../../src/utils/formatters';

export default function WajibPajakScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filtered = mockWajibPajak.filter(wp =>
    wp.nama.toLowerCase().includes(search.toLowerCase()) ||
    wp.npwpd.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={s.wpCard}>
      <View style={s.row}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{item.nama.charAt(0)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.wpName} numberOfLines={1}>{item.nama}</Text>
          <Text style={s.wpNpwpd}>{item.npwpd}</Text>
        </View>
        <Badge label={item.jenis_wp === 'badan' ? 'Badan' : 'Pribadi'}
          variant={item.jenis_wp === 'badan' ? 'info' : 'default'} size="sm" />
      </View>
      <View style={s.divider} />
      <View style={s.row}>
        <View>
          <Text style={s.label}>Tagihan</Text>
          <Text style={s.amount}>{formatRupiah(item.totalTagihan)}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={s.label}>Tunggakan</Text>
          <Text style={[s.amount, { color: item.totalTunggakan > 0 ? Colors.danger[500] : Colors.accent[500] }]}>
            {item.totalTunggakan > 0 ? formatRupiah(item.totalTunggakan) : 'Lunas ✓'}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>Wajib Pajak</Text>
        <TouchableOpacity style={s.addBtn}>
          <Ionicons name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={s.searchBox}>
        <Ionicons name="search" size={18} color={Colors.neutral[400]} />
        <TextInput style={s.searchInput} placeholder="Cari nama / NPWPD..."
          placeholderTextColor={Colors.neutral[400]} value={search} onChangeText={setSearch} />
      </View>
      <Text style={s.count}>{filtered.length} Wajib Pajak</Text>
      <FlatList data={filtered} keyExtractor={i => i.id} renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  title: { ...TextStyles.h1, color: Colors.text.primary },
  addBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.primary[500], alignItems: 'center', justifyContent: 'center' },
  searchBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 12, height: 44, ...Shadow.sm, borderWidth: 1, borderColor: Colors.neutral[100] },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: Colors.text.primary },
  count: { fontSize: 12, color: Colors.text.tertiary, paddingHorizontal: 16, paddingVertical: 10 },
  wpCard: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatar: { width: 42, height: 42, borderRadius: 12, backgroundColor: Colors.primary[100], alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontSize: 18, fontWeight: '700', color: Colors.primary[600] },
  wpName: { fontSize: 15, fontWeight: '600', color: Colors.text.primary },
  wpNpwpd: { fontSize: 11, color: Colors.text.tertiary, marginTop: 1 },
  divider: { height: 1, backgroundColor: Colors.neutral[100], marginVertical: 12 },
  label: { fontSize: 11, color: Colors.text.tertiary },
  amount: { fontSize: 14, fontWeight: '700', color: Colors.text.primary, marginTop: 2 },
});
