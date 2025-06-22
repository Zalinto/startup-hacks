import React, { ReactNode } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

/* ---------- types ---------- */

const mockData: BrandGuidelinesData = {
  brandName: "Paper Flight Co.",
  tagline: "Take Flight with Imagination",
  missionStatement:
    "To inspire creativity and joy through beautifully crafted paper airplanes, empowering people of all ages to explore the magic of flight.",
  visionStatement:
    "To become the world's leading brand for innovative and inspiring paper airplanes, fostering a global community of paper flight enthusiasts.",
  values: [
    "Creativity: We encourage boundless imagination and innovative design in every paper airplane.",
    "Quality: We use premium materials and meticulous craftsmanship to ensure durable and enjoyable flying experiences.",
    "Community: We foster a welcoming and inclusive community of paper airplane enthusiasts, sharing knowledge and celebrating the joy of flight.",
    "Sustainability: We are committed to using eco-friendly materials and practices whenever possible.",
  ],
  brandPersonality: [
    "Imaginative",
    "Playful",
    "Innovative",
    "Crafted",
    "Inspiring",
    "Community-driven",
  ],
  colors: {
    primary: "#007BFF",
    secondary: "#F7F7F7",
    accent: "#FFC107",
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
        "Enthusiastic and approachable, Paper Flight Co.'s voice is playful yet informative, encouraging exploration and creativity.",
      adjectives: [
        "Friendly",
        "Inspiring",
        "Engaging",
        "Knowledgeable",
        "Imaginative",
      ],
    },
    dos: [
      "Use active voice",
      "Keep language concise and easy to understand",
      "Inject personality and enthusiasm",
      "Highlight the joy and wonder of flight",
      "Encourage experimentation and creativity",
    ],
    donts: [
      "Use overly technical jargon",
      "Be overly formal or corporate",
      "Sound condescending or patronizing",
      "Neglect the visual appeal of language",
      "Forget to have fun!",
    ],
    toneExamples: {
      onboarding: {
        good: "Welcome to Paper Flight Co.!  Get ready to unleash your inner aviator and soar to new heights.  We've got all the tools you need to design, fold, and fly amazing paper airplanes.",
        bad: "Thank you for choosing Paper Flight Co.  Our products are designed to meet the highest standards of aerodynamics and durability.",
      },
      error: {
        good: "Oops!  Looks like something went wrong.  Don't worry, our paper airplanes are built to withstand a few bumps.  Try again, and let us know if you need any help.",
        bad: "Error 404:  Paper Airplane Not Found.  Please check your input and try again.",
      },
      encouragement: {
        good: "You're on your way to becoming a paper airplane pro!  Keep experimenting with different designs and see how far you can fly.",
        bad: "Continue to practice and improve your paper airplane skills.",
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
