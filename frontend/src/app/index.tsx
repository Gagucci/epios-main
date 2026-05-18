import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const metrics = [
  { label: 'Sleep', value: '7.2h', detail: 'Recovery' },
  { label: 'Steps', value: '8,420', detail: 'Movement' },
  { label: 'Resting HR', value: '62 bpm', detail: 'Cardio' },
  { label: 'Energy', value: '7/10', detail: 'Check-in' },
];

const actions = ['Log check-in', 'Sync wearable', 'View trends'];

export default function HomeScreen() {
  const [selectedAction, setSelectedAction] = useState(actions[0]);
  const [score, setScore] = useState(82);
  const { width } = useWindowDimensions();

  const isCompact = width < 720;

  const scoreLabel = useMemo(() => {
    if (score >= 85) return 'Strong readiness';
    if (score >= 70) return 'Stable with room to improve';
    if (score >= 55) return 'Recovery needs attention';
    return 'Low readiness';
  }, [score]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedView style={styles.header}>
            <ThemedView>
              <ThemedText type="title" style={styles.title}>
                Epios
              </ThemedText>
              <ThemedText type="small" style={styles.subtitle}>
                AI-driven biometric health intelligence
              </ThemedText>
            </ThemedView>

            <ThemedView type="backgroundElement" style={styles.statusPill}>
              <ThemedText type="code">MVP</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView
            style={[
              styles.mainGrid,
              isCompact && styles.mainGridCompact,
            ]}
          >
            <ThemedView type="backgroundElement" style={styles.scoreCard}>
              <ThemedText type="small" style={styles.eyebrow}>
                Today's adaptive health score
              </ThemedText>

              <ThemedView style={styles.scoreRow}>
                <ThemedText style={styles.score}>{score}</ThemedText>
                <ThemedText type="small" style={styles.scoreMax}>
                  /100
                </ThemedText>
              </ThemedView>

              <ThemedText style={styles.scoreLabel}>{scoreLabel}</ThemedText>

              <ThemedView style={styles.scoreTrack}>
                <ThemedView style={[styles.scoreFill, { width: `${score}%` }]} />
              </ThemedView>

              <ThemedView style={styles.scoreButtons}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setScore(Math.max(0, score - 5))}
                  style={({ pressed }) => [
                    styles.touchButton,
                    pressed && styles.touchButtonPressed,
                  ]}
                >
                  <ThemedText style={styles.touchButtonText}>-5</ThemedText>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  onPress={() => setScore(Math.min(100, score + 5))}
                  style={({ pressed }) => [
                    styles.touchButton,
                    pressed && styles.touchButtonPressed,
                  ]}
                >
                  <ThemedText style={styles.touchButtonText}>+5</ThemedText>
                </Pressable>
              </ThemedView>
            </ThemedView>

            <ThemedView type="backgroundElement" style={styles.insightCard}>
              <ThemedText style={styles.sectionTitle}>AI Reflection</ThemedText>
              <ThemedText style={styles.insightText}>
                Your recovery and movement signals are working together today.
                Keep the next action simple: protect your sleep window and avoid
                stacking extra stress late in the day.
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Biometric Snapshot</ThemedText>
            <ThemedText type="code">Today</ThemedText>
          </ThemedView>

          <ThemedView style={styles.metricGrid}>
            {metrics.map((metric) => (
              <Pressable
                key={metric.label}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.metricPressable,
                  isCompact && styles.metricPressableCompact,
                  pressed && styles.cardPressed,
                ]}
              >
                <ThemedView type="backgroundElement" style={styles.metricCard}>
                  <ThemedText type="small">{metric.label}</ThemedText>
                  <ThemedText style={styles.metricValue}>{metric.value}</ThemedText>
                  <ThemedText type="small">{metric.detail}</ThemedText>
                </ThemedView>
              </Pressable>
            ))}
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.actionPanel}>
            <ThemedText style={styles.sectionTitle}>Next Action</ThemedText>

            <ThemedView style={styles.actionRow}>
              {actions.map((action) => {
                const selected = selectedAction === action;

                return (
                  <Pressable
                    key={action}
                    accessibilityRole="button"
                    onPress={() => setSelectedAction(action)}
                    style={({ pressed }) => [
                      styles.actionButton,
                      selected && styles.actionButtonSelected,
                      pressed && styles.touchButtonPressed,
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.actionButtonText,
                        selected && styles.actionButtonTextSelected,
                      ]}
                    >
                      {action}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </ThemedView>

            <ThemedText style={styles.insightText}>
              Selected: {selectedAction}
            </ThemedText>
          </ThemedView>

          {Platform.OS === 'web' && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: BottomTabInset + Spacing.five,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  title: {
    fontSize: 40,
  },
  subtitle: {
    opacity: 0.72,
    maxWidth: 420,
  },
  statusPill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
  },
  mainGrid: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'stretch',
  },
  mainGridCompact: {
    flexDirection: 'column',
  },
  scoreCard: {
    flex: 1.1,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    gap: Spacing.two,
    minHeight: 280,
  },
  eyebrow: {
    textTransform: 'uppercase',
    opacity: 0.72,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 72,
    fontWeight: '900',
    lineHeight: 78,
  },
  scoreMax: {
    marginBottom: Spacing.two,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  scoreTrack: {
    height: 12,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(127, 127, 127, 0.22)',
  },
  scoreFill: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#4fd1b1',
  },
  scoreButtons: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  touchButton: {
    minHeight: 48,
    minWidth: 72,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4fd1b1',
  },
  touchButtonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
  touchButtonText: {
    color: '#071013',
    fontWeight: '900',
  },
  insightCard: {
    flex: 1,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    gap: Spacing.two,
    minHeight: 280,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  insightText: {
    lineHeight: 22,
    opacity: 0.78,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  metricPressable: {
    width: '23.5%',
    minWidth: 160,
    flexGrow: 1,
  },
  metricPressableCompact: {
    width: '48%',
    minWidth: 140,
  },
  metricCard: {
    minHeight: 118,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.one,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  cardPressed: {
    opacity: 0.76,
    transform: [{ scale: 0.99 }],
  },
  actionPanel: {
    padding: Spacing.four,
    borderRadius: Spacing.four,
    gap: Spacing.three,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  actionButton: {
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(127, 127, 127, 0.16)',
  },
  actionButtonSelected: {
    backgroundColor: '#4fd1b1',
  },
  actionButtonText: {
    fontWeight: '800',
  },
  actionButtonTextSelected: {
    color: '#071013',
  },
});
