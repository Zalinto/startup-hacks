import { Icon } from "@phosphor-icons/react";
import {
  EnvelopeIcon,
  PresentationIcon,
  VideoIcon,
} from "@phosphor-icons/react/dist/ssr";

export const CAMPAIGN_TYPE_LABELS: Record<
  string,
  { label: string; icon: Icon }
> = {
  email: { label: "Email", icon: EnvelopeIcon },
  pitch_deck: { label: "Pitch Deck", icon: PresentationIcon },
  scripted_video: { label: "Video", icon: VideoIcon },
};
