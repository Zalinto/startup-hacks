import React, { ReactNode } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

/* ---------- types ---------- */

const mockData: BrandGuidelinesData = {
  brandName: "Acme Corp",
  tagline: "Acme: Powering Possibility",
  missionStatement:
    "To revolutionize everyday tools with innovative solutions that empower people around the world.",
  visionStatement:
    "A future where every individual can achieve more through simple, reliable, and thoughtfully designed products.",
  values: [
    "Innovation: We push boundaries and embrace new ideas.",
    "Integrity: We do the right thing, always.",
    "Empathy: We put people first in everything we create.",
    "Excellence: We strive for the highest quality in every detail.",
  ],
  brandPersonality: [
    "innovative",
    "dependable",
    "approachable",
    "optimistic",
    "bold",
    "empathetic",
  ],
  colors: {
    primary: "#1A73E8",
    secondary: "#DB4437",
    accent: "#F4B400",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    headings: {
      h1: {
        fontSize: "48px",
        fontWeight: "700",
        lineHeight: "1.2",
      },
      h2: {
        fontSize: "36px",
        fontWeight: "700",
        lineHeight: "1.3",
      },
      h3: {
        fontSize: "30px",
        fontWeight: "500",
        lineHeight: "1.3",
      },
    },
    body: {
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    caption: {
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "1.4",
    },
  },
  voiceAndTone: {
    brandVoice: {
      description:
        "Clear, confident, and caring. We speak like a trusted friend who knows their stuff.",
      adjectives: [
        "friendly",
        "professional",
        "concise",
        "inspiring",
        "welcoming",
      ],
    },
    dos: [
      "Use active voice",
      "Keep sentences short",
      "Speak directly to the user",
      "Include a dash of warmth and humor where appropriate",
    ],
    donts: [
      "Avoid jargon",
      "Don't use passive constructions",
      "No slang or idioms that confuse non-native speakers",
      "Steer clear of overly complex metaphors",
    ],
    toneExamples: {
      onboarding: {
        good: "Welcome aboard! Let’s get you set up in just a few steps.",
        bad: "Please proceed with the initialization process.",
      },
      error: {
        good: "Oops! Something went wrong. Let’s try that again.",
        bad: "An error occurred during the operation.",
      },
      encouragement: {
        good: "You’re doing great! Almost there.",
        bad: "Progress is underway.",
      },
    },
  },
};

type TypographyConfig = {
  fontSize: string | number;
  fontWeight: string | number;
  lineHeight?: string | number;
};

type Typography = {
  fontFamily: string;
  headings: {
    [level: string]: TypographyConfig;
  };
  body: TypographyConfig;
  caption: TypographyConfig;
};

type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
};

type VoiceAndTone = {
  brandVoice: {
    description: string;
    adjectives: string[];
  };
  dos: string[];
  donts: string[];
  toneExamples: {
    [context: string]: {
      good: string;
      bad: string;
    };
  };
};

type BrandGuidelinesData = {
  brandName: string;
  tagline: string;
  missionStatement: string;
  visionStatement: string;
  values: string[];
  brandPersonality: string[];
  colors: ColorPalette;
  typography: Typography;
  voiceAndTone: VoiceAndTone;
};

/* ---------- helpers ---------- */

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>{title}</Text>
    {children}
  </View>
);

type BulletListProps = {
  items: string[];
};

const BulletList = ({ items }: BulletListProps) => (
  <View style={{ marginTop: 4 }}>
    {items.map((txt, i) => (
      <Text key={i} style={styles.bullet}>
        • {txt}
      </Text>
    ))}
  </View>
);

type ColorSwatchProps = {
  label: string;
  hex: string;
};

const ColorSwatch = ({ label, hex }: ColorSwatchProps) => (
  <View style={styles.swatchRow}>
    <View style={[styles.colorBox, { backgroundColor: hex }]} />
    <Text style={styles.body}>
      {label}: {hex}
    </Text>
  </View>
);

/* ---------- main document ---------- */

