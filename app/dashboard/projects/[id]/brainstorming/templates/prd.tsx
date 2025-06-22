import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* 1 │ Data-model types – mirrors the JSON structure                  */
/* ------------------------------------------------------------------ */

export interface ProductDetails {
  description: string;
  targetAudience: string;
  platforms: string[];
  techStack: string[];
}

export interface Persona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  background: string;
  needs: string[];
  frustrations: string[];
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  acceptanceCriteria: string[];
  dependencies: string[];
}

export interface Milestone {
  id: string;
  name: string;
  features: string[]; // array of Feature IDs
}

export interface ProductPRD {
  product: string;
  version: string;
  lastUpdated: string; // ISO date string
  overview: string;
  productDetails: ProductDetails;
  goals: string[];
  userPersonas: Persona[];
  features: Feature[];
  milestones: Milestone[];
}

/* ------------------------------------------------------------------ */
/* 2 │ Small reusable presentational helpers                          */
/* ------------------------------------------------------------------ */

interface SectionProps {
  title: string;
  children: ReactNode;
}
const Section: FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

interface BulletProps {
  children: ReactNode;
}
const Bullet: FC<BulletProps> = ({ children }) => (
  <Text style={styles.bullet}>• {children}</Text>
);

interface KVProps {
  label: string;
  value: ReactNode;
}
const KV: FC<KVProps> = ({ label, value }) => (
  <Text style={styles.body}>
    <Text style={styles.bold}>{label}: </Text>
    {value}
  </Text>
);

