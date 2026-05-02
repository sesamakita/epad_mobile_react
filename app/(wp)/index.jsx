/**
 * Wajib Pajak - Dashboard
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Shadow } from '../../src/theme/spacing';
import { useAuthStore } from '../../src/stores/authStore';
import { Card, Badge, StatCard } from '../../src/components/ui';
import { mockKetetapan, mockNotifikasi } from '../../src/data/mockData';
import { formatRupiah, formatDateShort, formatRelativeTime, daysUntilDue } from '../../src/utils/formatters';

export default function WPDashboard() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const myKetetapan = mockKetetapan.filter(k => k.wp_id === user?.id);
  const belumBayar = myKetetapan.filter(k => k.status !== 'lunas');
  const totalTagihan = belumBayar.reduce((s, k) => s + k.total, 0);
  const unreadNotif = mockNotifikasi.filter(n => !n.is_read);

  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Selamat Datang 👋</Text>
            <Text style={s.userName}>{user?.nama || 'Wajib Pajak'}</Text>
            <Text style={s.npwpd}>{user?.npwpd}</Text>
          </View>
          <TouchableOpacity style={s.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
            {unreadNotif.length > 0 && <View style={s.notifDot} />}
          </TouchableOpacity>
        </View>

        {/* Tagihan Card */}
        <View style={s.tagihanCard}>
          <View style={s.tagihanHeader}>
            <Ionicons name="wallet" size={20} color={Colors.primary[200]} />
            <Text style={s.tagihanLabel}>Total Tagihan Aktif</Text>
          </View>
          <Text style={s.tagihanValue}>{formatRupiah(totalTagihan)}</Text>
          <View style={s.tagihanMeta}>
            <Text style={s.tagihanMetaText}>{belumBayar.length} tagihan belum lunas</Text>
          </View>
          <TouchableOpacity style={s.payAllBtn}>
            <Ionicons name="card" size={16} color="#FFF" />
            <Text style={s.payAllBtnText}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Menu */}
        <View style={s.menuGrid}>
          {[
            { icon: 'receipt', label: 'Tagihan', color: Colors.warning[500] },
            { icon: 'time', label: 'Riwayat', color: Colors.info[500] },
            { icon: 'document-text', label: 'SKPD', color: Colors.primary[500] },
            { icon: 'chatbubbles', label: 'Bantuan', color: Colors.accent[500] },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={s.menuItem}>
              <View style={[s.menuIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={s.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications */}
        {unreadNotif.length > 0 && (
          <>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Notifikasi</Text>
            </View>
            {unreadNotif.map(notif => (
              <Card key={notif.id} style={s.notifCard}>
                <View style={s.notifRow}>
                  <View style={[s.notifIcon, {
                    backgroundColor: notif.tipe === 'jatuh_tempo' ? Colors.warning[50] :
                      notif.tipe === 'pembayaran' ? Colors.accent[50] : Colors.info[50],
                  }]}>
                    <Ionicons
                      name={notif.tipe === 'jatuh_tempo' ? 'alarm' : notif.tipe === 'pembayaran' ? 'checkmark-circle' : 'information-circle'}
                      size={18}
                      color={notif.tipe === 'jatuh_tempo' ? Colors.warning[500] :
                        notif.tipe === 'pembayaran' ? Colors.accent[500] : Colors.info[500]}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.notifTitle}>{notif.judul}</Text>
                    <Text style={s.notifMsg} numberOfLines={2}>{notif.pesan}</Text>
                    <Text style={s.notifTime}>{formatRelativeTime(notif.created_at)}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </>
        )}

        {/* My Tax Items */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Tagihan Saya</Text>
        </View>
        {myKetetapan.map(item => {
          const days = daysUntilDue(item.tanggal_jatuh_tempo);
          return (
            <Card key={item.id} style={s.taxCard}>
              <View style={s.taxRow}>
                <View style={{ flex: 1 }}>
                  <Text style={s.taxType}>{item.jenis_pajak.toUpperCase()}</Text>
                  <Text style={s.taxPeriod}>{item.masa_pajak} {item.tahun_pajak}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={s.taxAmount}>{formatRupiah(item.total)}</Text>
                  <Badge label={item.status === 'lunas' ? 'Lunas' : days <= 0 ? 'Jatuh Tempo' : `${days} hari lagi`}
                    variant={item.status === 'lunas' ? 'success' : days <= 0 ? 'danger' : 'warning'} size="sm" />
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14 },
  greeting: { fontSize: 13, color: Colors.text.secondary },
  userName: { fontSize: 20, fontWeight: '700', color: Colors.text.primary, marginTop: 2 },
  npwpd: { fontSize: 11, color: Colors.text.tertiary, marginTop: 2 },
  notifBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', ...Shadow.sm },
  notifDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.danger[500] },
  tagihanCard: { marginHorizontal: 16, backgroundColor: Colors.info[600], borderRadius: 20, padding: 20, marginBottom: 16 },
  tagihanHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tagihanLabel: { fontSize: 12, color: Colors.info[100], fontWeight: '500' },
  tagihanValue: { fontSize: 30, fontWeight: '800', color: '#FFF', marginTop: 8 },
  tagihanMeta: { marginTop: 4 },
  tagihanMetaText: { fontSize: 12, color: Colors.info[200] },
  payAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, paddingVertical: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
  payAllBtnText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  menuGrid: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 8 },
  menuItem: { flex: 1, alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, paddingVertical: 16, ...Shadow.sm },
  menuIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  menuLabel: { fontSize: 11, fontWeight: '600', color: Colors.text.primary },
  sectionHeader: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.text.primary },
  notifCard: { marginHorizontal: 16, marginBottom: 8 },
  notifRow: { flexDirection: 'row', gap: 12 },
  notifIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  notifTitle: { fontSize: 14, fontWeight: '600', color: Colors.text.primary },
  notifMsg: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
  notifTime: { fontSize: 10, color: Colors.text.tertiary, marginTop: 4 },
  taxCard: { marginHorizontal: 16, marginBottom: 8 },
  taxRow: { flexDirection: 'row', alignItems: 'center' },
  taxType: { fontSize: 12, fontWeight: '700', color: Colors.primary[500], letterSpacing: 0.5 },
  taxPeriod: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  taxAmount: { fontSize: 16, fontWeight: '800', color: Colors.text.primary, marginBottom: 4 },
});
