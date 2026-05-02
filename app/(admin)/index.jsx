/**
 * Admin Bidang - Dashboard
 * Overview of PAD realization, WP stats, and recent activities
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/stores/authStore';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Spacing, BorderRadius, Shadow } from '../../src/theme/spacing';
import { Card, StatCard, SectionHeader, Badge, ProgressBar } from '../../src/components/ui';
import { mockRealisasiPAD, mockKetetapan, mockWajibPajak } from '../../src/data/mockData';
import { formatRupiah, formatCompact, formatPercentage } from '../../src/utils/formatters';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const pad = mockRealisasiPAD;

  const tunggakanCount = mockKetetapan.filter(k => k.status === 'jatuh_tempo').length;
  const totalWP = mockWajibPajak.length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Selamat Datang 👋</Text>
          <Text style={styles.userName}>{user?.nama || 'Admin'}</Text>
          <View style={styles.roleBadge}>
            <Ionicons name="shield-checkmark" size={10} color={Colors.primary[600]} />
            <Text style={styles.roleText}>Admin Bidang</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* PAD Realization Card */}
        <View style={styles.padCard}>
          <View style={styles.padCardHeader}>
            <View>
              <Text style={styles.padCardLabel}>Realisasi PAD {pad.tahun}</Text>
              <Text style={styles.padCardValue}>{formatRupiah(pad.realisasi)}</Text>
            </View>
            <View style={styles.padPercentage}>
              <Text style={styles.padPercentageValue}>{pad.persentase}%</Text>
              <Text style={styles.padPercentageLabel}>tercapai</Text>
            </View>
          </View>
          <ProgressBar
            progress={pad.persentase / 100}
            color={Colors.accent[500]}
            height={10}
          />
          <View style={styles.padCardFooter}>
            <Text style={styles.padCardTarget}>
              Target: {formatRupiah(pad.target)}
            </Text>
            <Text style={styles.padCardRemaining}>
              Sisa: {formatRupiah(pad.target - pad.realisasi)}
            </Text>
          </View>
        </View>

        {/* Monthly Stats */}
        <View style={styles.monthlyCard}>
          <View style={styles.monthlyHeader}>
            <Ionicons name="calendar" size={16} color={Colors.info[500]} />
            <Text style={styles.monthlyTitle}>Bulan Ini</Text>
          </View>
          <View style={styles.monthlyStats}>
            <View style={styles.monthlyStat}>
              <Text style={styles.monthlyStatValue}>{formatCompact(pad.bulanIni.realisasi)}</Text>
              <Text style={styles.monthlyStatLabel}>Realisasi</Text>
            </View>
            <View style={styles.monthlyDivider} />
            <View style={styles.monthlyStat}>
              <Text style={styles.monthlyStatValue}>{formatCompact(pad.bulanIni.target)}</Text>
              <Text style={styles.monthlyStatLabel}>Target</Text>
            </View>
            <View style={styles.monthlyDivider} />
            <View style={styles.monthlyStat}>
              <Text style={[styles.monthlyStatValue, { color: Colors.accent[500] }]}>
                {pad.bulanIni.persentase}%
              </Text>
              <Text style={styles.monthlyStatLabel}>Capaian</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats Row */}
        <View style={styles.statsRow}>
          <StatCard
            title="Wajib Pajak"
            value={totalWP}
            icon="people"
            color={Colors.primary[500]}
            subtitle="WP Aktif"
          />
          <View style={{ width: 12 }} />
          <StatCard
            title="Tunggakan"
            value={tunggakanCount}
            icon="alert-circle"
            color={Colors.danger[500]}
            subtitle="Jatuh Tempo"
          />
        </View>

        {/* Realisasi Per Jenis Pajak */}
        <SectionHeader title="Realisasi Per Jenis Pajak" icon="pie-chart" />
        <Card style={styles.taxBreakdownCard}>
          {pad.perJenisPajak.map((item, index) => {
            const progress = item.realisasi / item.target;
            const progressColor = progress >= 0.75
              ? Colors.accent[500]
              : progress >= 0.5
              ? Colors.warning[500]
              : Colors.danger[500];

            return (
              <View key={item.jenis} style={styles.taxItem}>
                <View style={styles.taxItemHeader}>
                  <Text style={styles.taxItemLabel}>{item.label}</Text>
                  <Text style={styles.taxItemValue}>{formatCompact(item.realisasi)}</Text>
                </View>
                <ProgressBar progress={progress} color={progressColor} height={6} />
                <View style={styles.taxItemFooter}>
                  <Text style={styles.taxItemTarget}>Target: {formatCompact(item.target)}</Text>
                  <Text style={[styles.taxItemPercent, { color: progressColor }]}>
                    {(progress * 100).toFixed(1)}%
                  </Text>
                </View>
                {index < pad.perJenisPajak.length - 1 && <View style={styles.taxItemDivider} />}
              </View>
            );
          })}
        </Card>

        {/* Recent SKPD */}
        <SectionHeader title="SKPD Terbaru" icon="document-text" action={() => {}} />
        <Card style={{ marginHorizontal: Spacing.base }}>
          {mockKetetapan.slice(0, 3).map((item, index) => {
            const statusConfig = {
              lunas: { label: 'Lunas', variant: 'success' },
              belum_bayar: { label: 'Belum Bayar', variant: 'warning' },
              jatuh_tempo: { label: 'Jatuh Tempo', variant: 'danger' },
              sebagian: { label: 'Sebagian', variant: 'info' },
            };
            const st = statusConfig[item.status] || statusConfig.belum_bayar;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.skpdItem,
                  index < 2 && styles.skpdItemBorder,
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.skpdItemLeft}>
                  <Text style={styles.skpdItemNomor} numberOfLines={1}>{item.nomor_skpd}</Text>
                  <Text style={styles.skpdItemWP}>{item.wp_nama}</Text>
                </View>
                <View style={styles.skpdItemRight}>
                  <Text style={styles.skpdItemAmount}>{formatRupiah(item.total)}</Text>
                  <Badge label={st.label} variant={st.variant} size="sm" />
                </View>
              </TouchableOpacity>
            );
          })}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  headerLeft: {},
  greeting: {
    ...TextStyles.bodySm,
    color: Colors.text.secondary,
  },
  userName: {
    ...TextStyles.h2,
    color: Colors.text.primary,
    marginTop: 2,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    marginTop: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.primary[600],
  },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger[500],
  },

  // PAD Card
  padCard: {
    marginHorizontal: Spacing.base,
    backgroundColor: Colors.primary[900],
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
  },
  padCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.base,
  },
  padCardLabel: {
    ...TextStyles.labelSm,
    color: Colors.primary[300],
    fontSize: 11,
  },
  padCardValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  padPercentage: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.lg,
  },
  padPercentageValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.accent[400],
  },
  padPercentageLabel: {
    fontSize: 10,
    color: Colors.primary[300],
    fontWeight: '500',
  },
  padCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  padCardTarget: {
    fontSize: 11,
    color: Colors.primary[300],
  },
  padCardRemaining: {
    fontSize: 11,
    color: Colors.warning[400],
  },

  // Monthly Card
  monthlyCard: {
    marginHorizontal: Spacing.base,
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadow.sm,
    marginBottom: Spacing.base,
  },
  monthlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.md,
  },
  monthlyTitle: {
    ...TextStyles.label,
    color: Colors.text.primary,
  },
  monthlyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  monthlyStat: {
    alignItems: 'center',
    flex: 1,
  },
  monthlyStatValue: {
    ...TextStyles.h3,
    color: Colors.text.primary,
  },
  monthlyStatLabel: {
    ...TextStyles.bodyXs,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  monthlyDivider: {
    width: 1,
    backgroundColor: Colors.neutral[200],
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },

  // Tax Breakdown
  taxBreakdownCard: {
    marginHorizontal: Spacing.base,
  },
  taxItem: {
    marginBottom: Spacing.md,
  },
  taxItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  taxItemLabel: {
    ...TextStyles.bodySm,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  taxItemValue: {
    ...TextStyles.bodySm,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  taxItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  taxItemTarget: {
    ...TextStyles.bodyXs,
    color: Colors.text.tertiary,
  },
  taxItemPercent: {
    ...TextStyles.bodyXs,
    fontWeight: '600',
  },
  taxItemDivider: {
    height: 1,
    backgroundColor: Colors.neutral[100],
    marginTop: Spacing.md,
  },

  // SKPD Items
  skpdItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  skpdItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  skpdItemLeft: {
    flex: 1,
    marginRight: Spacing.md,
  },
  skpdItemNomor: {
    ...TextStyles.bodyXs,
    color: Colors.text.tertiary,
    fontWeight: '500',
  },
  skpdItemWP: {
    ...TextStyles.body,
    color: Colors.text.primary,
    fontWeight: '500',
    marginTop: 2,
  },
  skpdItemRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  skpdItemAmount: {
    ...TextStyles.numericSm,
    color: Colors.text.primary,
  },
});