const mockData: ProductPRD = {
  product: "Example Product",
  version: "1.0",
  lastUpdated: "2023-10-15",
  overview:
    "A web application that allows users to track and manage their tasks with enhanced personalization and goal-setting features.",
  productDetails: {
    description:
      "Example Product is a comprehensive task management platform that empowers users to seamlessly track, organize, and prioritize their daily activities. By integrating cross-device synchronization, the application ensures that users have real-time access to their tasks, whether on the web or mobile devices.\n\nBuilt with a sleek and intuitive user interface, Example Product adapts to individual workflows and preferences. Users can categorize tasks, set deadlines, attach relevant notes or files, and visualize progress through interactive dashboards.\n\nLeveraging modern technologies such as React, Node.js, Express, and MongoDB, the product emphasizes performance, scalability, and security. Future enhancements will include AI-powered recommendations, team collaboration tools, and advanced reporting to further optimize productivity.",
    targetAudience:
      "Professionals, students, and anyone who needs a simple yet powerful task tracker",
    platforms: ["Web", "iOS", "Android"],
    techStack: ["React", "Node.js", "Express", "MongoDB"],
  },
  goals: [
    "Help users stay organized and productive by providing a single source of truth for all tasks",
    "Deliver timely reminders and notifications to reduce missed deadlines",
    "Offer an intuitive UI and seamless UX across all supported devices",
    "Enable customization and personalization to fit diverse workflows",
  ],
  userPersonas: [
    {
      id: "P001",
      name: "Busy Brenda",
      age: 34,
      occupation: "Project Manager",
      background:
        "Manages multiple projects concurrently and needs to keep team tasks organized.",
      needs: [
        "Quickly add and update tasks on the go",
        "Receive reminders for upcoming deadlines",
      ],
      frustrations: [
        "Missing deadlines due to poor notification",
        "Complex interfaces that slow down task input",
      ],
    },
    {
      id: "P002",
      name: "Organized Oliver",
      age: 27,
      occupation: "Software Developer",
      background:
        "Works in agile sprints and values efficiency and clear task tracking.",
      needs: [
        "Track tasks with detailed descriptions",
        "Prioritize tasks based on project urgency",
      ],
      frustrations: [
        "Lack of task dependency visuals",
        "Difficulty customizing notification settings",
      ],
    },
  ],
  features: [
    {
      id: "F001",
      name: "User Authentication",
      description: "Allow users to sign up, log in, and reset passwords.",
      priority: "High",
      acceptanceCriteria: [
        "User can register with email and password",
        "User can log in and log out",
        "Password reset emails are sent successfully",
      ],
      dependencies: [],
    },
    {
      id: "F002",
      name: "Task Management",
      description: "Enable users to create, edit, complete, and delete tasks.",
      priority: "High",
      acceptanceCriteria: [
        "Tasks can be created with title and due date",
        "Tasks can be marked complete/incomplete",
        "Tasks can be edited and deleted",
      ],
      dependencies: ["F001"],
    },
    {
      id: "F003",
      name: "Notifications",
      description: "Send email reminders for upcoming due dates.",
      priority: "Medium",
      acceptanceCriteria: [
        "Email reminders sent 24 hours before due date",
        "User can opt in/out of notifications",
      ],
      dependencies: ["F001", "F002"],
    },
  ],
  milestones: [
    {
      id: "M001",
      name: "MVP Release",
      features: ["F001", "F002"],
    },
    {
      id: "M002",
      name: "Beta Release",
      features: ["F001", "F002", "F003"],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 3 │ Main PDF component                                             */
/* ------------------------------------------------------------------ */

interface ProductPRDDocumentProps {
  data?: ProductPRD;
}
const ProductPRDDocument: FC<ProductPRDDocumentProps> = ({
  data = mockData,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Cover */}
      <View style={styles.cover}>
        <Text style={styles.product}>{data.product}</Text>
        <Text style={styles.subtitle}>Product Requirements Document</Text>
        <Text style={styles.meta}>
          Version {data.version} · Last updated {data.lastUpdated}
        </Text>
      </View>

      {/* Overview */}
      <Section title="Overview">
        <Text style={styles.body}>{data.overview}</Text>
      </Section>

      {/* Product Details */}
      <Section title="Product Details">
        <Text style={styles.body}>{data.productDetails.description}</Text>
        <KV
          label="Target Audience"
          value={data.productDetails.targetAudience}
        />
        <KV
          label="Platforms"
          value={data.productDetails.platforms.join(", ")}
        />
        <KV
          label="Tech Stack"
          value={data.productDetails.techStack.join(", ")}
        />
      </Section>

      {/* Goals */}
      <Section title="Goals">
        {data.goals.map((g, i) => (
          <Bullet key={i}>{g}</Bullet>
        ))}
      </Section>

      {/* User Personas */}
      <Section title="User Personas">
        {data.userPersonas.map((p) => (
          <View key={p.id} style={styles.persona}>
            <Text style={styles.subTitle}>
              {p.name} ({p.id})
            </Text>
            <KV label="Age" value={p.age} />
            <KV label="Occupation" value={p.occupation} />
            <KV label="Background" value={p.background} />

            <Text style={styles.bold}>Needs:</Text>
            {p.needs.map((n, i) => (
              <Bullet key={i}>{n}</Bullet>
            ))}

            <Text style={[styles.bold, { marginTop: 2 }]}>Frustrations:</Text>
            {p.frustrations.map((f, i) => (
              <Bullet key={i}>{f}</Bullet>
            ))}
          </View>
        ))}
      </Section>

      {/* Features */}
      <Section title="Features">
        {data.features.map((f) => (
          <View key={f.id} style={styles.featureBox}>
            <Text style={styles.subTitle}>
              {f.name} ({f.id}) — {f.priority}
            </Text>
            <Text style={styles.body}>{f.description}</Text>

            <Text style={styles.bold}>Acceptance Criteria:</Text>
            {f.acceptanceCriteria.map((c, i) => (
              <Bullet key={i}>{c}</Bullet>
            ))}

            {f.dependencies.length > 0 && (
              <KV label="Dependencies" value={f.dependencies.join(", ")} />
            )}
          </View>
        ))}
      </Section>

      {/* Milestones */}
      <Section title="Milestones">
        {data.milestones.map((m) => (
          <View key={m.id} style={styles.milestone}>
            <Text style={styles.subTitle}>
              {m.name} ({m.id})
            </Text>
            <KV label="Included Features" value={m.features.join(", ")} />
          </View>
        ))}
      </Section>
    </Page>
  </Document>
);

/* ------------------------------------------------------------------ */
/* 4 │ Styles                                                         */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.4,
    color: "#111",
  },
  cover: { marginBottom: 24, textAlign: "center" },
  product: { fontSize: 24, fontWeight: "bold", marginBottom: 6 },
  subtitle: { fontSize: 12, marginTop: 6 },
  meta: { fontSize: 10, marginTop: 4, color: "#555" },

  /* Sections */
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 6 },

  /* Text helpers */
  subTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 4 },
  body: { marginBottom: 4 },
  bullet: { marginLeft: 8, marginBottom: 2 },
  bold: { fontWeight: "bold" },

  /* Blocks */
  persona: { marginBottom: 12 },
  featureBox: {
    marginBottom: 12,
    paddingBottom: 6,
    borderBottom: "1px solid #ddd",
  },
  milestone: { marginBottom: 8 },
});

export default ProductPRDDocument;
