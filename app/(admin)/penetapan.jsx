/**
 * Admin - Penetapan Pajak (SKPD)
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Spacing, BorderRadius, Shadow } from '../../src/theme/spacing';
import { Card, Badge } from '../../src/components/ui';
import { mockKetetapan } from '../../src/data/mockData';
import { formatRupiah, formatDateShort } from '../../src/utils/formatters';
import { PAJAK_LABELS, PAJAK_ICONS } from '../../src/constants/pajakTypes';

const STATUS = {
  lunas: { label: 'Lunas', variant: 'success', icon: 'checkmark-circle' },
  belum_bayar: { label: 'Belum Bayar', variant: 'warning', icon: 'time' },
  jatuh_tempo: { label: 'Jatuh Tempo', variant: 'danger', icon: 'alert-circle' },
  sebagian: { label: 'Sebagian', variant: 'info', icon: 'ellipsis-horizontal-circle' },
};

export default function PenetapanScreen() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }) => {
    const st = STATUS[item.status] || STATUS.belum_bayar;
    return (
      <Card style={s.card}>
        <View style={s.cardHeader}>
          <View style={[s.iconBox, { backgroundColor: Colors.pajak[item.jenis_pajak] + '20' }]}>
            <Ionicons name={PAJAK_ICONS[item.jenis_pajak] || 'document'} size={20}
              color={Colors.pajak[item.jenis_pajak] || Colors.primary[500]} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.skpdNo}>{item.nomor_skpd}</Text>
            <Text style={s.wpName}>{item.wp_nama}</Text>
          </View>
          <Badge label={st.label} variant={st.variant} size="sm" />
        </View>
        <View style={s.divider} />
        <View style={s.cardBody}>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Jenis Pajak</Text>
            <Text style={s.infoValue}>{PAJAK_LABELS[item.jenis_pajak] || item.jenis_pajak}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Masa / Tahun</Text>
            <Text style={s.infoValue}>{item.masa_pajak} {item.tahun_pajak}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Jatuh Tempo</Text>
            <Text style={[s.infoValue, item.status === 'jatuh_tempo' && { color: Colors.danger[500] }]}>
              {formatDateShort(item.tanggal_jatuh_tempo)}
            </Text>
          </View>
        </View>
        <View style={s.cardFooter}>
          <View>
            <Text style={s.totalLabel}>Total Ketetapan</Text>
            <Text style={s.totalValue}>{formatRupiah(item.total)}</Text>
          </View>
          <TouchableOpacity style={s.detailBtn}>
            <Text style={s.detailBtnText}>Detail</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.primary[500]} />
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>Penetapan Pajak</Text>
        <TouchableOpacity style={s.addBtn}>
          <Ionicons name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
      <FlatList data={mockKetetapan} keyExtractor={i => i.id} renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  title: { ...TextStyles.h1, color: Colors.text.primary },
  addBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.primary[500], alignItems: 'center', justifyContent: 'center' },
  card: { marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  skpdNo: { fontSize: 11, color: Colors.text.tertiary, fontWeight: '500' },
  wpName: { fontSize: 15, fontWeight: '600', color: Colors.text.primary, marginTop: 1 },
  divider: { height: 1, backgroundColor: Colors.neutral[100], marginVertical: 12 },
  cardBody: { gap: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { fontSize: 12, color: Colors.text.tertiary },
  infoValue: { fontSize: 12, fontWeight: '600', color: Colors.text.primary },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  totalLabel: { fontSize: 11, color: Colors.text.tertiary },
  totalValue: { fontSize: 18, fontWeight: '800', color: Colors.text.primary, marginTop: 2 },
  detailBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, backgroundColor: Colors.primary[50], borderRadius: 10 },
  detailBtnText: { fontSize: 13, fontWeight: '600', color: Colors.primary[500], marginRight: 2 },
});