const BrandGuidelinesDocument = ({
  data = mockData,
}: {
  data?: BrandGuidelinesData;
}) => (
  <Document>
    {/* --- Cover / mission page --- */}
    <Page size="A4" style={styles.page}>
      <View style={styles.cover}>
        <Text style={styles.brand}>{data.brandName}</Text>
        <Text style={styles.tagline}>{data.tagline}</Text>
      </View>

      <Section title="Mission">
        <Text style={styles.body}>{data.missionStatement}</Text>
      </Section>

      <Section title="Vision">
        <Text style={styles.body}>{data.visionStatement}</Text>
      </Section>

      <Section title="Values">
        <BulletList items={data.values} />
      </Section>
    </Page>

    {/* --- Identity specifics --- */}
    <Page size="A4" style={styles.page}>
      <Section title="Brand Personality">
        <Text style={styles.body}>{data.brandPersonality.join(", ")}</Text>
      </Section>

      <Section title="Color Palette">
        <ColorSwatch label="Primary" hex={data.colors.primary} />
        <ColorSwatch label="Secondary" hex={data.colors.secondary} />
        <ColorSwatch label="Accent" hex={data.colors.accent} />
      </Section>

      <Section title="Typography">
        <Text style={styles.body}>
          Font family: {data.typography.fontFamily}
        </Text>

        {Object.entries(data.typography.headings).map(([lvl, cfg]) => (
          <Text key={lvl} style={styles.body}>
            {lvl.toUpperCase()} – {cfg.fontSize}, weight {cfg.fontWeight}, LH{" "}
            {cfg.lineHeight}
          </Text>
        ))}

        <Text style={styles.body}>
          Body – {data.typography.body.fontSize}, weight{" "}
          {data.typography.body.fontWeight}
        </Text>
        <Text style={styles.body}>
          Caption – {data.typography.caption.fontSize}, weight{" "}
          {data.typography.caption.fontWeight}
        </Text>
      </Section>
    </Page>

    {/* --- Voice & tone page --- */}
    <Page size="A4" style={styles.page}>
      <Section title="Brand Voice">
        <Text style={styles.body}>
          {data.voiceAndTone.brandVoice.description}
        </Text>
        <Text style={styles.body}>
          Adjectives: {data.voiceAndTone.brandVoice.adjectives.join(", ")}
        </Text>
      </Section>

      <Section title="Voice – Do’s">
        <BulletList items={data.voiceAndTone.dos} />
      </Section>

      <Section title="Voice – Don’ts">
        <BulletList items={data.voiceAndTone.donts} />
      </Section>

      <Section title="Tone Examples">
        {Object.entries(data.voiceAndTone.toneExamples).map(([ctx, ex]) => (
          <View key={ctx} style={{ marginBottom: 6 }}>
            <Text style={styles.subHeader}>
              {ctx.charAt(0).toUpperCase() + ctx.slice(1)}
            </Text>
            <Text style={styles.goodBad}>
              <Text style={styles.bold}>Good:</Text> {ex.good}
            </Text>
            <Text style={styles.goodBad}>
              <Text style={styles.bold}>Bad:</Text> {ex.bad}
            </Text>
          </View>
        ))}
      </Section>
      <Text fixed style={styles.footer}>
        Generated with Zeroto
      </Text>
    </Page>
  </Document>
);

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.4,
    color: "#111",
  },
  cover: {
    marginBottom: 28,
    alignItems: "center",
  },
  brand: { fontSize: 26, fontWeight: "bold", marginBottom: 6 },
  tagline: { fontSize: 14, marginTop: 6, color: "#555" },

  section: { marginBottom: 16 },
  sectionHeader: {
    fontSize: 15,
    marginBottom: 6,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 2,
    fontWeight: "bold",
  },
  body: { fontSize: 11, marginBottom: 4 },
  bullet: { fontSize: 11, marginLeft: 8, marginBottom: 2 },

  swatchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  colorBox: {
    width: 18,
    height: 18,
    marginRight: 6,
    border: "1px solid #000",
  },
  swatchLabel: { fontSize: 11 },

  goodBad: { fontSize: 11, marginLeft: 8, marginBottom: 2 },
  bold: { fontWeight: "bold" },

  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default BrandGuidelinesDocument;
